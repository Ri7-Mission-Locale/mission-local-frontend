import {Link} from "react-router";
import AloneSection from "@partials/AloneSection.jsx";
import Button from "@components/Button.jsx";
import { FiUser } from "react-icons/fi";

export default function AdminDashboardPage() {
  return (
    <main>
      <AloneSection className="flex justify-center items-center h-screen p-8">
        <article className="flex flex-col gap-3 bg-white ">
          <h2 className="font-bold text-xl">Panel d'administration:</h2>

          <Link
            to={"/admin/users"}
            className="bg-blue-500 hover:bg-blue-700 w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center"
            color="text-white"
            type="button"
          >
            <FiUser />
            Utilisateurs
          </Link>
          <Button
            label={"Un bouton"}
            bgColor="bg-blue-500 hover:bg-blue-700"
            color="text-white"
            type="button"
          />
          <Button
            label={"Un bouton"}
            bgColor="bg-blue-500 hover:bg-blue-700"
            color="text-white"
            type="button"
          />
          <Button
            label={"Un bouton"}
            bgColor="bg-blue-500 hover:bg-blue-700"
            color="text-white"
            type="button"
          />
        </article>
      </AloneSection>
      <div className="absolute -z-10 backdrop-blur-xl top-0 bottom-0 left-0 right-0 bg-slate-700"></div>
    </main>
  );
}
