import { getCalendarDays } from "../utils/calendar";
import { useEffect, useState } from "react";
import { getOccupancyForDate } from "../utils/occupancy";
import { getHeatMapColor } from "../utils/heatmap";
import Stats from "./Stats";

function CalendarGrid({ bookings, selection, setSelection, from, to }) {
  const weekDays = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const calendarDays = getCalendarDays(year, month);

  // logic to handle current, previous and next month
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // logic to make drag still work even when user drags outside the cell
  useEffect(() => {
    const handleMouseUp = () => {
      setSelection((prev) => ({
        ...prev,
        isDragging: false,
      }));
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // logic to calculate monthly revenue
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  const monthBookings = bookings.filter((booking) => {
    if (booking.status === "cancelled") return false;
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);

    return checkIn < monthEnd && checkOut > monthStart;
  });

  return (
    <div>
      <Stats bookings={monthBookings} calendarDays={calendarDays} />

      <div className="flex-center">
      <h1>
        {monthName} {year}
      </h1>
      
      <div className="flex-btw">
        <button onClick={handlePreviousMonth}> Prev </button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNextMonth}>Next</button>
      </div>
</div>

      <div className="weekdays">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <hr className="" />
      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const isSelected =
            selection.start &&
            selection.end &&
            day.date >= from &&
            day.date <= to;

          const occupancy = getOccupancyForDate(day.date, bookings);
          const backgroundColor = isSelected
            ? "#fde68a"
            : day.isCurrentMonth
              ? getHeatMapColor(occupancy)
              : "#112f56"
          return (
            <div
              key={index}
              className={`${day.isCurrentMonth ? "day-cell" : "faded-cell"} `}
              style={{ backgroundColor }}
              onMouseDown={() => {
                setSelection({
                  start: day.date,
                  end: day.date,
                  isDragging: true,
                });
              }}
              onMouseUp={() => {
                setSelection((prev) => ({
                  ...prev,
                  isDragging: false,
                }));
              }}
              onMouseEnter={() => {
                if (!selection.isDragging) return;
                setSelection((prev) => ({
                  ...prev,
                  end: day.date,
                }));
              }}
            >
              {day.dayNumber}
              <br className="" />
              <small>{occupancy}/10 occupied</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
