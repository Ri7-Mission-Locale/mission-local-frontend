/*
const items = [
    {
        name: "",
        icon: "",
        center: false,
    },
]
*/
export default function Navbar() {
    return (
        <nav className="fixed bottom-3 left-[50%] translate-x-[-50%] mx-auto rounded-xl h-20 max-w-[95%] w-sm bg-nav">
            <ul className="flex text-gray-800 justify-around items-center h-full">
                <li>x</li>
                <li>x</li>
                <li className="relative flex justify-center text-white items-center bottom-3 rotate-45 bg-blue-500 w-15 h-15 rounded-xl">
                    x
                </li>
                <li>x</li>
                <li>x</li>
            </ul>
        </nav>
    )
}