"use client"

import React, { useState, useMemo } from "react";
import { PageMetric, ScoreFilterType, StatusFilterType } from "./types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Separator } from "./ui/separator";

interface FilterOptionsProps {
  data: PageMetric[];
  onFilterChange: (filtered: PageMetric[]) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ data, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState<ScoreFilterType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");

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

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <div className="relative flex-grow">
        <Search size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search URLs..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // For immediate filtering on search
            const newFiltered = data.filter(
              item => 
                item.url.toLowerCase().includes(e.target.value.toLowerCase()) && 
                (scoreFilter === "all" || 
                  (scoreFilter === "good" && item.LHS_Score >= 90) ||
                  (scoreFilter === "average" && item.LHS_Score >= 70 && item.LHS_Score < 90) ||
                  (scoreFilter === "poor" && item.LHS_Score < 70)) &&
                (statusFilter === "all" || 
                  (statusFilter === "active" && !item.blocked) ||
                  (statusFilter === "blocked" && item.blocked))
            );
            onFilterChange(newFiltered);
          }}
          className="pl-8"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Filter Options</h4>
            <Separator />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Score</label>
              <Select 
                value={scoreFilter} 
                onValueChange={(value: "all" | "good" | "average" | "poor") => setScoreFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="good">Good (90+)</SelectItem>
                  <SelectItem value="average">Average (70-89)</SelectItem>
                  <SelectItem value="poor">Poor (Below 70)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={statusFilter} 
                onValueChange={(value: "all" | "active" | "blocked") => setStatusFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset
              </Button>
              <Button size="sm" onClick={handleFilterApply}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterOptions;