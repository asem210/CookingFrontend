import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputDefault, InputPassword, InputPhone } from "./inputs";
import userService from "../apis/user";
import { useNavigate } from "react-router-dom";
import { ImageUploader } from "./uploadImage";
import Cookies from "js-cookie";

import { useAuth } from "../hooks/authHook";

export const LoginForm = () => {
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const navigate = useNavigate();

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

      login();
      alert("Usuario Logeado");
      navigate(name_proyect + "/home");
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
        className="w-[357px] h-[49px] bg-naranja text-white rounded-[33px] m-auto text-[16px] font-belleza cursor-pointer hover:bg-red-500"
      />
    </form>
  );
};

export default LoginForm;

import { useMessage } from "../hooks/messageHook";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useIngredient } from "../hooks/ingredientHook";
import {
  InputFormCreateIng,
  InputSelectFormCreateIng,
} from "../components/inputs";

export const FormCrearIngrediente = () => {
  // cambiar por las opciones reales
  const items = ["cdta", "cda", "tza", "l", "ml", "g", "kg", "oz", "lb", "pt"];
  const { showNewMessage } = useMessage();
  const {
    addIngredientRecipeToList,
    listIngredientRecipe,
    ingredienteRecipe,
    clearIngredientRecipe,
  } = useIngredient();
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const IngredienteInput = watch("Ingrediente");
  const CantidadInput = watch("Cantidad");
  const MediciónInput = watch("Medición");

  const onSubmit = async (formData) => {
    if (!IngredienteInput) {
      showNewMessage("error", "Por favor rellene el campo: Ingrediente'");

      return;
    }
    if (!CantidadInput) {
      showNewMessage("error", "Por favor rellene el campo: Cantidad");

      return;
    }

    if (!MediciónInput) {
      showNewMessage("error", "Por favor rellene el campo: Medicion");
      return;
    }

    try {
      let nuevoIngrediente = {};
      if (ingredienteRecipe?.id !== undefined) {
        nuevoIngrediente = {
          id: ingredienteRecipe.id,
          cantidad: formData.Cantidad,
          medicion: formData.Medición,
          especificacion: formData.Especificación,
          name: formData.Ingrediente,
          // cambiar por la variable correspondiente
          id_ingrediente: 1,
        };
      } else {
        const id_aux =
          listIngredientRecipe.length === 0
            ? 0
            : listIngredientRecipe[listIngredientRecipe.length - 1].id + 1;

        nuevoIngrediente = {
          id: id_aux,
          cantidad: formData.Cantidad,
          medicion: formData.Medición,
          especificacion: formData.Especificación,
          name: formData.Ingrediente,
          // cambiar por la variable correspondiente
          id_ingrediente: 1,
        };
      }

      addIngredientRecipeToList(nuevoIngrediente);
      clearIngredientRecipe();
      reset();
    } catch (error) {
      console.log(error.message);
      showNewMessage("error", "Error al agregar el ingrediente");
    }
  };

  useEffect(() => {
    if (ingredienteRecipe) {
      setValue("Ingrediente", ingredienteRecipe.name);
      setValue("Cantidad", ingredienteRecipe.cantidad);
      setValue("Medición", ingredienteRecipe.medicion);
      setValue("Especificación", ingredienteRecipe.especificacion);
    }
  }, [ingredienteRecipe]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row font-belleza text-negro text-[16px] gap-6 mt-5"
    >
      <InputFormCreateIng
        label={"Ingrediente"}
        placeholder={"Seleccione el Ingrediente"}
        action={register}
        name={"Ingrediente"}
      />
      <InputFormCreateIng
        label={"Cantidad"}
        placeholder={"Ingrese la cantidad"}
        action={register}
        name={"Cantidad"}
      />

      <InputSelectFormCreateIng
        label={"Medición"}
        placeholder={"Seleccione la Medición"}
        action={register}
        name={"Medición"}
        items={items}
      />
      <InputFormCreateIng
        label={"Especificación (opcional)"}
        placeholder={"Ejemplo: en cuadritos"}
        action={register}
        name={"Especificación"}
      />
      <div className="flex gap-3 mt-[5%]">
        <button type="submit" className="text-lime-500 hover:text-lime-600">
          <FaCheck size={"30px"} />
        </button>
        <button
          type="button"
          className="text-red-500 hover:text-red-600"
          onClick={() => {
            reset();
            clearIngredientRecipe();
          }}
        >
          <ImCross size={"28px"} />
        </button>
      </div>
    </form>
  );
};

import { useStep } from "../hooks/stepHook";

export const FormCrearPaso = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { listStep, step, clearStepHook, addStepToList } = useStep();
  const { showNewMessage } = useMessage();

  const DescriptionInput = watch("description");
  const nameInput = watch("name");

  const onSubmit = async (formData) => {
    if (!nameInput) {
      showNewMessage("error", "Por favor rellene el campo: Nombre");
      return;
    }

    if (!DescriptionInput) {
      showNewMessage("error", "Por favor rellene el campo: Descripción");

      return;
    }

    try {
      let nuevoStep = {};
      if (step?.id !== undefined) {
        nuevoStep = {
          id: step.id,
          description: formData.description,
          name: formData.name,
        };
      } else {
        const id_aux =
          listStep.length === 0 ? 0 : listStep[listStep.length - 1].id + 1;

        nuevoStep = {
          id: id_aux,
          description: formData.description,
          name: formData.name,
        };
      }

      addStepToList(nuevoStep);
      clearStepHook();
      reset();
    } catch (error) {
      console.log(error.message);
      showNewMessage("error", "Error al agregar Paso");
    }
  };

  useEffect(() => {
    if (step) {
      setValue("name", step.name);
      setValue("description", step.description);
      setValue("number", step.number);
    }
  }, [step]);

  return (
    <form
      className="flex flex-row font-belleza text-negro text-[16px] gap-6 mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputFormCreateIng
        label={"N°"}
        placeholder={"-"}
        action={register}
        name={"number"}
      />
      <InputFormCreateIng
        label={"Nombre"}
        placeholder={"Ingrese el nombre"}
        action={register}
        name={"name"}
      />
      <InputFormCreateIng
        label={"Descripción"}
        placeholder={"Ingrese la descripción"}
        action={register}
        name={"description"}
      />
      <div className="flex gap-3 mt-[5%]">
        <button type="submit" className="text-lime-500 hover:text-lime-600">
          <FaCheck size={"30px"} />
        </button>
        <button
          type="button"
          className="text-red-500 hover:text-red-600"
          onClick={() => {
            reset();
            clearStepHook();
          }}
        >
          <ImCross size={"28px"} />
        </button>
      </div>
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
      navigate(name_proyect + "/register");
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
