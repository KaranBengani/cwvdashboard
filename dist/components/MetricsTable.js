"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./ui/table";
import { Badge } from "./ui/badge";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";
const MetricsTable = ({ data, config }) => {
    const [sortField, setSortField] = useState("LHS_Score");
    const [sortDirection, setSortDirection] = useState("desc");
    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        }
        else {
            setSortField(field);
            setSortDirection("desc");
        }
    };
    const sortedData = [...data].sort((a, b) => {
        if (a[sortField] < b[sortField])
            return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField])
            return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
    // Helper function to determine score badge color
    const getScoreBadgeColor = (score) => {
        if (score >= 90)
            return "bg-green-500 hover:bg-green-600";
        if (score >= 70)
            return "bg-yellow-500 hover:bg-yellow-600";
        return "bg-red-500 hover:bg-red-600";
    };
    // Helper function to format metric values
    const formatMetricValue = (key, value) => {
        if (key === "CLS")
            return value.toFixed(3);
        if (key === "LCP" || key === "FCP")
            return `${value.toFixed(2)}s`;
        if (key === "INP")
            return `${(value / 1000).toFixed(2)}s`;
        if (key === "FID")
            return `${value}ms`;
        return value;
    };
    // Helper to determine if a metric value is good/bad
    const getMetricStatus = (key, value) => {
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
    const renderSortIcon = (field) => {
        if (field !== sortField)
            return _jsx(ArrowRight, { size: 14 });
        return sortDirection === "asc" ? _jsx(ArrowUp, { size: 14 }) : _jsx(ArrowDown, { size: 14 });
    };
    return (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort("url"), children: _jsxs("div", { className: "flex items-center gap-1", children: ["URL ", renderSortIcon("url")] }) }), _jsx(TableHead, { className: "cursor-pointer text-center", onClick: () => handleSort("LHS_Score"), children: _jsxs("div", { className: "flex items-center gap-1 justify-center", children: ["Lighthouse Score ", renderSortIcon("LHS_Score")] }) }), _jsx(TableHead, { className: "cursor-pointer text-center", onClick: () => handleSort("LCP"), children: _jsxs("div", { className: "flex items-center gap-1 justify-center", children: ["LCP ", renderSortIcon("LCP")] }) }), _jsx(TableHead, { className: "cursor-pointer text-center", onClick: () => handleSort("FCP"), children: _jsxs("div", { className: "flex items-center gap-1 justify-center", children: ["FCP ", renderSortIcon("FCP")] }) }), _jsx(TableHead, { className: "cursor-pointer text-center", onClick: () => handleSort("INP"), children: _jsxs("div", { className: "flex items-center gap-1 justify-center", children: ["INP ", renderSortIcon("INP")] }) }), _jsx(TableHead, { className: "cursor-pointer text-center", onClick: () => handleSort("CLS"), children: _jsxs("div", { className: "flex items-center gap-1 justify-center", children: ["CLS ", renderSortIcon("CLS")] }) }), _jsx(TableHead, { className: "cursor-pointer text-center", onClick: () => handleSort("FID"), children: _jsxs("div", { className: "flex items-center gap-1 justify-center", children: ["FID ", renderSortIcon("FID")] }) }), _jsx(TableHead, { className: "cursor-pointer text-center", onClick: () => handleSort("blocked"), children: _jsxs("div", { className: "flex items-center gap-1 justify-center", children: ["Status ", renderSortIcon("blocked")] }) })] }) }), _jsx(TableBody, { children: sortedData.map((item, index) => (_jsxs(TableRow, { className: item.blocked ? "bg-red-50 " : "", children: [_jsx(TableCell, { className: "font-medium truncate max-w-[150px]", title: item.url, children: item.url }), _jsx(TableCell, { className: "text-center", children: _jsx(Badge, { className: `${getScoreBadgeColor(item.LHS_Score)} text-white`, children: item.LHS_Score }) }), _jsx(TableCell, { className: `text-center ${getMetricStatus("LCP", item.LCP) === "good"
                                    ? "text-green-600 "
                                    : getMetricStatus("LCP", item.LCP) === "needs-improvement"
                                        ? "text-yellow-600 "
                                        : "text-red-600 "}`, children: formatMetricValue("LCP", item.LCP) }), _jsx(TableCell, { className: `text-center ${getMetricStatus("FCP", item.FCP) === "good"
                                    ? "text-green-600"
                                    : getMetricStatus("FCP", item.FCP) === "needs-improvement"
                                        ? "text-yellow-600 "
                                        : "text-red-600"}`, children: formatMetricValue("FCP", item.FCP) }), _jsx(TableCell, { className: `text-center ${getMetricStatus("INP", item.INP) === "good"
                                    ? "text-green-600 "
                                    : getMetricStatus("INP", item.INP) === "needs-improvement"
                                        ? "text-yellow-600 "
                                        : "text-red-600"}`, children: formatMetricValue("INP", item.INP) }), _jsx(TableCell, { className: `text-center ${getMetricStatus("CLS", item.CLS) === "good"
                                    ? "text-green-600 "
                                    : getMetricStatus("CLS", item.CLS) === "needs-improvement"
                                        ? "text-yellow-600 "
                                        : "text-red-600 "}`, children: formatMetricValue("CLS", item.CLS) }), _jsx(TableCell, { className: `text-center ${getMetricStatus("FID", item.FID) === "good"
                                    ? "text-green-600 "
                                    : getMetricStatus("FID", item.FID) === "needs-improvement"
                                        ? "text-yellow-600 "
                                        : "text-red-600"}`, children: formatMetricValue("FID", item.FID) }), _jsx(TableCell, { className: "text-center", children: item.blocked ? (_jsx(Badge, { variant: "destructive", children: "Blocked" })) : (_jsx(Badge, { variant: "outline", className: "bg-green-100 text-green-800 border-green-200", children: "Active" })) })] }, index))) })] }) }));
};
export default MetricsTable;
