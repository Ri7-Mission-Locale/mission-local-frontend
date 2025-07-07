import { useId } from "react"

export default function AgendaItem({ day, name, onChange, checked, ...props }) {
    const id = useId();

    return (
        <label htmlFor={id} className="cursor-pointer">
            <input type="radio" id={id} name={name} checked={checked} className="peer hidden" onChange={() => onChange(day)} {...props} />
            <span className="flex justify-center items-center bg-gray-300 hover:bg-gray-400 text-white rounded-sm peer-checked:bg-blue-500 peer-checked:hover:bg-blue-400 select-none">{day.getDate()}</span>
        </label>
    )
}