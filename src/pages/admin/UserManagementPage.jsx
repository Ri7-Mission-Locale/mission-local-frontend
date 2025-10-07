import AloneSection from "@partials/AloneSection.jsx";
import Button from "@components/Button.jsx";
import TitleWithReturn from "@components/TitleWithReturn.jsx";
import SearchBar from "@components/inputs/Searchbar.jsx";
import SpanUser from "@components/users/SpanUser.jsx";
import { useQuery } from "@tanstack/react-query";
import api from "@api/fetcher.js";
import useUserFilters from "@services/userFilter.js";
import Loader from "../../components/miscs/Loader"
import DefaultLayout from "../../layouts/DefaultLayout";


export default function UserManagementPage() {
    const [filters, setFilter] = useUserFilters();
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users", filters],
        queryFn: async () => {
            const params = { ...filters };
            if (params.role === "all") delete params.role;
            if (!params.name) delete params.name;
            return api.get("/users", { params }).then((res) => res.data);
        },
        keepPreviousData: true,
    });

    const handleSearch = (e) => setFilter("name", e.target.value);
    const handleRoleSelect = (e) => setFilter("role", e.target.value);
    const handleOrderSelect = (e) => setFilter("order", e.target.value);

    return (
        <DefaultLayout>
            <main className="flex items-center justify-center p-5 h-screen">
                <AloneSection className="min-w-xs p-5">
                    <TitleWithReturn link={"/admin"}>Utilisateurs</TitleWithReturn>
                    <div className="flex gap-2 items-center ">
                        <Button className="bg-primary hover:brightness-115 w-fit text-white">Ajouter</Button>
                        <SearchBar
                            name="search"
                            label="Recherche"
                            className="w-full"
                            onChange={handleSearch}
                            value={filters.name}
                        />
                    </div>
                    <div className="flex gap-2 items-center ">
                        <select name="role" id="roles" onChange={handleRoleSelect} value={filters.role}>
                            <option value="all">Tout</option>
                            <option value="ADMIN">Admin</option>
                            <option value="ADVISOR">Conseillé</option>
                            <option value="USER">Utilisateur</option>
                        </select>
                        <select name="order" id="order" onChange={handleOrderSelect} value={filters.order}>
                            <option value="asc">Ascendant</option>
                            <option value="desc">Descendant</option>
                        </select>
                    </div>
                    {isLoading ? (
                        <Loader size={10} weight={5} />
                    ) : (
                        <article className="flex flex-col gap-1 p-3 ">
                            {users.map((user, i) => <SpanUser key={i} user={user} />)}
                        </article>
                    )}
                    <div className="flex items-center gap-2 mt-4 mx-auto">
                        <button
                            onClick={() => setFilter("page", Math.max(1, filters.page - 1))}
                            disabled={filters.page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Précédent
                        </button>
                        <span>Page {filters.page}</span>
                        <button
                            onClick={() => setFilter("page", filters.page + 1)}
                            disabled={users.length < filters.limit}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Suivant
                        </button>
                    </div>
                </AloneSection>
            </main>
        </DefaultLayout>

    );
}