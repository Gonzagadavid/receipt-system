"use client";
import UserForm from "./components/userForm";

export default function UserRegister() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="text-4xl text-primary m-8">Cadastro de usuários</h1>
      <div>
        <UserForm />
      </div>
    </div>
  );
}
