export default function Button({
  label,
  bgColor,
  color,
  onClick,
  type,
  className,
}) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`${color}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${bgColor}  ${className}`}
      >
        {label}{" "}
      </button>
    </>
  );
}
