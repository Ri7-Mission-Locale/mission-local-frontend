



export default function Button({label,bgColor,color,onClick,type}){
return(
<>
<button tp  onClick={onClick}  type={type} className={` mx-auto ${color }  w-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${bgColor}`} >{label}  </button>
</>

)
}