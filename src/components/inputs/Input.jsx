import {useId} from "react";

export default function Input({label, type, placeholder, name, handleChange, className, value, ...rest}) {

    const id = useId();

    return (
        <>
            <div className={className}>
                <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    {label}
                </label>
                <input name={name}
                       id={id}
                       type={type}
                       className="bg-gray-50 border font-thin border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                       placeholder={placeholder}
                       onChange={handleChange}
                       value={value}
                       {...rest}
                />
            </div>
        </>
    );
}



