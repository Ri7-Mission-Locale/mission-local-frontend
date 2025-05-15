import AloneSection from "../../components/AloneSection.jsx";
import SpanUser from "../../components/users/SpanUser.jsx";
import TitleWithReturn from "../../components/TitleWithReturn.jsx";
import SearchBar from "../../components/inputs/Searchbar.jsx";
import Button from "../../components/Button.jsx";

const users = [
    {
        id: 1,
        firstName: "jhon",
        lastName: "doe",
        role: "default"
    },
    {
        id: 2,
        firstName: "kev",
        lastName: "ste",
        role: "admin"
    },
    {
        id: 3,
        firstName: "kev",
        lastName: "ste",
        role: "admin"
    },
]

export default function UserManagementPage() {
    return (
        <>
            <main className="flex items-center justify-center p-5 h-screen">
                <AloneSection className="min-w-xs">
                    <TitleWithReturn link={"/admin"}>Utilisateurs</TitleWithReturn>
                    <div className="flex gap-2 items-center ">
                        <Button label={"Ajouter"} bgColor="bg-blue-400 w-fit text-white"></Button>
                        <SearchBar name={"test"} label={"test"} className="w-full"></SearchBar>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <select name="role" id="roles">
                            <option value="all">Tout</option>
                            <option value="ADMIN">Admin</option>
                            <option value="ADVISOR">Conseillé</option>
                            <option value="USER">Utilisateur</option>
                        </select>
                        <select name="order" id="order">
                            <option value="asc">Ascendant</option>
                            <option value="desc">Descendant</option>
                        </select>
                    </div>
                    <article className="flex flex-col gap-1 p-3 ">
                        {users.map((user, i) => <SpanUser key={i} user={user}></SpanUser>)}
                    </article>
                </AloneSection>
            </main>
        </>

    );
}