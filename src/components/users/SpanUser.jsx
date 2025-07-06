export default function SpanUser({ user }) {

    // TODO - Navlink (react-router)
    return (
        <a className={"flex justify-between items-center gap-3 h-22 p-2 border-t-1 border-gray-400"}>
            <div className="h-full aspect-square rounded-full">
                <img src="https://placehold.co/256" alt={`Photo de ${user.first_name} ${user.last_name}`} className="bg-amber-600 rounded-full h-full aspect-square" draggable={false} />
            </div>
            <div className="w-full flex flex-col">
                <p>{user.first_name} {user.last_name}</p>
                <p className="text-gray-700">{user.role}</p>
            </div>
            <span className="text-3xl">→</span>
        </a>
    )
}