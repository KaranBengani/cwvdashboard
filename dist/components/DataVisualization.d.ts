import React from "react";
import { ChartType, MetricKey, PageMetric, WebVitalsConfig } from "./types";
interface DataVisualizationProps {
    data: PageMetric[];
    chartType: ChartType;
    metricKey: MetricKey;
    config: WebVitalsConfig;
}
declare const DataVisualization: React.FC<DataVisualizationProps>;
export default DataVisualization;
