import { Link } from "react-router";
import AloneSection from "@partials/AloneSection.jsx";
import { FiUser } from "react-icons/fi";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import DefaultLayout from "../../layouts/DefaultLayout";

export default function AdminDashboardPage() {
  return (
    <DefaultLayout>
      <main>
        <AloneSection className="flex justify-center items-center h-screen p-8">
          <article className="grid  grid-cols-1 md:grid-cols-2 gap-3 h-1/3 w-full bg-white p-5 rounded-sm">
            <h2 className="md:col-span-2 font-bold text-xl">Panel d'administration:</h2>

            <Link
              to={"/admin/users"}
              className="flex items-center gap-3 bg-primary hover:brightness-115  w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
              color="text-white"
              type="button"
            >
              <FiUser className="md:text-3xl" />
              Utilisateurs
            </Link>
            <Link
              to={"/news/add"}
              className="flex items-center gap-3 bg-primary hover:brightness-115  w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
              color="text-white"
              type="button"
            >
              <IoNewspaperSharp className="md:text-3xl" />
              Actualités
            </Link>
            <Link
              to={"/workshop/add"}
              className="flex items-center gap-3 bg-primary hover:brightness-115  w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
              color="text-white"
              type="button"
            >
              <FaClipboardList className="md:text-3xl" />
              Ateliers
            </Link>
            <Link
              to={"/calendar"}
              className="flex items-center gap-3 bg-primary hover:brightness-115  w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
              color="text-white"
              type="button"
            >
              <FaCalendarAlt className="md:text-3xl" />
              Calendrier
            </Link>

          </article>
        </AloneSection>
        <div className="absolute -z-10 backdrop-blur-xl top-0 bottom-0 left-0 right-0 bg-slate-700"></div>
      </main>
    </DefaultLayout>

  );
}
