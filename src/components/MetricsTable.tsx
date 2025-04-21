"use client"

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { PageMetric, WebVitalsConfig } from "./types";
import { Badge } from "./ui/badge";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";

interface MetricsTableProps {
  data: PageMetric[];
  config:WebVitalsConfig;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ data,config }) => {
  const [sortField, setSortField] = useState<keyof PageMetric>("LHS_Score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof PageMetric) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Helper function to determine score badge color
  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-500 hover:bg-green-600";
    if (score >= 70) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-red-500 hover:bg-red-600";
  };

  // Helper function to format metric values
  const formatMetricValue = (key: string, value: any) => {
    if (key === "CLS") return value.toFixed(3);
    if (key === "LCP" || key === "FCP") return `${value.toFixed(2)}s`;
    if (key === "INP") return `${(value / 1000).toFixed(2)}s`;
    if (key === "FID") return `${value}ms`;
    return value;
  };

  // Helper to determine if a metric value is good/bad
  const getMetricStatus = (key: string, value: number) => {
    switch (key) {
      case "LCP":
        return value <= config.LCP.green ? "good" : value <= config.LCP.red ? "needs-improvement" : "poor";
      case "FCP":
        return value <= config.FCP.green ? "good" : value <= config.FCP.red ? "needs-improvement" : "poor";
      case "INP":
        return value <= config.INP.green ? "good" : value <= config.INP.red ? "needs-improvement" : "poor";
      case "CLS":
        return value <= config.CLS.green ? "good" : value <= config.CLS.red ? "needs-improvement" : "poor";
      case "FID":
        return value <= config.FID.green ? "good" : value <= config.FID.red ? "needs-improvement" : "poor";
      default:
        return "neutral";
    }
  };

  // Helper to render the appropriate sort icon
  const renderSortIcon = (field: keyof PageMetric) => {
    if (field !== sortField) return <ArrowRight size={14} />;
    return sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("url")}
            >
              <div className="flex items-center gap-1">
                URL {renderSortIcon("url")}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer text-center" 
              onClick={() => handleSort("LHS_Score")}
            >
              <div className="flex items-center gap-1 justify-center">
                Lighthouse Score {renderSortIcon("LHS_Score")}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer text-center" 
              onClick={() => handleSort("LCP")}
            >
              <div className="flex items-center gap-1 justify-center">
                LCP {renderSortIcon("LCP")}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer text-center" 
              onClick={() => handleSort("FCP")}
            >
              <div className="flex items-center gap-1 justify-center">
                FCP {renderSortIcon("FCP")}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer text-center" 
              onClick={() => handleSort("INP")}
            >
              <div className="flex items-center gap-1 justify-center">
                INP {renderSortIcon("INP")}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer text-center" 
              onClick={() => handleSort("CLS")}
            >
              <div className="flex items-center gap-1 justify-center">
                CLS {renderSortIcon("CLS")}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer text-center" 
              onClick={() => handleSort("FID")}
            >
              <div className="flex items-center gap-1 justify-center">
                FID {renderSortIcon("FID")}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer text-center" 
              onClick={() => handleSort("blocked")}
            >
              <div className="flex items-center gap-1 justify-center">
                Status {renderSortIcon("blocked")}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index} className={item.blocked ? "bg-red-50 " : ""}>
              <TableCell className="font-medium truncate max-w-[150px]" title={item.url}>
                {item.url}
              </TableCell>
              
              <TableCell className="text-center">
                <Badge 
                  className={`${getScoreBadgeColor(item.LHS_Score)} text-white`}
                >
                  {item.LHS_Score}
                </Badge>
              </TableCell>
              
              <TableCell 
                className={`text-center ${
                  getMetricStatus("LCP", item.LCP) === "good" 
                    ? "text-green-600 " 
                    : getMetricStatus("LCP", item.LCP) === "needs-improvement"
                    ? "text-yellow-600 "
                    : "text-red-600 "
                }`}
              >
                {formatMetricValue("LCP", item.LCP)}
              </TableCell>
              
              <TableCell 
                className={`text-center ${
                  getMetricStatus("FCP", item.FCP) === "good" 
                    ? "text-green-600" 
                    : getMetricStatus("FCP", item.FCP) === "needs-improvement"
                    ? "text-yellow-600 "
                    : "text-red-600"
                }`}
              >
                {formatMetricValue("FCP", item.FCP)}
              </TableCell>
              
              <TableCell 
                className={`text-center ${
                  getMetricStatus("INP", item.INP) === "good" 
                    ? "text-green-600 " 
                    : getMetricStatus("INP", item.INP) === "needs-improvement"
                    ? "text-yellow-600 "
                    : "text-red-600"
                }`}
              >
                {formatMetricValue("INP", item.INP)}
              </TableCell>
              
              <TableCell 
                className={`text-center ${
                  getMetricStatus("CLS", item.CLS) === "good" 
                    ? "text-green-600 " 
                    : getMetricStatus("CLS", item.CLS) === "needs-improvement"
                    ? "text-yellow-600 "
                    : "text-red-600 "
                }`}
              >
                {formatMetricValue("CLS", item.CLS)}
              </TableCell>
              
              <TableCell 
                className={`text-center ${
                  getMetricStatus("FID", item.FID) === "good" 
                    ? "text-green-600 " 
                    : getMetricStatus("FID", item.FID) === "needs-improvement"
                    ? "text-yellow-600 "
                    : "text-red-600"
                }`}
              >
                {formatMetricValue("FID", item.FID)}
              </TableCell>
              
              <TableCell className="text-center">
                {item.blocked ? (
                  <Badge variant="destructive">Blocked</Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Active
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MetricsTable;
