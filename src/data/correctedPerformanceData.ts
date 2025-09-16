// Corrected performance calculation data based on user-provided table
// This data structure represents the performance ranges for different weight ranges and soil types

export interface PerformanceRange {
  weightMin: number;
  weightMax: number;
  rock: { min: number; max: number } | null;
  gravel: { min: number; max: number };
  mixedSoil: { min: number; max: number };
  clay: { min: number; max: number };
}

export const correctedPerformanceData: PerformanceRange[] = [
  {
    weightMin: 2,
    weightMax: 3,
    rock: null, // No data for rock in this range
    gravel: { min: 60, max: 180 },
    mixedSoil: { min: 60, max: 180 },
    clay: { min: 40, max: 100 }
  },
  {
    weightMin: 6,
    weightMax: 8,
    rock: { min: 200, max: 500 },
    gravel: { min: 100, max: 400 },
    mixedSoil: { min: 100, max: 350 },
    clay: { min: 70, max: 200 }
  },
  {
    weightMin: 9,
    weightMax: 12,
    rock: { min: 400, max: 900 },
    gravel: { min: 200, max: 700 },
    mixedSoil: { min: 200, max: 600 },
    clay: { min: 100, max: 300 }
  },
  {
    weightMin: 13,
    weightMax: 16,
    rock: { min: 500, max: 1400 },
    gravel: { min: 350, max: 1000 },
    mixedSoil: { min: 300, max: 800 },
    clay: { min: 150, max: 400 }
  },
  {
    weightMin: 19,
    weightMax: 25,
    rock: { min: 900, max: 2200 },
    gravel: { min: 500, max: 1600 },
    mixedSoil: { min: 500, max: 1200 },
    clay: { min: 300, max: 500 }
  }
];

export type SoilType = 'rock' | 'gravel' | 'mixedSoil' | 'clay';

/**
 * Extrapolates performance for missing soil type data using intelligent estimation
 * based on relationships between soil types and weight scaling
 */
function extrapolateFromSimilarSoilTypes(weight: number, range: PerformanceRange, targetSoilType: SoilType): number | null {
  // Define soil type difficulty/performance relationships
  // Generally: rock > mixedSoil > gravel > clay (in terms of performance potential)
  const soilHierarchy = {
    'rock': 1.0,      // Highest performance potential
    'mixedSoil': 0.85, // Good performance
    'gravel': 0.75,    // Moderate performance  
    'clay': 0.6       // Lower performance
  };

  // Try to find the best reference soil type available in this range
  const availableSoilTypes: SoilType[] = ['mixedSoil', 'gravel', 'clay', 'rock'];
  let referenceSoilType: SoilType | null = null;
  let referenceData: { min: number; max: number } | null = null;

  // Find the closest available soil type data in the same weight range
  for (const soilType of availableSoilTypes) {
    if (range[soilType]) {
      referenceSoilType = soilType;
      referenceData = range[soilType];
      break;
    }
  }

  if (!referenceSoilType || !referenceData) {
    // If no reference data in current range, fall back to weight-based scaling
    return extrapolateFromOtherRanges(weight, targetSoilType);
  }

  // Calculate weight position within the range
  const weightProgress = (weight - range.weightMin) / (range.weightMax - range.weightMin);
  const referenceValue = referenceData.min + (referenceData.max - referenceData.min) * weightProgress;

  // Apply soil type scaling factor
  const targetFactor = soilHierarchy[targetSoilType];
  const referenceFactor = soilHierarchy[referenceSoilType];
  const scalingFactor = targetFactor / referenceFactor;

  const estimatedValue = referenceValue * scalingFactor;
  
  return Math.round(estimatedValue);
}

/**
 * Extrapolates from other weight ranges when no data is available in current range
 */
function extrapolateFromOtherRanges(weight: number, soilType: SoilType): number | null {
  const sortedRanges = correctedPerformanceData.sort((a, b) => a.weightMin - b.weightMin);
  
  // Find the nearest range with data for this soil type
  let nearestRange: PerformanceRange | null = null;
  let nearestData: { min: number; max: number } | null = null;
  let weightDifference = Infinity;

  for (const range of sortedRanges) {
    const rangeData = range[soilType];
    if (rangeData) {
      const rangeMidpoint = (range.weightMin + range.weightMax) / 2;
      const diff = Math.abs(weight - rangeMidpoint);
      if (diff < weightDifference) {
        weightDifference = diff;
        nearestRange = range;
        nearestData = rangeData;
      }
    }
  }

  if (!nearestRange || !nearestData) {
    return null;
  }

  // Scale the performance based on weight difference
  // Lighter machines generally have lower performance
  const rangeMidpoint = (nearestRange.weightMin + nearestRange.weightMax) / 2;
  const weightRatio = weight / rangeMidpoint;
  
  // Apply non-linear scaling - lighter machines have proportionally lower performance
  const scalingFactor = Math.pow(weightRatio, 0.8); // Power less than 1 for diminishing returns
  
  const baseValue = (nearestData.min + nearestData.max) / 2;
  const scaledValue = baseValue * scalingFactor;
  
  // Ensure minimum reasonable value (at least 10% of base value)
  const minValue = baseValue * 0.1;
  const finalValue = Math.max(scaledValue, minValue);
  
  return Math.round(finalValue);
}

