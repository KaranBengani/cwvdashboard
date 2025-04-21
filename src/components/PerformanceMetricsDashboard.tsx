import React from "react";
import { Card } from "./ui/card";
import { PageMetric, WebVitalsConfig } from "./types";
import Dashboard from "./Dashboard";

interface PerformanceMetricsDashboardProps {
  data: PageMetric[];
  config: WebVitalsConfig;
}

const PerformanceMetricsDashboard = ({ data,config }:PerformanceMetricsDashboardProps) => {
  return (
    <Card className="p-4 shadow-lg">
      <Dashboard data={data} config={config}/>
    </Card>
  );
};

// This is the main export for the package
export default PerformanceMetricsDashboard;
