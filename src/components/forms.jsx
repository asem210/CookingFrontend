import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputDefault, InputPassword, InputPhone } from "./inputs";
import userService from "../apis/user";
import { useNavigate } from "react-router-dom";
import { ImageUploader } from "./uploadImage";
import Cookies from "js-cookie";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();

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
          name="email"
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

      <button
        type="submit"
        className="w-full h-[49px] bg-naranja text-white rounded-[33px] m-auto text-[16px] font-belleza cursor-pointer"
      >
        Iniciar Sesión{" "}
      </button>
    </form>
  );
};

export const RegisterForm = ({ action, data }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    try {
      if (!formData.email || !formData.username || !formData.password) {
        alert("Faltan campos");
        return;
      }

      action(formData); // Llama a la función pasada como prop para actualizar el estado
      Cookies.set("userData", JSON.stringify(data)); // Convertir el objeto a una cadena JSON antes de guardarlo en la cookie

      // Para obtener userData de la cookie
      const retrievedUserData = Cookies.get("userData");
      const userDataObject = JSON.parse(retrievedUserData); // Convertir la cadena JSON de vuelta a un objeto
      console.log(userDataObject); // Acceder a la propiedad email del objeto recuperado
      navigate("register");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      className="flex flex-col font-belleza text-negro text-[16px] w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pt-5 space-y-4">
        <InputDefault
          label={"Correo electrónico"}
          placeholder={"Ingrese su correo electrónico"}
          action={register}
          name="email"
        />
        <InputDefault
          label={"Nombre de usuario"}
          placeholder={"Ingrese su nombre de usuario"}
          action={register}
          name="username"
        />
        <InputPassword
          label={"Contraseña"}
          placeholder={"Ingrese su contraseña"}
          action={register}
          name="password"
        />
        <button className="w-full h-[49px] bg-naranja text-white rounded-[33px] m-auto text-[16px] font-belleza cursor-pointer">
          Continuar
        </button>
      </div>
    </form>
  );
};

export const MoreInfo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const retrievedUserData = Cookies.get("userData");
    if (retrievedUserData) {
      setUserData(JSON.parse(retrievedUserData));
    }
    console.log(JSON.parse(retrievedUserData));
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  const onSubmit = async (formData) => {
    try {
      if (!formData.name || !formData.surname || !phone) {
        alert("Faltan campos");
        return;
      }

      const result = await userService.register(
        formData.name,
        formData.surname,
        userData.email,
        userData.password,
        phone,
        imageUrl
      );

      console.log(result);

      if (result.success === false) {
        alert(result.message);
        return;
      }

      alert("Usuario registrado");
      navigate("/register"); // Redirige al usuario después del registro
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      className="flex flex-col font-belleza text-negro text-[16px] w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pt-3 space-y-2 w-full">
        <div className="flex flex-row space-x-2">
          <InputDefault
            label={"Nombres completos"}
            placeholder={"Ingrese sus nombres"}
            action={register}
            name="name"
          />
          <InputDefault
            label={"Apellidos completos"}
            placeholder={"Ingrese sus apellidos"}
            action={register}
            name="surname"
          />
        </div>
        <div className="w-full">
          <InputPhone phone={phone} setPhone={setPhone} action={register} />
        </div>
        <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <button
          type="submit"
          className="w-full h-[36px] bg-naranja text-white rounded-[33px] m-auto text-[16px] font-belleza cursor-pointer"
        >
          Registrar usuario
        </button>
      </div>
    </form>
  );
};