/**
 * Interpolates performance value based on machine weight and soil type
 * @param weight - Operating weight of the machine in tons
 * @param soilType - Type of soil/material
 * @returns Interpolated performance value in m³/h, or null if no data available
 */
export function interpolatePerformance(weight: number, soilType: SoilType): number | null {
  // Find the appropriate weight range(s) for interpolation
  const ranges = correctedPerformanceData.filter(range => 
    weight >= range.weightMin && weight <= range.weightMax
  );

  // If weight falls exactly within a range, interpolate within that range
  if (ranges.length > 0) {
    const range = ranges[0];
    const soilData = range[soilType];
    
    if (!soilData) {
      // If current range doesn't have data for this soil type,
      // use intelligent extrapolation based on available data in the same range
      return extrapolateFromSimilarSoilTypes(weight, range, soilType);
    }
    
    // Linear interpolation within the range based on weight position
    const weightProgress = (weight - range.weightMin) / (range.weightMax - range.weightMin);
    const performanceValue = soilData.min + (soilData.max - soilData.min) * weightProgress;
    
    return Math.round(performanceValue);
  }

  // If weight doesn't fall within any range, find the two closest ranges for interpolation
  const sortedRanges = correctedPerformanceData.sort((a, b) => a.weightMin - b.weightMin);
  
  let lowerRange: PerformanceRange | null = null;
  let upperRange: PerformanceRange | null = null;
  
  for (let i = 0; i < sortedRanges.length; i++) {
    const range = sortedRanges[i];
    
    if (weight < range.weightMin) {
      upperRange = range;
      break;
    } else if (weight > range.weightMax) {
      lowerRange = range;
    }
  }

  // If weight is below the minimum range
  if (!lowerRange && upperRange) {
    const soilData = upperRange[soilType];
    if (!soilData) {
      // Use intelligent extrapolation for missing data
      return extrapolateFromOtherRanges(weight, soilType);
    }
    
    // Scale down from the upper range based on weight difference
    const upperMidpoint = (upperRange.weightMin + upperRange.weightMax) / 2;
    const weightRatio = weight / upperMidpoint;
    const scalingFactor = Math.pow(weightRatio, 0.8);
    const baseValue = (soilData.min + soilData.max) / 2;
    const scaledValue = baseValue * scalingFactor;
    
    return Math.round(Math.max(scaledValue, soilData.min * 0.1));
  }

  // If weight is above the maximum range
  if (lowerRange && !upperRange) {
    const soilData = lowerRange[soilType];
    if (!soilData) return null;
    
    // Use the maximum value from the last available range
    return soilData.max;
  }

  // Interpolate between two ranges
  if (lowerRange && upperRange) {
    const lowerSoilData = lowerRange[soilType];
    const upperSoilData = upperRange[soilType];
    
    if (!lowerSoilData || !upperSoilData) return null;
    
    // Calculate interpolation factor based on weight position between ranges
    const totalWeightSpan = upperRange.weightMin - lowerRange.weightMax;
    const weightPosition = weight - lowerRange.weightMax;
    const interpolationFactor = totalWeightSpan > 0 ? weightPosition / totalWeightSpan : 0;
    
    // Interpolate between the max of lower range and min of upper range
    const lowerValue = lowerSoilData.max;
    const upperValue = upperSoilData.min;
    const interpolatedValue = lowerValue + (upperValue - lowerValue) * interpolationFactor;
    
    return Math.round(interpolatedValue);
  }

  return null;
}

/**
 * Gets the performance range string for display purposes
 * @param weight - Operating weight of the machine in tons
 * @param soilType - Type of soil/material
 * @returns Performance range string (e.g., "200 - 500") or null if no data available
 */
export function getPerformanceRange(weight: number, soilType: SoilType): string | null {
  const ranges = correctedPerformanceData.filter(range => 
    weight >= range.weightMin && weight <= range.weightMax
  );

  if (ranges.length > 0) {
    const range = ranges[0];
    const soilData = range[soilType];
    
    if (!soilData) return null;
    
    return `${soilData.min} - ${soilData.max}`;
  }

  return null;
}

/**
 * Gets all available weight ranges for display in UI
 * @returns Array of weight range strings
 */
export function getWeightRanges(): string[] {
  return correctedPerformanceData.map(range => `${range.weightMin} - ${range.weightMax}`);
}
