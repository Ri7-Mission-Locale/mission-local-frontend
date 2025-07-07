
export default function AgendaHours({ hours, date, onSelect, className }) {
    const filteredHours = hours.filter((hourStr) => {
        const [h] = hourStr.split(":").map(Number);
        return (h >= 9 && h < 12) || (h >= 14 && h < 17);
    });

    return (
        <div className={`relative z-10 ${className}`}>
            <p>Horaires :</p>
            <div className="flex flex-col gap-1">
                {filteredHours.map((value) => (
                    <label key={value} htmlFor={value} className="cursor-pointer max-w-15">
                        <input
                            type="radio"
                            className="hidden peer"
                            id={value}
                            name={date.toISOString()}
                            onChange={() => onSelect(value)}
                        />
                        <span className="flex items-center bg-gray-300 text-white p-1 rounded-sm peer-checked:bg-blue-500 w-full select-none">
                            {value}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}