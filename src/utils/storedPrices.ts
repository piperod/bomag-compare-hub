/**
 * Prices stored in the source data are CIF import prices and only exist for some models,
 * which made the comparison confusing. They stay in the data files but are not used:
 * every model starts at 0 and the user enters the price in the financial analysis.
 */
type WithStoredPrices = {
  price?: number;
  tco?: number;
  staticTco?: number;
  tcoTimeline?: Array<{ hours: number; price: number | null; tco: number | null }>;
};

export function withoutStoredPrices<T extends WithStoredPrices>(machines: T[]): T[] {
  return machines.map((machine) => ({
    ...machine,
    price: 0,
    tco: 0,
    ...(machine.staticTco !== undefined ? { staticTco: 0 } : {}),
    ...(machine.tcoTimeline
      ? { tcoTimeline: machine.tcoTimeline.map((point) => ({ ...point, price: 0, tco: 0 })) }
      : {}),
  }));
}
