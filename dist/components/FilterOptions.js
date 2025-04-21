"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { Search, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, } from "./ui/popover";
import { Separator } from "./ui/separator";
const FilterOptions = ({ data, onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [scoreFilter, setScoreFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    // Filter data based on current filters
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Search filter
            const matchesSearch = searchTerm
                ? item.url.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            // Score filter
            const matchesScore = scoreFilter === "all"
                ? true
                : scoreFilter === "good"
                    ? item.LHS_Score >= 90
                    : scoreFilter === "average"
                        ? item.LHS_Score >= 70 && item.LHS_Score < 90
                        : item.LHS_Score < 70;
            // Status filter
            const matchesStatus = statusFilter === "all"
                ? true
                : statusFilter === "active"
                    ? !item.blocked
                    : item.blocked;
            return matchesSearch && matchesScore && matchesStatus;
        });
    }, [data, searchTerm, scoreFilter, statusFilter]);
    // Apply filters
    const handleFilterApply = () => {
        onFilterChange(filteredData);
    };
    // Reset all filters
    const handleReset = () => {
        setSearchTerm("");
        setScoreFilter("all");
        setStatusFilter("all");
        onFilterChange(data);
    };
    return (_jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [_jsxs("div", { className: "relative flex-grow", children: [_jsx(Search, { size: 18, className: "absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" }), _jsx(Input, { type: "text", placeholder: "Search URLs...", value: searchTerm, onChange: (e) => {
                            setSearchTerm(e.target.value);
                            // For immediate filtering on search
                            const newFiltered = data.filter(item => item.url.toLowerCase().includes(e.target.value.toLowerCase()) &&
                                (scoreFilter === "all" ||
                                    (scoreFilter === "good" && item.LHS_Score >= 90) ||
                                    (scoreFilter === "average" && item.LHS_Score >= 70 && item.LHS_Score < 90) ||
                                    (scoreFilter === "poor" && item.LHS_Score < 70)) &&
                                (statusFilter === "all" ||
                                    (statusFilter === "active" && !item.blocked) ||
                                    (statusFilter === "blocked" && item.blocked)));
                            onFilterChange(newFiltered);
                        }, className: "pl-8" })] }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex items-center gap-2", children: [_jsx(Filter, { size: 16 }), "Filters"] }) }), _jsx(PopoverContent, { className: "w-80", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Filter Options" }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Score" }), _jsxs(Select, { value: scoreFilter, onValueChange: (value) => setScoreFilter(value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Filter by score" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Scores" }), _jsx(SelectItem, { value: "good", children: "Good (90+)" }), _jsx(SelectItem, { value: "average", children: "Average (70-89)" }), _jsx(SelectItem, { value: "poor", children: "Poor (Below 70)" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Status" }), _jsxs(Select, { value: statusFilter, onValueChange: (value) => setStatusFilter(value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "blocked", children: "Blocked" })] })] })] }), _jsxs("div", { className: "flex justify-between pt-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: handleReset, children: "Reset" }), _jsx(Button, { size: "sm", onClick: handleFilterApply, children: "Apply Filters" })] })] }) })] })] }));
};
export default FilterOptions;
