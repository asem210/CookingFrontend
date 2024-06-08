import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputDefault, InputPassword } from "./inputs";
import userService from "../apis/user";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const onSubmit = async (formData) => {
    try {
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
        />
      </div>

      <div className="pt-5">
        <InputPassword
          label={"Contraseña"}
          placeholder={"Ingrese su contraseña"}
          action={register}
          name="password"
        />
      </div>

      <a href="" className="font-belleza text-blue-600 pt-5 pb-5 ">
        Olvidaste la contraseña? Haz click aquí
      </a>

      <p>{data}</p>
      <input
        type="submit"
        className="w-[357px] h-[49px] bg-naranja text-white rounded-[33px] m-auto text-[16px] font-belleza"
      />
    </form>
  );
};

export default LoginForm;
