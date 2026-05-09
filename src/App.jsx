import "./index.css";
import CalendarGrid from "./components/CalendarGrid";
import { useState, useEffect } from "react";
import BookingPanel from "./components/BookingPanel";

function App() {
  // async function for fetching the json data
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function fetchBook() {
      const response = await fetch("/bookings.json");
      const data = await response.json();
      setBookings(data);
    }

    fetchBook();
  }, []);

  // logic for handling selection
  const [selection, setSelection] = useState({
    start: null,
    end: null,
    isDragging: false,
  });

  //logic to normalize dragging forward/backward
  const start = selection.start;
  const end = selection.end;

  const from = start < end ? start : end;
  const to = start < end ? end : start;

  // filter logic
  const [filters, setFilters] = useState({
    roomType: "all",
    status: "all",
    source: "all",
  });

  const filteredBookings = bookings.filter((booking) => {
    const matchesRoomType =
      filters.roomType === "all" || booking.roomType === filters.roomType;
    const matchesStatus =
      filters.status === "all" || booking.status === filters.status;
    const matchesSource =
      filters.source === "all" || booking.source === filters.source;

    return matchesRoomType && matchesStatus && matchesSource;
  });

  return (
    <>
      <div className="filters">
        <select
          value={filters}
          onChange={(e)=>setFilters((prev) => ({
            ...prev,
            roomType: e.target.value,
          }))}
        >
          <option value="all">All Room Types</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="Penthouse">Penthouse</option>
        </select>
      </div>
      <CalendarGrid
        bookings={filteredBookings}
        selection={selection}
        setSelection={setSelection}
        from={from}
        to={to}
      />

      <BookingPanel
        bookings={filteredBookings}
        selection={selection}
        setSelection={setSelection}
        from={from}
        to={to}
      />
    </>
  );
}

export default App;
