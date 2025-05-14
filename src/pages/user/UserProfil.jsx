import Button from "../../components/Button";
import FileInput from "../../components/FileInput";
import { userProfilData } from "../../data/userProfilMockData";

export default function UserProfil() {
  const profil = userProfilData;

  return (
    <article className="border w-[90%] h-160 m-auto rounded-2xl border-gray-300 bg-gray-100 pt-4">
      <div className="flex flex-col items-center gap-6 ">
        <h2 className=" text-1xl font-bold ">Mon Profil</h2>
        <img
          className="rounded-full h-22 w-22"
          src="https://www.utopix.com/fr/blog/wp-content/uploads/2024/04/Y2E4OTI3NzQtNmUyOC00YmU2LWE5ZjctODcxY2RlMzg2ZDIy_26dfc43e-31dd-463f-ad04-56f39a430691_profilhomme1-scaled.jpg"
          alt=""
        />
        <div className="border-2 border-purple-800 rounded-full w-[60%] p-1">
          <h3 className="text-xl font-bold bg-cyan-400 rounded-full text-center p-2">
            {profil.first_name} {profil.last_name}
          </h3>
        </div>

        <div className="bg-white w-[80%] rounded-2xl flex flex-col gap-3 pt-4 pb-4">
          <p className="bg-gray-100 rounded-full w-[85%] m-auto ps-2">
            {new Date().getFullYear(0) - profil.birth_date.split("-")[0]} ans
          </p>
          <p className="bg-gray-100 rounded-full w-[85%] m-auto ps-2">
            {profil.phone}
          </p>
          <p className="bg-gray-100 rounded-full w-[85%] m-auto ps-2">
            {profil.informations.home_number} {profil.informations.home_address}{" "}
            {profil.informations.home_postal_code}{" "}
            {profil.informations.home_municipality}
          </p>
        </div>

        <Button
          bgColor="bg-cyan-500"
          color="text-white"
          label={"Modifier"}
          type={"button"}
        />

        <div className="bg-white w-[80%] rounded-2xl flex flex-col gap-3 pt-4 pb-4">
            <FileInput  label={'Dossier inscription'}/>
        </div>
      </div>
    </article>
  );
}
