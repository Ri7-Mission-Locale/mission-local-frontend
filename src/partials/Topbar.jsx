import { FiSearch, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";
import api from "../api/fetcher";
import { useQueryClient } from "@tanstack/react-query";

export default function Toppbar({ onToggleNav }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const isAuthenticated = !!user;

  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (_) {

    }
    sessionStorage.clear();
    queryClient.removeQueries(["profile"]);
    navigate("/")
  }

  const items = [
    { label: "Accueil", href: "/" },
    { label: "Prendre rendez-vous", href: "/rdv" },
  ];

  return (
    <header className="flex items-center justify-between px-5 py-3">

      <button
        onClick={onToggleNav}
        className="flex flex-col justify-around h-7 w-7"
      >
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
        <span className="bg-blue-400 w-full h-1 rounded-sm"></span>
      </button>

      <Link href="/" draggable="false" className="h-10 md:h-20">
        <img src="/assets/images/logo-mission-locale.png" alt="IMAGE" draggable="false" className="h-full" />
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <button className="bg-blue-400 text-white px-4 py-2 rounded cursor-pointer" onClick={logout}>Se déconnecter</button>
          <Link to="/profile">
            <FiUser className="text-blue-400 text-2xl" />
          </Link>
        </div>

      ) : (
        <Link to="/login" className="block">
          <button className="bg-blue-400 text-white px-4 py-2 rounded">
            Se connecter
          </button>
        </Link>
      )}
    </header>
  );
}
