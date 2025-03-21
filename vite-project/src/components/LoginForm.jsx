import Button from "./Button";
import Input from "./Input";
import SignUpFormTitle from "./SignUpFormTitle";

export default function LoginForm() {
  return (
    <>
      <form className="gap-4 flex flex-col w-4/5 mt-10 mx-auto  border border-gray-300 p-8 rounded-lg">
        <SignUpFormTitle label={"CONNEXION"} />

        <Input
          htmlFor={"email"}
          label={"Email"}
          placeholder={"Entrez votre mail"}
        />
        <Input
          htmlFor={"password"}
          label={"Mot de passe"}
          placeholder={"Entrez votre mot de passe"}
        />
        <Button label="Connexion" bgColor="bg-cyan-500" color="text-white" />
        <Button label="S'inscrire" bgColor="bg-amber-100" color="text-black" />
      </form>
    </>
  );
}
