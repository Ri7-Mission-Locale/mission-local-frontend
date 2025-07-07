import { IoIosClose } from "react-icons/io";

export default function Sidebar({ open, onToggleNav }) {
    return (
        <aside className={"w-100 bg-gray-800 text-white h-full fixed top-0 left-0 z-50 transition-transform" + (open ? " translate-x-0" : " -translate-x-full")}>
            <div className="flex flex-col justify-between p-4">
                <button onClick={onToggleNav} className="text-white">
                    <IoIosClose className="text-6xl" />
                </button>
                <img src="/assets/images/logo-mission-locale.png" alt="IMAGE" draggable="false" className="h-full" />
            </div>
            <nav className="mt-4">
                <ul>
                    <li><a href="/" className="block px-4 py-2 hover:bg-gray-700">Accueil</a></li>
                    <li><a href="/rdv" className="block px-4 py-2 hover:bg-gray-700">Prendre rendez-vous</a></li>
                </ul>
            </nav>
        </aside>
    );
}