import React, { useState } from "react";
import { storage } from "../firebase/firebase"; // Asegúrate de que la ruta sea correcta
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { getAuth, signInAnonymously } from "firebase/auth";

export const ImageUploader = ({ imageUrl, setImageUrl }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [urlState, setUrlState] = useState(false);

  const auth = getAuth();

  const uploadImage = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
    if (!imageUpload) {
      alert("No se seleccionó ningún archivo");
      return;
    }

    try {
      // Inicia sesión de forma anónima si es necesario
      await signInAnonymously(auth);

      const imageRef = ref(storage, `platillo/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);
      console.log("Imagen subida correctamente");

      const url = await getDownloadURL(imageRef);
      console.log("URL de la imagen:", url);
      setImageUrl(url);
      setUrlState(true);
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      alert("Error subiendo la imagen: " + error.message);
    }
  };

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);
  };

  const mostrarImagen = () => {
    if (urlState) {
      return (
        <div className=" mt-4">
          <div className="">
            <h1 className="text-[16px] font-bold">
              Previsualización de la Imagen
            </h1>
          </div>
          <div className="mt-2">
            <img
              className="w-full max-w-[180px] mx-auto"
              src={imageUrl}
              alt="Imagen subida"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg  w-full">
      <h1 className="text-[16px] font-bold mb-4">Subir Imagen</h1>
      <div className="flex flex-row space-x-2">
        <input
          type="file"
          onChange={handleOnChange}
          className="border border-gray-300 rounded mb-2 "
        />
        <button
          onClick={uploadImage}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 h-fit"
        >
          Subir Imagen
        </button>
      </div>
      {mostrarImagen()}
    </div>
  );
};
