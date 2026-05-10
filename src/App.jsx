import "./index.css";
import CalendarGrid from "./components/CalendarGrid";
import { useState, useEffect } from "react";
import BookingPanel from "./components/BookingPanel";
import Stat from "./components/Stats";

function App() {
  // async function for fetching the json data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const response = await fetch("/bookings.json");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return (
      <div className="card">
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p>Failed to load bookings.</p>
      </div>
    );
  }
  return (
    <>
      <div className="flex-center mb">
        <div>
          <b>Calheat</b>
        </div>
        <div className="flex-end">
          <div>
            <select
              value={filters.roomType}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  roomType: e.target.value,
                }))
              }
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="all">All Room Types</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          <div>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="all">Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_out">Checked Out</option>
            </select>
          </div>

          <div>
            <select
              value={filters.source}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  source: e.target.value,
                }))
              }
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="all">All Sources</option>
              <option value="Airbnb">Airbnb</option>
              <option value="Expedia">Expedia</option>
              <option value="Booking.com">Booking.com</option>
              <option value="Agoda">Agoda</option>
              <option value="Direct">Direct</option>
              <option value="Walk-in"> Walk-In</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-40 ">
        <div className="flex-1">
          <CalendarGrid
            className="over"
            bookings={filteredBookings}
            selection={selection}
            setSelection={setSelection}
            from={from}
            to={to}
          />
        </div>
        <div className="side-panel-scroll ">
          <BookingPanel
            bookings={filteredBookings}
            selection={selection}
            setSelection={setSelection}
            from={from}
            to={to}
          />
        </div>
      </div>
    </>
  );
}

export default App;
