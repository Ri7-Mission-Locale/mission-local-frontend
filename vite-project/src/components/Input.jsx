export default function Input({htmlFor,label,id,type,placeholder,name,handleChange,...rest}) {
  return (
    <>
      <div className="">
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
        <input name={name}
        id={id}
          type={type}
          className="bg-gray-50 border font-thin
 border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5   "
          placeholder={placeholder}
          required
          onChange={handleChange}
          {...rest}
        />
      </div>
    </>
  );
}



