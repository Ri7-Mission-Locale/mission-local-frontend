
const Textarea = ({ placeholder, value,name, onChange, className }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      name={name}

      onChange={onChange}
      className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Textarea;
