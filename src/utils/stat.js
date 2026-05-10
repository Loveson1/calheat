import { getOccupancyForDate } from "./occupancy";

export function getMonthlyRevenue(bookings) {
  return bookings.reduce((sum, b) => {
    if (b.status === "cancelled") return sum;
    return sum + (b.totalAmount || 0);
  }, 0);
}

export function getMonthlyBooking(bookings) {
  const monthlyBooking = bookings.filter(
    (booking) => booking.status !== "cancelled",
  ).length;
  return monthlyBooking;
}

export function getAverageMonthlyOccupancy(bookings, calendarDays, currentMonth) {
  let total = 0;
  const totalRooms = 10;

  // Filter to only count days in the target month
  const monthDays = calendarDays.filter(day => day.date.getMonth() === currentMonth);

  monthDays.forEach((day) => {
    total += getOccupancyForDate(day.date, bookings);
  });

  // Calculate based only on the days of that month
  let avg = (total / monthDays.length / totalRooms) * 100;

  return avg.toFixed(2); 
}



  
