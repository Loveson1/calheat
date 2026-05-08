export function getHeatMapColor(occupancy) {
  if (occupancy === 0) return "#f1f5f9";
  if (occupancy <= 2) return "#dbeafe";
  if (occupancy <= 5) return "#93c5fd";
  if (occupancy <= 8) return "#3b82f6";
  return "#1d4ed8";
}
