import { weekDays } from "../../services/dateUtils";

export default function AgendaDays({ slice }) {
    return (
        <div className="grid grid-cols-7 p-1 gap-1 px-1">
            {weekDays.map((day) => (
                <div key={day} className="text-center p-1">
                    {slice ? day.slice(0, 3) : day}
                </div>
            ))}
        </div>
    )
}