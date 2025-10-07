import { IoIosClose } from "react-icons/io";
import { Link } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Sidebar({ open, onToggleNav }) {
    const { data: user } = useCurrentUser();

    return (
        <aside className={"w-100 bg-primary text-white h-screen fixed top-0 left-0 z-2000 transition-transform" + (open ? " translate-x-0" : " -translate-x-full")}>
            <div className="flex flex-col justify-between p-2">
                <button onClick={onToggleNav} className="text-white">
                    <IoIosClose className="text-6xl" />
                </button>
            </div>
            <div className="flex flex-col justify-between gap-10">
                <nav className="mt-4">
                    <ul>
                        <li><Link to="/" className="block px-4 py-2 transition-colors hover:bg-primary hover:brightness-115">Accueil</Link></li>
                        <li><Link to="/news/list" className="block px-4 py-2 transition-colors hover:bg-primary hover:brightness-115">Actualitées</Link></li>
                        <li><Link to="/workshop/list" className="block px-4 py-2 transition-colors hover:bg-primary hover:brightness-115">Ateliers</Link></li>
                    </ul>
                </nav>
                {user && user.role === "ADMIN" && (
                    <nav className="mt-4">
                        <ul><Link to="/admin" className="block px-4 py-2 transition-colors hover:bg-primary hover:brightness-115">Administration</Link></ul>
                    </nav>
                )}
            </div>

        </aside>
    );
}