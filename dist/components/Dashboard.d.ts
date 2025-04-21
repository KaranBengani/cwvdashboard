import React from "react";
import { PageMetric, WebVitalsConfig } from "./types";
interface DashboardProps {
    data: PageMetric[];
    config: WebVitalsConfig;
}
declare const Dashboard: React.FC<DashboardProps>;
export default Dashboard;
