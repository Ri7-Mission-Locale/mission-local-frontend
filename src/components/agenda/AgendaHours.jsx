
export default function AgendaHours({ date, onChange }) {
    const hours = [
        {
            hour: "9:00",
            disponible: true
        },
        {
            hour: "10:00",
            disponible: true
        },
        {
            hour: "11:00",
            disponible: true
        },
        {
            hour: "13:00",
            disponible: true
        },
        {
            hour: "14:00",
            disponible: true
        },
        {
            hour: "15:00",
            disponible: true
        },
        {
            hour: "16:00",
            disponible: true
        },
    ];

    return (
        <div className="relative z-10">
            <p>Horraires:</p>
            <div className="flex flex-col gap-1">
                {hours.map((value) => (
                    <label key={value.hour} htmlFor={value.hour} className="cursor-pointer max-w-15">
                        <input type="radio" className="hidden peer" id={value.hour} name={date.toISOString()} onSelect={() => onChange(value.hour)} />
                        <span className="flex items-center bg-gray-300 text-white p-1 rounded-sm peer-checked:bg-blue-500 w-full select-none">{value.hour}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}