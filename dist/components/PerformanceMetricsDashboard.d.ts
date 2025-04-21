import { PageMetric, WebVitalsConfig } from "./types";
interface PerformanceMetricsDashboardProps {
    data: PageMetric[];
    config: WebVitalsConfig;
}
declare const PerformanceMetricsDashboard: ({ data, config }: PerformanceMetricsDashboardProps) => import("react/jsx-runtime").JSX.Element;
export default PerformanceMetricsDashboard;
