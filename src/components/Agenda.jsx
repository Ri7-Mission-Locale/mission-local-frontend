import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { getDaysInMonth, months, weekDays } from "../services/dateUtils";
import { useState } from "react";

export default function Agenda() {
	const now = new Date();
	const [currentDate, setCurrentDate] = useState(now);
	const daysInMouth = getDaysInMonth(
		currentDate.getMonth(),
		currentDate.getFullYear(),
	);

	const handlePrevMonth = () => {
		setCurrentDate((prevDate) => {
			if (!prevDate) return null;
			const newDate = new Date(prevDate);
			newDate.setMonth(newDate.getMonth() - 1);
			return newDate;
		});
	};

	const handleNextMonth = () => {
		setCurrentDate((prevDate) => {
			if (!prevDate) return null;
			const newDate = new Date(prevDate);
			newDate.setMonth(newDate.getMonth() + 1);
			return newDate;
		});
	};

	let startOffset =
		new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1,
		).getDay() - 1;
	if (startOffset < 0) startOffset = 6;

	return (
		<div className="border-1 border-black rounded-md w-fit mx-auto">
			<div className="flex gap-1 items-center justify-end px-2">
				{currentDate.toISOString().split("T")[0] !==
					now.toISOString().split("T")[0] && (
					<button
						type="button"
						className="h-10 w-10 flex items-center justify-center"
						onClick={handlePrevMonth}
					>
						<FaArrowLeft />
					</button>
				)}

				<p className="w-full">
					{months[currentDate.getMonth()]} (
					{currentDate.getFullYear()})
				</p>
				<button
					type="button"
					className="h-10 w-10 flex items-center justify-center"
					onClick={handleNextMonth}
				>
					<FaArrowRight />
				</button>
			</div>
			<div className="hidden md:grid grid-cols-7 p-1 gap-1 px-1">
				{weekDays.map((day) => (
					<div key={day} className="text-center">
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 p-1 gap-1">
				{Array.from({ length: startOffset }).map((day, i) => (
					<div key={day} />
				))}
				{daysInMouth.map((day) => (
					<div
						key={day}
						className="flex justify-center items-baseline border-1 border-black rounded-md p-1"
					>
						{day.getDate()}
					</div>
				))}
			</div>
		</div>
	);
}
