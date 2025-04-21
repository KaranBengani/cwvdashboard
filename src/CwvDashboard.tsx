import React from 'react'
import PerformanceMetricsDashboard from './components/PerformanceMetricsDashboard';
import { PageMetric, WebVitalsConfig } from './components/types';

export interface DashboardProps {
  cwvreport: PageMetric[];
  threshold?: WebVitalsConfig;
  children?: React.ReactNode;
}

// Sample data for the dashboard
// sampleData = [
//   {
//     "url": "/",
//     "LHS_Score": 70,
//     "LCP": 6.106800137499999,
//     "FCP": 1.9676656225000002,
//     "INP": 6129.401651749999,
//     "CLS": 0.02978873885368724,
//     "FID": 89,
//     "blocked": false
//   },
// ];
const defaultConfig ={
  LCP:{
    green: 2.5,
    red:4 //if value exceeds this the metric is considered breeched
  },
  FCP:{
    green: 1.8,
    red:3 //if value exceeds this the metric is considered breeched
  },
  INP:{
    green: 200,
    red:500 //if value exceeds this the metric is considered breeched
  },
  CLS:{
    green: 0.1,
    red:0.25 //if value exceeds this the metric is considered breeched
  },
  FID:{
    green: 100,
    red:300 //if value exceeds this the metric is considered breeched
  }
}
const CwvDashboard = ({cwvreport,threshold = defaultConfig}:DashboardProps) => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
      <PerformanceMetricsDashboard data={cwvreport} config={threshold}/>
    </div>
    </div>
  )
}

export default CwvDashboard
