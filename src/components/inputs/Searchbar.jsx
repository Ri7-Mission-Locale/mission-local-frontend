import {useId} from "react";

export default function SearchBar({ label, name, className, onSearch }) {
    const id = useId();

    return (
        <div className={"rounded-xl border-gray-300 border-1 h-10 bg-transparent flex px-1 " + className}>
            <input type="text" id={id} name={name} onChange={onSearch}  placeholder={label} className="h-full w-full rounded-xl bg-transparent px-1" />
        </div>
    )
}