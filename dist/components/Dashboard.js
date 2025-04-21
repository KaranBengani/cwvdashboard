"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card } from "./ui/card";
import MetricsTable from "./MetricsTable";
import DataVisualization from "./DataVisualization";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import FilterOptions from "./FilterOptions";
import { ArrowDownUp, BarChart3, LineChart, PieChart } from "lucide-react";
const Dashboard = ({ data, config }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [activeChart, setActiveChart] = useState("bar");
    const [metricToVisualize, setMetricToVisualize] = useState("LHS_Score");
    const handleFilterChange = (filtered) => {
        setFilteredData(filtered);
    };
    return (_jsxs("div", { className: "container mx-auto p-4 space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Performance Metrics Dashboard" }), _jsx(FilterOptions, { data: data, onFilterChange: handleFilterChange })] }), _jsxs(Tabs, { defaultValue: "table", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full md:w-[400px] grid-cols-2", children: [_jsxs(TabsTrigger, { value: "table", className: "flex items-center gap-2", children: [_jsx(ArrowDownUp, { size: 16 }), "Table View"] }), _jsxs(TabsTrigger, { value: "visualization", className: "flex items-center gap-2", children: [_jsx(BarChart3, { size: 16 }), "Visualization"] })] }), _jsx(TabsContent, { value: "table", className: "mt-6", children: _jsx(Card, { className: "p-4", children: _jsx(MetricsTable, { data: filteredData, config: config }) }) }), _jsx(TabsContent, { value: "visualization", className: "mt-6", children: _jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Select Chart Type" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: activeChart === "bar" ? "default" : "outline", size: "sm", onClick: () => setActiveChart("bar"), className: "flex items-center gap-2", children: [_jsx(BarChart3, { size: 16 }), "Bar"] }), _jsxs(Button, { variant: activeChart === "line" ? "default" : "outline", size: "sm", onClick: () => setActiveChart("line"), className: "flex items-center gap-2", children: [_jsx(LineChart, { size: 16 }), "Line"] }), _jsxs(Button, { variant: activeChart === "pie" ? "default" : "outline", size: "sm", onClick: () => setActiveChart("pie"), className: "flex items-center gap-2", children: [_jsx(PieChart, { size: 16 }), "Pie"] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Select Metric" }), _jsxs("select", { value: metricToVisualize, onChange: (e) => setMetricToVisualize(e.target.value), className: "border rounded p-2 bg-background", children: [_jsx("option", { value: "LHS_Score", children: "Lighthouse Score" }), _jsx("option", { value: "LCP", children: "LCP" }), _jsx("option", { value: "FCP", children: "FCP" }), _jsx("option", { value: "INP", children: "INP" }), _jsx("option", { value: "CLS", children: "CLS" }), _jsx("option", { value: "FID", children: "FID" })] })] })] }), _jsx(Separator, {}), _jsx(DataVisualization, { data: filteredData, chartType: activeChart, metricKey: metricToVisualize, config: config })] }) }) })] })] }));
};
export default Dashboard;
