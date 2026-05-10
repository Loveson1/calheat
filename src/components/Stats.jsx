import { getMonthlyRevenue, getMonthlyBooking, getAverageMonthlyOccupancy  } from "../utils/stat";


export default function Stats({ bookings,  calendarDays }) {
  const monthlyReveneu = getMonthlyRevenue(bookings);
  const monthlyBooking = getMonthlyBooking(bookings);
  const avgOcc = getAverageMonthlyOccupancy(bookings, calendarDays);
 
  return (
    <div className="flex-btw">
      <h2 className="text-color card2 ">
    <small className="opa-50">    Monthly Revenue 
       </small> 
         <br  />
       ₹{monthlyReveneu.toLocaleString()}
      </h2>
       <h2 className="text-color card2 ">
    <small className="opa-50">  Monthly Bookings  
      </small> 
        <br  />
       00{monthlyBooking}
      </h2>
      <h2 className="text-color card2 ">
    <small className="opa-50">   Avg. Occupancy  
      </small> 
      <br  />
      {avgOcc}%
      </h2>
    </div>
  );
}
