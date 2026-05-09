import { normalize } from "./normalizedDate";

export function getOccupancyForDate(date, bookings) {
  let occupiedRooms = 0;

  const target = normalize(date);

  bookings.forEach((booking) => {
    if (booking.status === "cancelled") return;

    const checkIn = normalize(new Date(booking.checkIn));
    const checkOut = normalize(new Date(booking.checkOut));

  

    if (target >= checkIn && target < checkOut) {
      occupiedRooms++;
    }
  });

  return occupiedRooms;
}