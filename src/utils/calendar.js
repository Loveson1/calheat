export  function getCalendarDays(year, month) {

  const firstDayOfMonth = new Date(year, month, 1);
  const LastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = LastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();
  const previousMonthLastDay = new Date(year, month, 0).getDate();
  let nextMonthDay = 1;

  const calendarDays = [];

// logic for the previous month days used as filler month
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(year, month - 1, previousMonthLastDay - i),
      dayNumber: previousMonthLastDay - i,
      isCurrentMonth: false,
    });
  }

  // logic for the current month date
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: new Date(year, month, i),
      dayNumber: i,
      isCurrentMonth: true,
    });
  }

  // logic to ensure the calender is in multiple of 7 and for the ending filler month
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push({
      date: new Date(year, month + 1, nextMonthDay),
      dayNumber: nextMonthDay,
      isCurrentMonth: false,
    });

    nextMonthDay++;
  }

  return calendarDays;
}

//   const calendarDays = [];
//   for (let i = 0; i < startDay; i++) {
//     calendarDays.push(null);
//   }
// const days = Array.from({ length: 31 }, (_, i) => i + 1);
