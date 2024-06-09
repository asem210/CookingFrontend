import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputDefault, InputPassword } from "./inputs";
import userService from "../apis/user";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const onSubmit = async (formData) => {
    try {
      if (!formData.email) {
        alert("Complete el campo del usuario");
        return;
      }

      if (!formData.password) {
        alert("Complete el campo de la contraseña");
        return;
      }

      const result = await userService.login(formData.email, formData.password);
      if (result.success == false) {
        alert(result.message);
        return null;
      }
      console.log(result);
      alert("Usuario Logeado");
    } catch (error) {
      console.log(error.message);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col font-belleza text-negro text-[16px]"
    >
      <div className="pt-5">
        <InputDefault
          label={"Usuario o correo electrónico"}
          placeholder={"Ingrese su usuario"}
          action={register}
          name={"email"}
          // campo={user}
          // cambio={setUser}
        />
      </div>

      <div className="pt-5">
        <InputPassword
          label={"Contraseña"}
          placeholder={"Ingrese su contraseña"}
          action={register}
          name="password"
          // campo={password}
          // cambio={setPassword}
        />
      </div>

      <a href="" className="font-belleza text-blue-600 pt-5 pb-5 ">
        Olvidaste la contraseña? Haz click aquí
      </a>

      <input
        type="submit"
        className="w-full h-[49px] bg-naranja text-white rounded-[33px] m-auto text-[16px] font-belleza cursor-pointer"
      />
    </form>
  );
};

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const handleLoginFailure = (response) => {
    console.error("Google login failed:", response);
  };

  return (
    <form
      className="flex flex-col font-belleza text-negro text-[16px] w-full"
      onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
    >
      <div className="pt-5 space-y-4">
        <InputDefault
          label={"Correo electrónico"}
          placeholder={"Ingrese su correo electrónico"}
          action={register}
          name={"email"}
        />
        <InputDefault
          label={"Nombre de usuario"}
          placeholder={"Ingrese su nombre de usuario"}
          action={register}
          name={"username"}
        />

        <InputPassword
          label={"Contraseña"}
          placeholder={"Ingrese su contraseña"}
          action={register}
          name={"password"}
        />

        <input
          type="submit"
          className="w-full h-[49px] bg-naranja text-white rounded-[33px] m-auto text-[16px] font-belleza cursor-pointer"
        />
      </div>
    </form>
  );
};
