



export default function Button({ label, bgColor, color, onClick, type,size }) {
    return (
        <>
            <button tp onClick={onClick} type={type} className={` ${color}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${bgColor} ${size} `} >{label}  </button>
        </>

    )
}