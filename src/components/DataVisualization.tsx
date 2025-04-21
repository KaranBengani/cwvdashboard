
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartType, MetricKey, PageMetric, WebVitalsConfig } from "./types";

interface DataVisualizationProps {
  data: PageMetric[];
  chartType: ChartType;
  metricKey: MetricKey;
  config:WebVitalsConfig;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  data,
  chartType,
  metricKey,
  config
}) => {
  // Format data for charts
  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: item.url.replace(/^\//, ''), // Remove leading slash for display
      value: typeof item[metricKey] === 'number' ? Number(item[metricKey]) : 0,
      blocked: item.blocked,
    }));
  }, [data, metricKey]);

  // Custom colors based on value ranges
  const getBarColor = (value: number) => {
    if (metricKey === "LHS_Score") {
      if (value >= 90) return "#4ade80"; // green-400
      if (value >= 70) return "#fbbf24"; // amber-400
      return "#f87171"; // red-400
    }
    // For other metrics, lower values are usually better
    if (metricKey === "LCP") {
      return value <= config.LCP.green ? "#4ade80" : value <= config.LCP.red ? "#fbbf24" : "#f87171";
    }
    if (metricKey === "FCP") {
      return value <= config.FCP.green  ? "#4ade80" : value <= config.FCP.red ? "#fbbf24" : "#f87171";
    }
    if (metricKey === "INP") {
      return value <= config.INP.green  ? "#4ade80" : value <= config.INP.red ? "#fbbf24" : "#f87171";
    }
    if (metricKey === "CLS") {
      return value <= config.CLS.green  ? "#4ade80" : value <= config.CLS.red ? "#fbbf24" : "#f87171";
    }
    if (metricKey === "FID") {
      return value <= config.FID.green  ? "#4ade80" : value <= config.FID.red ? "#fbbf24" : "#f87171";
    }
    
    // Default colors for other metrics
    return "#60a5fa"; // blue-400
  };

  // Custom tooltip formatter
  const tooltipFormatter = (value: any) => {
    if (metricKey === "CLS") return value.toFixed(3);
    if (metricKey === "LCP" || metricKey === "FCP") return `${value.toFixed(2)}s`;
    if (metricKey === "INP") return `${(value / 1000).toFixed(2)}s`;
    if (metricKey === "FID") return `${value}ms`;
    return value;
  };

  // Get appropriate unit for Y-axis label
  const getUnitLabel = () => {
    switch(metricKey) {
      case "LCP":
      case "FCP":
        return "seconds";
      case "INP":
        return "ms";
      case "CLS":
        return "score";
      case "FID":
        return "ms";
      case "LHS_Score":
        return "score";
      default:
        return "";
    }
  };

  // Get a friendly name for the metric
  const getFriendlyMetricName = () => {
    switch(metricKey) {
      case "LHS_Score": return "Lighthouse Score";
      case "LCP": return "Largest Contentful Paint";
      case "FCP": return "First Contentful Paint";
      case "INP": return "Interaction to Next Paint";
      case "CLS": return "Cumulative Layout Shift";
      case "FID": return "First Input Delay";
      default: return metricKey.toString();
    }
  };

  // Color array for pie charts
  const COLORS = ['#4ade80', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'];

  if (!data.length) {
    return <div className="text-center py-8 text-gray-500">No data available</div>;
  }

  // Bar Chart Component
  if (chartType === "bar") {
    return (
      <div className="w-full h-[400px]">
        <h3 className="text-lg font-medium mb-4 text-center">{getFriendlyMetricName()} by Page</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 120 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12 }}
            />
            <YAxis unit={` ${getUnitLabel()}`} />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={(label) => `/${label}`}
            />
            <Legend />
            <Bar
              dataKey="value"
              name={getFriendlyMetricName()}
              isAnimationActive={true}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(Number(entry.value))}
                  stroke={entry.blocked ? "#991b1b" : "none"}
                  strokeWidth={entry.blocked ? 2 : 0} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Line Chart Component
  if (chartType === "line") {
    return (
      <div className="w-full h-[400px]">
        <h3 className="text-lg font-medium mb-4 text-center">{getFriendlyMetricName()} Trend by Page</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 120 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12 }}
            />
            <YAxis unit={` ${getUnitLabel()}`} />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={(label) => `/${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              name={getFriendlyMetricName()}
              activeDot={{ r: 8 }}
              strokeWidth={2}
              dot={{ 
                stroke: '#8884d8', 
                strokeWidth: 1, 
                r: 4,
                fill: 'white' 
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Pie Chart Component
  if (chartType === "pie") {
    return (
      <div className="w-full h-[400px]">
        <h3 className="text-lg font-medium mb-4 text-center">{getFriendlyMetricName()} Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(Number(entry.value)) || COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return <div>Select a chart type</div>;
};

export default DataVisualization;