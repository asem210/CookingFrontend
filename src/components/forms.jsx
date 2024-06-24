import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputDefault, InputPassword, InputPhone } from "./inputs";
import userService from "../apis/user";
import { useNavigate } from "react-router-dom";
import { ImageUploader } from "./uploadImage";
import { useAuth } from "../hooks/authHook";
import { useUser } from "../hooks/userHook";

export const LoginForm = () => {
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const { showNewMessage } = useMessage();

  const onSubmit = async (formData) => {
    try {
      if (!formData.email) {
        showNewMessage("warning", "Complete el campo del email");
        return;
      }

      if (!formData.password) {
        showNewMessage("warning", "Complete el campo de la contraseña");
        return;
      }

      const result = await userService.login(formData.email, formData.password);

      if (result.success == false) {
        showNewMessage("error", result.error);
        return null;
      }

      login();
      showNewMessage("success", "Usuario Logeado");
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
  TextFormCreateIng,
  CheckBoxFormCreateIng,
} from "../components/inputs";
import ingredientService from "../apis/ingredient";

export const FormCrearIngrediente = () => {
  const items = [
    "cdta",
    "cda",
    "tza",
    "l",
    "ml",
    "g",
    "kg",
    "oz",
    "lb",
    "pt",
    "und",
  ];
  const [names, setnames] = useState([]);
  const { showNewMessage } = useMessage();
  const {
    addIngredientRecipeToList,
    listIngredientRecipe,
    ingredienteRecipe,
    listIngredient,
    clearIngredientRecipeHook,
    addAllListIngredientHook,
  } = useIngredient();
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (formData) => {
    if (!formData.Ingrediente) {
      showNewMessage("warning", "Por favor rellene el campo: Ingrediente");
      return;
    }

    if (!formData.Cantidad) {
      showNewMessage("warning", "Por favor rellene el campo: Cantidad");
      return;
    }

    if (!formData.Medición) {
      showNewMessage("warning", "Por favor rellene el campo: Medicion");
      return;
    }

    const getIdByName =
      listIngredient.find((item) => item.name === formData.Ingrediente) || null;

    try {
      let nuevoIngrediente = {};
      if (ingredienteRecipe?.id !== undefined) {
        nuevoIngrediente = {
          id: ingredienteRecipe.id,
          cantidad: formData.Cantidad,
          medicion: formData.Medición,
          especificacion: formData.Especificación || "",
          name: formData.Ingrediente,
          id_ingrediente: getIdByName.id,
          priority: formData.priority || false,
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
          especificacion: formData.Especificación || "",
          name: formData.Ingrediente,
          id_ingrediente: getIdByName.id,
          priority: formData.priority || false,
        };
      }

      addIngredientRecipeToList(nuevoIngrediente);
      clearIngredientRecipeHook();
      reset();
    } catch (error) {
      showNewMessage("error", "Error al agregar el ingrediente " + error);
    }
  };

  useEffect(() => {
    const callIngredient = async () => {
      try {
        if (listIngredient.length === 0) {
          const res = await ingredientService.getAll();
          if (res) {
            addAllListIngredientHook(res.data);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    callIngredient();
    setnames(
      listIngredient.map((item) => {
        return item.name;
      })
    );
  }, [listIngredient]);

  useEffect(() => {
    if (ingredienteRecipe) {
      setValue("Ingrediente", ingredienteRecipe.name);
      setValue("Cantidad", ingredienteRecipe.cantidad);
      setValue("Medición", ingredienteRecipe.medicion);
      setValue("Especificación", ingredienteRecipe.especificacion);
      setValue("priority", ingredienteRecipe.priority || "");
    }
  }, [ingredienteRecipe]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row font-belleza text-negro text-[16px] gap-3 mt-5"
    >
      <InputSelectFormCreateIng
        label={"Ingrediente"}
        placeholder={"Seleccione el Ingrediente"}
        action={register}
        name={"Ingrediente"}
        items={names || items}
        itemDefault={"Selecciona Ingrediente"}
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
        itemDefault={"Selecciona Medición"}
      />
      <InputFormCreateIng
        label={"Especificación"}
        placeholder={"Opcional"}
        action={register}
        name={"Especificación"}
      />
      <CheckBoxFormCreateIng
        label={"Escencial"}
        action={register}
        name={"priority"}
        width="w-1/3"
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
            clearIngredientRecipeHook();
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
          listStep?.length === 0 ? 0 : listStep[listStep?.length - 1].id + 1;

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
      showNewMessage("error", "Error al agregar Paso: " + error.message);
    }
  };

  useEffect(() => {
    if (step.name !== undefined) {
      setValue("name", step.name);
      setValue("description", step.description);
      setValue("number", step.number);
    }
  }, [step]);

  useEffect(() => {
    setValue("number", listStep?.length + 1 || 1);
  }, [listStep]);

  return (
    <form
      className="flex flex-row font-belleza text-negro text-[16px] gap-6 mt-5 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputFormCreateIng
        label={"N°"}
        placeholder={"-"}
        action={register}
        name={"number"}
        visible={true}
        width={"1/3"}
      />

      <InputFormCreateIng
        label={"Nombre"}
        placeholder={"Ingrese el nombre"}
        action={register}
        name={"name"}
      />
      <TextFormCreateIng
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
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const { addMainUser } = useUser();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { showNewMessage } = useMessage();

  const onSubmit = async (formData) => {
    try {
      if (!formData.email || !formData.username || !formData.password) {
        showNewMessage("error", "Faltan campos");
        return;
      }

      action(formData); // Llama a la función pasada como prop para actualizar el estado
      // await Cookies.set("userData", JSON.stringify(data)); // Convertir el objeto a una cadena JSON antes de guardarlo en la cookie

      // // Para obtener userData de la cookie
      // const retrievedUserData = Cookies.get("userData");
      // const userDataObject = JSON.parse(retrievedUserData); // Convertir la cadena JSON de vuelta a un objeto
      // console.log(userDataObject); // Acceder a la propiedad email del objeto recuperado
      addMainUser(
        "",
        "",
        formData.email,
        "",
        "",
        formData.password,
        formData.username
      );
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
  const [imageUrl, setImageUrl] = useState("");
  const { email, username, password, clearStateUser } = useUser();
  const { showNewMessage } = useMessage();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  const onSubmit = async (formData) => {
    try {
      if (!formData.name || !formData.surname || !phone || !imageUrl) {
        showNewMessage("error", "Faltan campos");
        return;
      }

      const result = await userService.register(
        formData.name,
        formData.surname,
        email,
        password,
        phone,
        imageUrl
      );

      if (result.success === false) {
        showNewMessage("error", result.message);
        return;
      }

      clearStateUser();
      showNewMessage("success", "Usuario registrado con éxito");
      navigate(name_proyect + "/login");
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
