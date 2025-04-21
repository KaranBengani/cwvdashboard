import React from "react";
import { PageMetric } from "./types";
interface FilterOptionsProps {
    data: PageMetric[];
    onFilterChange: (filtered: PageMetric[]) => void;
}
declare const FilterOptions: React.FC<FilterOptionsProps>;
export default FilterOptions;
