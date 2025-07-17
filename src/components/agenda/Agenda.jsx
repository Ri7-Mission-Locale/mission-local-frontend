import { getDaysInMonth } from "@services/dateUtils";
import { useId, useState } from "react";
import AgendaItem from "./AgendaItem";
import AgendaSelector from "./AgendaSelector";
import AgendaDays from "./AgendaDays";

export default function Agenda({ onSelect, selectedDate }) {
	const now = new Date();
	const [currentMonth, setCurrentMonth] = useState(now);
	const agendaId = useId();

	const daysInMouth = getDaysInMonth(
		currentMonth.getMonth(),
		currentMonth.getFullYear(),
	);

	let startOffset = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1,).getDay() - 1;
	if (startOffset < 0) startOffset = 6;

	const handleChange = (newDate) => {
		onSelect(newDate);
	}

	return (
		<div className="bg-gray-200 rounded-md w-fit h-fit mx-auto relative z-20">
			<AgendaSelector date={now} onDateChange={(date) => setCurrentMonth(date)} />
			<AgendaDays slice />
			<div className="grid grid-cols-7 p-1 gap-1">
				{Array.from({ length: startOffset }).map((_, i) => <div key={i} />)}
				{daysInMouth.map((day) => (
					<AgendaItem key={day} day={day} checked={!!selectedDate && day.getTime() === selectedDate.getTime()} name={`agenda-${agendaId}`} onChange={(v) => handleChange(v)} />
				))}
			</div>
		</div>
	);
}
