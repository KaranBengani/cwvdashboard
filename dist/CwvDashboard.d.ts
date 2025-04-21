import React from 'react';
import { PageMetric, WebVitalsConfig } from './components/types';
export interface DashboardProps {
    cwvreport: PageMetric[];
    threshold?: WebVitalsConfig;
    children?: React.ReactNode;
}
declare const CwvDashboard: ({ cwvreport, threshold }: DashboardProps) => import("react/jsx-runtime").JSX.Element;
export default CwvDashboard;
