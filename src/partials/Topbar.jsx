import { Link } from "react-router";

export default function Toppbar({ onToggleNav }) {
  const items = [
    { label: "Accueil", href: "/" },
    { label: "Prendre rendez-vous", href: "/rdv" },
  ];

  return (
    <header className="flex items-center justify-between px-5">

      <button
        onClick={onToggleNav}
        className="flex md:hidden flex-col justify-around h-7 w-7"
      >
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
      </button>

      <Link href="/" draggable="false">
        <img src="https://placehold.co/150x75" alt="IMAGE" draggable="false" />
      </Link>

      <nav className="md:flex gap-1 items-center hidden">
        {items.map((item) => (
          <Link key={item.label} href={item.href} draggable="false">
            {item.label}
          </Link>
        ))}
      </nav>

      <button className="md:hidden">
        <img src="https://placehold.co/64x64" alt="Photo de profile" className="rounded-full" />
      </button>

    </header>
  );
}
