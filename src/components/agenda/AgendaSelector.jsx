import { useState } from "react";
import { months } from "@services/dateUtils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function AgendaSelector({ date, onDateChange }) {
    const [currentDate, setCurrentDate] = useState(date);

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => {
            if (!prevDate) return null;
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            onDateChange(newDate);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            if (!prevDate) return null;
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            onDateChange(newDate);
            return newDate;
        });
    };

    return (
        <div className="flex gap-1 items-center justify-end px-2">
            {currentDate.toISOString().split("T")[0] !==
                date.toISOString().split("T")[0] && (
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
    )
}