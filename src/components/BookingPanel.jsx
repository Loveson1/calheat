import { normalize } from "../utils/normalizedDate";

export default function BookingPanel({
  bookings,
  selection,
  setselection,
  from,
  to,
}) {
  if (!from || !to) {
    return (
      <div>
        <h2>Bookings</h2>
        <p>No date selected</p>
      </div>
    );
  }
  const selectedStart = normalize(from);
  const selectedEnd = normalize(to);

  const selectedBookings = bookings.filter((booking) => {
    if (booking.status === "cancelled") return false;

    const checkIn = normalize(new Date(booking.checkIn));
    const checkOut = normalize(new Date(booking.checkOut));

    return checkIn <= selectedEnd && checkOut > selectedStart;
  });

  return (
    <div>
      <h2 className="">Bookings</h2>
      {selectedBookings.map((booking) => {
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);

        const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        return (
          <div key={booking.id}>
            <p className="">Guest: {booking.guestName}</p>
            <p className="">Room - {booking.roomNumber}</p>
            <p className="">
              CheckIn: {booking.checkIn} - CheckOut: {booking.checkOut}
            </p>
            <p className="">
             {nights} Nights 
            </p>
            <p>Status: {booking.status}</p>
          </div>
        );
      })}
    </div>
  );
}
