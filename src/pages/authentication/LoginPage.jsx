import Button from "../../components/Button";
import Input from "../../components/Input";
import SignUpFormTitle from "../../components/SignUpFormTitle";

export default function LoginPage() {
  return (
    <>
      <form className="gap-4 flex flex-col w-4/5 mt-10 mx-auto border border-gray-300 p-8 rounded-lg">
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
        <Button label="S'inscrire" bgColor="bg-orange-100" color="text-black" />
      </form>
    </>
  );
}
