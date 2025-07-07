import { IoIosClose } from "react-icons/io";
import { Link } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Sidebar({ open, onToggleNav }) {
    const { data: user } = useCurrentUser();
    console.log(user);


    return (
        <aside className={"w-100 bg-gray-400 text-white h-screen fixed top-0 left-0 z-2000 transition-transform" + (open ? " translate-x-0" : " -translate-x-full")}>
            <div className="flex flex-col justify-between p-4">
                <button onClick={onToggleNav} className="text-white">
                    <IoIosClose className="text-6xl" />
                </button>
                <img src="/assets/images/logo-mission-locale.png" alt="Logo mission locale" height="64px" draggable="false" className="h-full" />
            </div>
            <div className="flex flex-col justify-between gap-10">
                <nav className="mt-4">
                    <ul>
                        <li><Link to="/" className="block px-4 py-2 hover:bg-gray-500">Accueil</Link></li>
                        <li><Link to="/news/list" className="block px-4 py-2 hover:bg-gray-500">Actualitées</Link></li>
                        <li><Link to="/workshop/list" className="block px-4 py-2 hover:bg-gray-500">Ateliers</Link></li>
                    </ul>
                </nav>
                {user && user.role === "ADMIN" && (
                    <nav className="mt-4">
                        <ul><Link to="/admin" className="block px-4 py-2 hover:bg-gray-500">Administration</Link></ul>
                    </nav>
                )}
            </div>

        </aside>
    );
}