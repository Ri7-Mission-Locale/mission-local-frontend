export default function ButtonWorkshop({type, title,onClick }){
    return(
        <button
        onClick={onClick}
        type={type}
        className="bg-cyan-400 text-white px-4 py-2 rounded-md hover:bg-cyan-400 flex justify-center">
        {title}
      </button>
    )
}