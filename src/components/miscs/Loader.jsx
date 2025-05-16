export default function Loader({ className, size, weight }) {
    return <div className={`h-${size} w-${size} rounded-full border-${weight} border-t-blue-500 border-x-transparent border-b-transparent animate-spin ${className}`}></div>
}
