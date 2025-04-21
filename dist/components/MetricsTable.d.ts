import React from "react";
import { PageMetric, WebVitalsConfig } from "./types";
interface MetricsTableProps {
    data: PageMetric[];
    config: WebVitalsConfig;
}
declare const MetricsTable: React.FC<MetricsTableProps>;
export default MetricsTable;
