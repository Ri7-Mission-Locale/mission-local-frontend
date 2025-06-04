
export default function Select({options, name, id, onChange}) {
    return (
        <select name={name} id={id} onChange={onChange}>
            {options.map((option, i) => (
                <option key={i} value={option.value}>{option.name}</option>
            ))}
        </select>
    )
}