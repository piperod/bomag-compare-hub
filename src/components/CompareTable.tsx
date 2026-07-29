import React from 'react';

export const COMPARE_TABLE_CLASS = 'compare-table w-full border-collapse border border-gray-300';

const LABEL_COL_MIN_PX = 180;
const MACHINE_COL_MIN_PX = 150;
/** Above this count, use fixed min widths so columns stay readable with horizontal scroll */
const FIXED_WIDTH_THRESHOLD = 6;

export function CompareColGroup({ columnCount }: { columnCount: number }) {
  if (columnCount < 1) return null;
  const useFixedMins = columnCount > FIXED_WIDTH_THRESHOLD;
  const percent = `${100 / columnCount}%`;
  return (
    <colgroup>
      {Array.from({ length: columnCount }, (_, i) => (
        <col
          key={i}
          style={
            useFixedMins
              ? {
                  width: i === 0 ? LABEL_COL_MIN_PX : MACHINE_COL_MIN_PX,
                  minWidth: i === 0 ? LABEL_COL_MIN_PX : MACHINE_COL_MIN_PX,
                }
              : { width: percent }
          }
        />
      ))}
    </colgroup>
  );
}

interface CompareTableProps {
  columnCount: number;
  className?: string;
  children: React.ReactNode;
}

export function CompareTable({ columnCount, className, children }: CompareTableProps) {
  const useFixedMins = columnCount > FIXED_WIDTH_THRESHOLD;
  const minWidth = useFixedMins
    ? LABEL_COL_MIN_PX + Math.max(0, columnCount - 1) * MACHINE_COL_MIN_PX
    : undefined;
  return (
    <table
      className={className ? `${COMPARE_TABLE_CLASS} ${className}` : COMPARE_TABLE_CLASS}
      style={minWidth ? { minWidth } : undefined}
    >
      <CompareColGroup columnCount={columnCount} />
      {children}
    </table>
  );
}
