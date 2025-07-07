import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useMemo, useState } from "react";
import api from "../../api/fetcher";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const handleDateSet = (arg)=>{
console.log(arg);
 }


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await api.get("workshops");
        console.log(data.data);
        setEvents(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);

  return (
    <>
      <FullCalendar
        locale={"fr"}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        datesSet={handleDateSet}
        
      />
    </>
  );
}
