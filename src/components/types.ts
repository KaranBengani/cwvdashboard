export interface PageMetric {
    url: string;
    LHS_Score: number;
    LCP: number;
    FCP: number;
    INP: number;
    CLS: number;
    FID: number;
    blocked: boolean;
    [key: string]: string | number | boolean;
  }
  interface MetricThreshold {
    green: number;
    red: number;
  }
  
  type MetricName = 'LCP' | 'FCP' | 'INP' | 'CLS' | 'FID';
  
  export type WebVitalsConfig = {
    [key in MetricName]: MetricThreshold;
  };
  export type ChartType = "bar" | "line" | "pie";
  export type MetricKey = keyof PageMetric;
  export type ScoreFilterType = "all" | "good" | "average" | "poor";
  export type StatusFilterType = "all" | "active" | "blocked";
  