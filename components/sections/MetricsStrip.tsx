import React from "react";
import { METRICS_DATA } from "@/data/portfolioData";
import { MetricBox } from "@/components/ui/MetricBox";

export function MetricsStrip() {
  return (
    <section className="metrics-grid" aria-label="Career Highlights">
      {METRICS_DATA.map((metric, i) => (
        <MetricBox key={i} value={metric.value} label={metric.label} />
      ))}
    </section>
  );
}

