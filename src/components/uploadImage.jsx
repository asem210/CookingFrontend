import React, { useState } from 'react';
import { storage } from '../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useRecipe } from '../hooks/recipeHook';
import { useUser } from '../hooks/userHook';
import { useMessage } from '../hooks/messageHook';
export const ImageUploader = ({ imageUrl, setImageUrl }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [urlState, setUrlState] = useState(false);
  const { showNewMessage } = useMessage();

  const auth = getAuth();

  const uploadImage = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
    if (!imageUpload) {
      showNewMessage('warning', 'No se seleccionó ninguna imagen');
      return;
    }

    try {
      // Inicia sesión de forma anónima si es necesario
      await signInAnonymously(auth);

      const imageRef = ref(storage, `platillo/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);

      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      setUrlState(true);
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
      alert('Error subiendo la imagen: ' + error.message);
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
          <div className="mx-auto w-fit">
            <h1 className="text-[16px] font-bold">Previsualización de la Imagen</h1>
          </div>
          <div className="mt-2">
            <img className="w-full max-w-[160px] mx-auto" src={imageUrl} alt="Imagen subida" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg  w-full">
      <h1 className="text-[16px] font-bold mb-4 ">Subir Imagen</h1>
      <div className="flex flex-row space-x-2  items-center justify-center align-middle">
        <input
          type="file"
          onChange={handleOnChange}
          className="font-belleza bg-gray-600 text-white rounded-md py-1  hover:bg-gray-500 max-md:text-[12px] max-md:w-3/4"
        />
        <button
          onClick={uploadImage}
          className="font-belleza bg-blue-600 text-white rounded-md  py-3  max-md:py-1  px-2 hover:bg-blue-500 text-xs my-auto h-fit"
        >
          Subir Imagen
        </button>
      </div>
      {mostrarImagen()}
    </div>
  );
};

export const ImageUploaderRecipe = () => {
  const { changeImgRecipe } = useRecipe();
  const [imageUpload, setImageUpload] = useState(null);
  const auth = getAuth();
  const { showNewMessage } = useMessage();
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);
  };

  const uploadImage = async () => {
    if (!imageUpload) {
      showNewMessage('warning', 'No se seleccionó ninguna imagen');
      return;
    }

    try {
      await signInAnonymously(auth);
      const imageRef = ref(storage, `platillo/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      changeImgRecipe(url);
    } catch (error) {
      showNewMessage('error', 'Error subiendo la imagen: ' + error.message);
    }
  };

  return (
    <div className="flex gap-5 items-center mb-2  ">
      <p className="font-belleza max-md:hidden">Previsualización de la receta:</p>
      <input
        type="file"
        onChange={handleOnChange}
        className="font-belleza bg-gray-600 text-white rounded-md py-1 px-3 hover:bg-gray-500 max-md:text-[12px] max-md:w-3/4"
      />
      <button
        className="font-belleza bg-blue-600 text-white rounded-md py-3 px-2 hover:bg-blue-500 text-xs h-full  max-md:text-[10px] max-md:w-1/4 max-md:py-2"
        onClick={() => {
          uploadImage();
        }}
      >
        Subir Imagen
      </button>
    </div>
  );
};

export const ImageUploaderUser = () => {
  const { changeImgEditHook } = useUser();

  const [imageUpload, setImageUpload] = useState(null);
  const auth = getAuth();
  const { showNewMessage } = useMessage();

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);
  };

  const uploadImage = async () => {
    if (!imageUpload) {
      showNewMessage('warning', 'No se seleccionó ninguna imagen');
      return;
    }

    try {
      await signInAnonymously(auth);
      const imageRef = ref(storage, `platillo/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      changeImgEditHook(url);
    } catch (error) {
      showNewMessage('error', 'Error subiendo la imagen: ' + error.message);
    }
  };

  return (
    <div className="flex gap-3 items-center mt-5 w-full">
      <input
        type="file"
        onChange={handleOnChange}
        className="font-belleza bg-gray-600 text-white rounded-md py-1 px-3 hover:bg-gray-500 w-3/4 max-lg:text-[12px]"
      />
      <button
        className="font-belleza bg-blue-600 text-white rounded-md py-1 px-2 hover:bg-blue-500 text-xs h-full w-1/4 max-lg:text-[10px]"
        onClick={() => {
          uploadImage();
        }}
      >
        Subir Imagen
      </button>
    </div>
  );
};
