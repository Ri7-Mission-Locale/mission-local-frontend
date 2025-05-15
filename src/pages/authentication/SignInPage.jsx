import Button from "../../components/Button";
import Input from "../../components/Input";
import SignUpFormTitle from "../../components/SignUpFormTitle";
import { NavLink } from "react-router";

export default function SignInPage() {
  return (
      <main className={"h-screen"}>
        <form className="gap-4 flex flex-col w-4/5 m-auto border border-gray-300 p-8 rounded-lg">
          <SignUpFormTitle label={"CONNEXION"} />

          <Input
              htmlFor={"email"}
              label={"Email"}
              name={"email"}
              placeholder={"Entrez votre mail"}
          />
          <Input
              htmlFor={"password"}
              name={'password'}
              label={"Mot de passe"}
              placeholder={"Entrez votre mot de passe"}
          />
          <Button label="Connexion" bgColor="bg-cyan-500" color="text-white" />
          <NavLink  to={"/signup"} label="S'inscrire" className={`w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-orange-100 text-black text-center`}>Pas encore inscrit ?</NavLink>
        </form>
      </main>
  );
}
