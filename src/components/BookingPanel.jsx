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
        <p className="card">No date selected</p>
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
      <h2>Bookings</h2>
      {selectedBookings.length === 0 ? (
        <div className="card">
          <p>No bookings found for selected date range.</p>
        </div>
      ) : (
        selectedBookings.map((booking) => {
          const checkIn = new Date(booking.checkIn);
          const checkOut = new Date(booking.checkOut);

          const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

          return (
            <div key={booking.id} className="card">
              <p className="">
                Guest:{" "}
                <span style={{ color: "whitesmoke" }}>{booking.guestName}</span>
              </p>
              <p className="">
                Room Number:{" "}
                <span style={{ color: "whitesmoke" }}>
                  {" "}
                  {booking.roomNumber}
                </span>
              </p>
              <p className="">
                CheckIn:{" "}
                <span style={{ color: "green" }}>{booking.checkIn}</span> -
                CheckOut:{" "}
                <span style={{ color: "green" }}>{booking.checkOut}</span>
              </p>
              <p className="">
                Night Span:{" "}
                <span style={{ color: "whitesmoke" }}>{nights} Nights </span>
              </p>
              <p>
                Status: <span style={{ color: "green" }}>{booking.status}</span>
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
