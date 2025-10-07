import { FiSearch, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";
import api from "../api/fetcher";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Toppbar({ onToggleNav }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const isAuthenticated = !!user;

  const logout = async () => {
    try {
      await api.get("/auth/logout").then(() => {
        toast.success("Vous etes déconnecté !");
      });
    } catch (err) {
      console.log(err);

    }
    sessionStorage.clear();
    queryClient.removeQueries(["profile"]);
    navigate("/")
  }

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-gray-200">
      <div className="w-full flex items-center justify-start">
        <button
          onClick={onToggleNav}
          className="group flex flex-col justify-around h-7 w-7"
        >
          <span className="bg-primary group-hover:brightness-115 w-full h-1 rounded-sm"></span>
          <span className="bg-primary group-hover:brightness-115 w-full h-1 rounded-sm"></span>
          <span className="bg-primary group-hover:brightness-115 w-full h-1 rounded-sm"></span>
        </button>
      </div>
      <div className="w-full flex items-center justify-center">
        <Link to="/" draggable="false" className="h-7 md:h-13">
          <img src="/assets/images/logo-mission-locale.png" alt="IMAGE" draggable="false" className="h-full" />
        </Link>
      </div>
      <div className="w-full flex items-center justify-end">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <button className="bg-primary hover:brightness-115 text-white px-4 py-2 rounded cursor-pointer" onClick={logout}>Se déconnecter</button>
            <Link to="/profile">
              <FiUser className="text-primary text-2xl" />
            </Link>
          </div>

        ) : (
          <Link to="/login" className="block">
            <button className="bg-primary hover:brightness-115 text-white px-4 py-2 rounded">
              Se connecter
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
