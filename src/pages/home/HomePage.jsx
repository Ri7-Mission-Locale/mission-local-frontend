import Agenda from "@components/agenda/Agenda"
import { useState } from "react"
import AgendaHours from "../../components/agenda/AgendaHours";

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleSelect = (date) => {
        setSelectedDate(date);
    }

    return (
        <>
            <h1>Welcome to Mission Local!</h1>

            <section className="flex flex-col md:flex-row justify-center gap-3 max-w-sm">
                <Agenda onSelect={handleSelect} />
                {selectedDate && (
                    <AgendaHours date={selectedDate} />
                )}
            </section>
        </>
    )
}