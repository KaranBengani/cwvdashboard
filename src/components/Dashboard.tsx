"use client"

import React, { useState } from "react";
import { Card } from "./ui/card";
import MetricsTable from "./MetricsTable";
import DataVisualization from "./DataVisualization";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { PageMetric, ChartType, MetricKey, WebVitalsConfig } from "./types";
import FilterOptions from "./FilterOptions";
import { ArrowDownUp, BarChart3, LineChart, PieChart } from "lucide-react";

interface DashboardProps {
  data: PageMetric[];
  config: WebVitalsConfig;
}

const Dashboard: React.FC<DashboardProps> = ({ data,config }) => {
  const [filteredData, setFilteredData] = useState<PageMetric[]>(data);
  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [metricToVisualize, setMetricToVisualize] = useState<MetricKey>("LHS_Score");
  
  const handleFilterChange = (filtered: PageMetric[]) => {
    setFilteredData(filtered);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Performance Metrics Dashboard</h1>
        <FilterOptions data={data} onFilterChange={handleFilterChange} />
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="table" className="flex items-center gap-2">
            <ArrowDownUp size={16} />
            Table View
          </TabsTrigger>
          <TabsTrigger value="visualization" className="flex items-center gap-2">
            <BarChart3 size={16} />
            Visualization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-6">
          <Card className="p-4">
            <MetricsTable data={filteredData} config={config}/>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Select Chart Type</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={activeChart === "bar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveChart("bar")}
                      className="flex items-center gap-2"
                    >
                      <BarChart3 size={16} />
                      Bar
                    </Button>
                    <Button
                      variant={activeChart === "line" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveChart("line")}
                      className="flex items-center gap-2"
                    >
                      <LineChart size={16} />
                      Line
                    </Button>
                    <Button
                      variant={activeChart === "pie" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveChart("pie")}
                      className="flex items-center gap-2"
                    >
                      <PieChart size={16} />
                      Pie
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Select Metric</h3>
                  <select
                    value={metricToVisualize}
                    onChange={(e) => setMetricToVisualize(e.target.value as MetricKey)}
                    className="border rounded p-2 bg-background"
                  >
                    <option value="LHS_Score">Lighthouse Score</option>
                    <option value="LCP">LCP</option>
                    <option value="FCP">FCP</option>
                    <option value="INP">INP</option>
                    <option value="CLS">CLS</option>
                    <option value="FID">FID</option>
                  </select>
                </div>
              </div>

              <Separator />

              <DataVisualization
                data={filteredData}
                chartType={activeChart}
                metricKey={metricToVisualize}
                config={config}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;