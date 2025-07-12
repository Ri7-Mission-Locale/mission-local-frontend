import Input from "@components/inputs/Input.jsx";
import Button from "@components/Button.jsx";
import FileInput from "@components/inputs/FileInput.jsx";
import { useId, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import AloneSection from "@partials/AloneSection.jsx";
import DefaultLayout from "../../layouts/DefaultLayout";
import api from "../../api/fetcher";

export default function UserProfil() {
	const { data: profil } = useCurrentUser();


	const [isEditing, setIsEditing] = useState(false);
	const dateInputId = useId();
	const phoneInputId = useId();

	const [formData, setFormData] = useState({
		birth_date: profil.birth_date.split("T")[0],
		phone: profil.phone,
	});

	function handleChange(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	function handleClick() {
		if (isEditing) {
			api.patch("/profile", formData)
		}
		setIsEditing(!isEditing);
	}

	return (
		<DefaultLayout>
			<AloneSection className="h-screen bg-cover bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
				<article className="flex justify-center items-center m-auto rounded-xl border-gray-300 bg-gray-100 p-5">
					<div className="flex flex-col items-center gap-6">
						<h2 className=" text-2xl font-bold ">Mon Profil</h2>
						<img
							className="rounded-full h-22 w-22"
							src="https://www.utopix.com/fr/blog/wp-content/uploads/2024/04/Y2E4OTI3NzQtNmUyOC00YmU2LWE5ZjctODcxY2RlMzg2ZDIy_26dfc43e-31dd-463f-ad04-56f39a430691_profilhomme1-scaled.jpg"
							alt=""

						/>
						<div className="border-2 border-purple-800 rounded-full w-full p-1">
							<h3 className="text-xl font-bold bg-primary hover:brightness-115 rounded-full w-full text-center py-2 px-5 ">
								{profil.first_name} {profil.last_name}
							</h3>
						</div>

						<div className="bg-white w-full rounded-2xl flex flex-col gap-3 p-5">
							{isEditing ? (
								<Input
									type="date"
									id={dateInputId}
									name="birth_date"
									className=" m-auto w-full"
									onChange={handleChange}
									value={formData.birth_date}
								/>
							) : (
								<p
									className="bg-gray-100 rounded-full w-full m-auto ps-2"
									type="date"
								>
									{formData.birth_date}
								</p>
							)}

							{isEditing ? (
								<Input
									type="number"
									id={phoneInputId}
									name="phone"
									className="w-full  m-auto"
									value={formData.phone}
									onChange={handleChange}
								/>
							) : (
								<p className="bg-gray-100 rounded-full w-full m-auto ps-2">
									{profil.phone}
								</p>
							)}
						</div>

						<Button
							className="bg-primary hover:brightness-115 text-white"
							type={"button"}
							onClick={handleClick}
						>
							{isEditing ? "Valider" : "Modifier"}
						</Button>

						<div className="bg-white w-full rounded-2xl flex flex-col gap-3 p-5">
							<FileInput
								label={"Dossier inscription"}
								className={"w-full"}
							/>
						</div>
					</div>
				</article>
			</AloneSection>
		</DefaultLayout>


	);
}
