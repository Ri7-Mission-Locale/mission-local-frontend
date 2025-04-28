import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

// Convertit les données renvoyées par Outlook en slots horaires
function generateMockSlots(data, startHour = 9, interval = 60) {
  const slotsPerHour = 60 / interval;

  return data.value.map((userSchedule) => {
    const slots = [];
    const { availabilityView, scheduleId, scheduleItems } = userSchedule;
    const date = scheduleItems[0]?.start?.dateTime.split("T")[0] || "N/A";

    for (let i = 0; i < availabilityView.length; i++) {
      const status = availabilityView[i];
      if (status === "0") {
        const hour = startHour + Math.floor(i / slotsPerHour);
        const minutes = (i % slotsPerHour) * interval;
        const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        slots.push(formattedTime);
      }
    }

    return {
      date,
      user: scheduleId,
      availableSlots: slots,
    };
  });
}

// Formate les données pour Outlook Calendar
function buildOutlookEvent(date, time, interval = 60, attendees = []) {
  const startDateTime = `${date}T${time}`;
  const end = new Date(`${date}T${time}`);
  end.setMinutes(end.getMinutes() + interval);
  const endDateTime = `${date}T${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
  console.log(attendees);

  return {
    subject: "Rendez-vous inscription",
    body: {
      contentType: "HTML",
      content: "Créneau réservé depuis la page d'inscription",
    },
    start: {
      dateTime: startDateTime,
      timeZone: "Romance Standard Time",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "Romance Standard Time",
    },
    location: {
      displayName: "En ligne",
    },
    attendees,
    isOnlineMeeting: false,
  };
}

// ✅ Composant principal avec forwardRef et useImperativeHandle
const AgendaSelector = forwardRef((props, ref) => {
  const { attendees = [] } = props; // ← récupère les attendees depuis le parent

  const [selectedSlots, setSelectedSlots] = useState({});
  const [agendaData, setAgendaData] = useState([]);

  // Permet au parent d'appeler getEventsToSend()
  useImperativeHandle(ref, () => ({
    getEventsToSend() {
      return Object.entries(selectedSlots).map(([date, time]) =>
        buildOutlookEvent(date, time, 60, attendees)
      );
    },
  }));

  // Données simulées de la réponse API outlook calendar
  const outlookApiResponse = {
    value: [
      {
        scheduleId: "adelev@contoso.com",
        availabilityView: "100220000",
        scheduleItems: [
          {
            start: {
              dateTime: "2019-03-15T12:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
            end: {
              dateTime: "2019-03-15T14:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
          },
        ],
      },
      {
        scheduleId: "adelev@contoso.com",
        availabilityView: "10220000",
        scheduleItems: [
          {
            start: {
              dateTime: "2019-03-16T12:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
            end: {
              dateTime: "2019-03-16T14:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const formatted = generateMockSlots(outlookApiResponse, 9, 60);
    setAgendaData(formatted);
  }, []);

  const handleChange = (date, slot) => {
    setSelectedSlots((prev) => {
      if (prev[date] === slot) {
        return {
          ...prev,
          [date]: undefined,
        };
      }
      return {
        ...prev,
        [date]: slot,
      };
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-bold mb-6">Prise de rendez-vous</h2>
      {agendaData.map((item) => (
        <div
          key={`${item.user}-${item.date}`}
          className="border rounded text-center m-auto p-4 mb-6 shadow-sm w-[80%] border-gray-300"
        >
          <div className="font-semibold mb-2">
            {new Date(item.date).toLocaleDateString()}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {item.availableSlots.length > 0 ? (
              item.availableSlots.map((slot) => (
                <div
                  key={slot}
                  onClick={() => handleChange(item.date, slot)}
                  className={`cursor-pointer px-4 py-2 rounded font-bold text-sm ${selectedSlots[item.date] === slot
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {slot}
                </div>
              ))
            ) : (
              <p className="text-red-500">Aucun créneau disponible</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

export default AgendaSelector;
