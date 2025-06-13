
export default function Select({className, options, name, id, onChange}) {
    return (
        <select name={name} id={id} onChange={onChange} className={"" + className}>
            {options.map((option, i) => (
                <option key={i} value={option.value}>{option.name}</option>
            ))}
        </select>
    )
}