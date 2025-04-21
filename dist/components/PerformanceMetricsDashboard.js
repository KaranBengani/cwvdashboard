import { jsx as _jsx } from "react/jsx-runtime";
import { Card } from "./ui/card";
import Dashboard from "./Dashboard";
const PerformanceMetricsDashboard = ({ data, config }) => {
    return (_jsx(Card, { className: "p-4 shadow-lg", children: _jsx(Dashboard, { data: data, config: config }) }));
};
// This is the main export for the package
export default PerformanceMetricsDashboard;
