import React from "react";

interface MetricBoxProps {
  value: string;
  label: string;
}

export function MetricBox({ value, label }: MetricBoxProps) {
  return (
    <div className="metric-box">
      <div className="metric-val">{value}</div>
      <div className="metric-lbl">{label}</div>
    </div>
  );
}

