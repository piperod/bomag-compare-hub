import React from 'react';

export const COMPARE_TABLE_CLASS = 'compare-table w-full border-collapse border border-gray-300';

export function CompareColGroup({ columnCount }: { columnCount: number }) {
  if (columnCount < 1) return null;
  const width = `${100 / columnCount}%`;
  return (
    <colgroup>
      {Array.from({ length: columnCount }, (_, i) => (
        <col key={i} style={{ width }} />
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
  return (
    <table className={className ? `${COMPARE_TABLE_CLASS} ${className}` : COMPARE_TABLE_CLASS}>
      <CompareColGroup columnCount={columnCount} />
      {children}
    </table>
  );
}
