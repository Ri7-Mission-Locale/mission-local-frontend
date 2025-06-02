import { Link } from "react-router";



export default function ButtonLink({ label, bgColor, color, className, to }) {
  return (
    <Link
      to={to}
      className={`${color} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${bgColor} ${className}`}
    >
      {label}
    </Link>
  );
}