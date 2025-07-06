import { FiSearch } from "react-icons/fi";
import { Link } from "react-router";

export default function Toppbar({ onToggleNav }) {
  const items = [
    { label: "Accueil", href: "/" },
    { label: "Prendre rendez-vous", href: "/rdv" },
  ];

  return (
    <header className="flex items-center justify-between px-5 py-3">

      <button
        onClick={onToggleNav}
        className="flex md:hidden flex-col justify-around h-7 w-7"
      >
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
      </button>

      <Link href="/" draggable="false" className="h-20">
        <img src="/assets/images/logo-mission-locale.png" alt="IMAGE" draggable="false" className="h-full" />
      </Link>

      <nav className="md:flex gap-1 items-center hidden">
        {items.map((item) => (
          <Link key={item.label} href={item.href} draggable="false">
            {item.label}
          </Link>
        ))}
      </nav>

      <button className="md:hidden text-blue-400 text-2xl">
        <FiSearch />
      </button>

    </header>
  );
}
