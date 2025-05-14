import { useState } from "react";
import Button from "../../components/Button";
import FileInput from "../../components/FileInput";
import Input from "../../components/Input";
import { userProfilData } from "../../data/userProfilMockData";

export default function UserProfil() {
  const profil = userProfilData;
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    birth_date: profil.birth_date.split("T")[0],
    phone: profil.phone,
  });


function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

  function handleClick() {
    if (isEditing) {
      console.log("Data : ", formData);
    }
    setIsEditing(!isEditing);
  }

  return (
    <article className="border w-[90%] h-160 m-auto rounded-2xl border-gray-300 bg-gray-100 pt-4 md:w-[40%]">
      <div className="flex flex-col items-center gap-6 ">
        <h2 className=" text-1xl font-bold ">Mon Profil</h2>
        <img
          className="rounded-full h-22 w-22"
          src="https://www.utopix.com/fr/blog/wp-content/uploads/2024/04/Y2E4OTI3NzQtNmUyOC00YmU2LWE5ZjctODcxY2RlMzg2ZDIy_26dfc43e-31dd-463f-ad04-56f39a430691_profilhomme1-scaled.jpg"
          alt=""
        />
        <div className="border-2 border-purple-800 rounded-full w-[60%] p-1">
          <h3 className="text-xl font-bold bg-cyan-500 rounded-full text-center p-2">
            {profil.first_name} {profil.last_name}
          </h3>
        </div>

        <div className="bg-white w-[80%] rounded-2xl flex flex-col gap-3 pt-4 pb-4">
          {isEditing ? (
            <Input
              type="date"
              id="birth_date"
              name="birth_date"
              className="w-[80%] m-auto"
              onChange = {handleChange}
              value = {formData.birth_date}
            />
          ) : (
            <p
              className="bg-gray-100 rounded-full w-[85%] m-auto ps-2"
              type="date"
            >
              {formData.birth_date}
            </p>
          )}

          {isEditing ? (
            <Input
              type="number"
              id="phone"
              name="phone"
              className="w-[80%] m-auto"
              value={formData.phone}
              onChange = {handleChange}
            />
          ) : (
            <p className="bg-gray-100 rounded-full w-[85%] m-auto ps-2">
              {profil.phone}
            </p>
          )}
        </div>

        <Button
          bgColor="bg-cyan-500"
          color="text-white"
          label={isEditing ? "Valider" : "Modifier"}
          type={"button"}
          onClick={handleClick}
        />

        <div className="bg-white w-[80%] rounded-2xl flex flex-col gap-3 pt-4 pb-4">
          <FileInput label={"Dossier inscription"} />
        </div>
      </div>
    </article>
  );
}
