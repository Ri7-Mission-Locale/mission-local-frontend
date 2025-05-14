import AloneSection from "../../components/AloneSection.jsx";
import Button from "../../components/Button.jsx";

export default function AdminDashboardPage() {
    return (
        <main className="flex justify-center items-center h-screen p-8">
            <AloneSection>
                <h2 className="font-bold text-xl">Panel d'administration:</h2>
                <article className="flex flex-col gap-3 ">
                    <Button label={"Utilisateurs"} bgColor="bg-blue-500 hover:bg-blue-700" color="text-white" type="button"/>
                    <Button label={"Un bouton"} bgColor="bg-blue-500 hover:bg-blue-700" color="text-white" type="button"/>
                    <Button label={"Un bouton"} bgColor="bg-blue-500 hover:bg-blue-700" color="text-white" type="button"/>
                    <Button label={"Un bouton"} bgColor="bg-blue-500 hover:bg-blue-700" color="text-white" type="button"/>
                </article>
            </AloneSection>
            <div className="absolute -z-10 backdrop-blur-xl top-0 bottom-0 left-0 right-0 bg-slate-700"></div>
        </main>
    )
}