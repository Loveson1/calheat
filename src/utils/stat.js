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

export function getAverageMonthlyOccupancy(bookings, calendarDays) {
  let total = 0;
 const  totalRooms = 10

  calendarDays.forEach((day) => {
    total += getOccupancyForDate(day.date, bookings);
  });

  let avg = ((total / calendarDays.length) / totalRooms) * 100

  return (avg).toFixed(2) 
}


