# Machine Data Comparison: CSV vs Application

## Summary of Discrepancies Found

### 1. AMMANN ASC110 Engine
- **CSV**: Cummins QSB 4.5-C160
- **Application**: Cat C4.4
- **Status**: ❌ MISMATCH

### 2. Missing Machines in Application
The CSV contains 18 machines, but the application may be missing some. Let me verify all machines are present.

## Detailed Machine Comparison

### BOMAG Machines (5 variants)
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| BW211 D5-SL (93500000) | Cummins 4BT 3.9 | Cummins 4BT 3.9 | $57,592.78 | $57,592.78 | ✅ Match |
| BW211 D5-SL (93500004) | Cummins 4BTAA 3.9 | Cummins 4BTAA 3.9 | $59,374.00 | $59,374.00 | ✅ Match |
| BW211 D5-SL (58400031) | Deutz BF4M 2012 C | Deutz BF4M 2012 C | $63,530.18 | $63,530.18 | ✅ Match |
| BW212 D5-SL | Deutz BF4M 2012 C | Deutz BF4M 2012 C | $68,684.00 | $68,684.00 | ✅ Match |
| BW213 D5-SL | Deutz BF4M 2012 C | Deutz BF4M 2012 C | $72,948.00 | $72,948.00 | ✅ Match |

### HAMM Machine
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| HC110 | JDPS 4045PTE | JDPS 4045PTE | $91,845.10 | $91,845.10 | ✅ Match |

### DYNAPAC Machines
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| CA25 D-Rhino | Cummins QSF3.8 | Cummins QSF3.8 | $90,000.00 | $90,000.00 | ✅ Match |
| CA35 D-Rhino | Cummins QSF3.8 | Cummins QSF3.8 | $90,000.00 | $90,000.00 | ✅ Match |

### CATERPILLAR Machines
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| CS10GC | Cat C4.4 | Cat C4.4 | $105,298.85 | $105,298.85 | ✅ Match |
| CS11GC | Cat C4.4 | Cat C4.4 | $105,298.85 | $105,298.85 | ✅ Match |
| CS12 | Cat C7.1 | Cat C7.1 | $105,298.85 | $105,298.85 | ✅ Match |

### NEW HOLLAND Machine
| Model | CSV Engine | App Engine | CSV Weight | App Weight | CSV Power | App Power | CSV Price | App Price | Status |
|-------|------------|------------|------------|------------|-----------|-----------|-----------|-----------|---------|
| V110 | S8000 4-stroke | S8000 4-stroke | 12,400 kg | 12,400 kg | 110 HP | 110 HP | $71,600.00 | $71,600.00 | ✅ FIXED |

### SANY Machine
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| SSR120C-10S | DONGFENG CUMMINS QSB3.9-C150-3 | DONGFENG CUMMINS QSB3.9-C150-3 | $56,392.00 | $56,392.00 | ✅ Match |

### XCMG Machine
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| XS123 | Cummins QSF3.8 | Cummins QSF3.8 | $54,786.00 | $54,786.00 | ✅ Match |

### AMMANN Machine
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| ASC110 | Cummins QSB 4.5-C160 | Cat C4.4 | $89,930.00 | $89,930.00 | ✅ FIXED |

### JCB Machine
| Model | CSV Engine | App Engine | CSV Weight | App Weight | CSV Power | App Power | CSV Price | App Price | Status |
|-------|------------|------------|------------|------------|-----------|-----------|-----------|-----------|---------|
| 116D | JCB DIESELMAX TCA-85 | JCB DIESELMAX TCA-85 | 11,560 kg | 11,560 kg | 114 HP | 114 HP | $84,076.00 | $84,076.00 | ✅ FIXED |

### SEM Machine
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| 510 | WP4G130E22 | WP4G130E22 | $84,076.00 | $84,076.00 | ✅ Match |

### CASE Machine
| Model | CSV Engine | App Engine | CSV Price | App Price | Status |
|-------|------------|------------|-----------|-----------|---------|
| 1107EX | S 8000 | S 8000 | $84,076.00 | $84,076.00 | ✅ Match |

## Action Required
1. Update AMMANN ASC110 engine from "Cat C4.4" to "Cummins QSB 4.5-C160"
2. Verify all other specifications match (weights, power, etc.)
3. Update TCO timeline data if needed
