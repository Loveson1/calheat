import { getCalendarDays } from "../utils/calendar";
import { useEffect, useState } from "react";
import { getOccupancyForDate } from "../utils/occupancy";
import { getHeatMapColor } from "../utils/heatmap";

function CalendarGrid({ bookings, selection, setSelection, from, to }) {

  const weekDays = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const calendarDays = getCalendarDays(year, month,);

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

  return (
    <div>
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
          const isSelected =
            selection.start &&
            selection.end &&
            day.date >= from && day.date <= to;

          const occupancy = getOccupancyForDate(day.date, bookings);
          const backgroundColor = isSelected
            ? "#fde68a"
            : day.isCurrentMonth
              ? getHeatMapColor(occupancy)
              : "#4a4a4a";

          return (
            <div
             
              key={index}
              className={`${day.isCurrentMonth ? "day-cell" : "faded-cell"} text-color`}
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
              <small className="text-color">{occupancy}/10 occupied</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
