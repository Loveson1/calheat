import { getCalendarDays } from "../utils/calendar";
import { useEffect, useState } from "react";
import { getOccupancyForDate } from "../utils/occupancy";
import { getHeatMapColor } from "../utils/heatmap";

function CalendarGrid() {
  const weekDays = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const calendarDays = getCalendarDays(year, month);

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

  // logic to handle current, previous and next month
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // const days = Array.from({ length: 31 }, (_, i) => i + 1);
  // logic for handling selection
  const [selection, setSelection] = useState({
    start:null,
    end:null,
    isdragging:false
  })

  return (
    <>
      <h1>
        {monthName} {year}
      </h1>
      <div>
        <button onClick={handlePreviousMonth}>previous</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="weekdays">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const occupancy = getOccupancyForDate(day.date, bookings);
          const backgroundColor = day.isCurrentMonth
            ? getHeatMapColor(occupancy)
            : "#4a4a4a";

          return (
            <div
              className="day-cell"
              key={index}
              className={`${day.isCurrentMonth ? "day-cell" : "faded-cell"} text-color`}
              style={{ backgroundColor }}
            >
              {day.dayNumber}
              <br className="" />
              <small className="text-color">{occupancy}/10 occupied</small>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CalendarGrid;
