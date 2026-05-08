export function getOccupancyForDate(date, bookings) {
  let occupiedRooms = 0;

  bookings.forEach((booking) => {
    if (booking.status === "cancelled") return;

    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)

    if(date >= checkIn && date < checkOut){
        occupiedRooms++
    }

  });
  return occupiedRooms
}
