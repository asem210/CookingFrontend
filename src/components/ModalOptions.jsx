import React from "react";
import { useNavigate } from "react-router-dom";
import { PiUserCircle, PiChefHat } from "react-icons/pi";
import { BsBookmark } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useUser } from "../hooks/userHook";
import { useAuth } from "../hooks/authHook";
import { useMessage } from "../hooks/messageHook";
const ModalOptions = ({ isOpen, onClose }) => {
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const { name, surname, image } = useUser();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { showNewMessage } = useMessage();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-end z-50">
          <div className="inset-0 bg-[#2E2C2C] opacity-[0.90] absolute"></div>
          <div className="bg-white p-8 shadow-lg z-10 relative w-[22%] h-full ">
            <div className="w-full flex justify-between items-center mb-4">
              <p className="text-[24px] font-belleza">{name + " " + surname}</p>
              <figure className=" rounded-full  overflow-hidden flex items-center  border-2 border-naranja mr-1">
                <img
                  src={
                    image ||
                    "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                  }
                  className="w-[65px]  h-[65px]"
                />
              </figure>
            </div>
            <div className="w-full flex flex-col gap-3.5">
              <div
                className="w-full flex items-center cursor-pointer hover:text-gray-500"
                onClick={() => navigate(name_proyect + "/recipe/myRecipes")}
              >
                <PiChefHat size={"35px"} />
                <p className="font-belleza ml-1 text-[22px]">Mis Recetas</p>
              </div>
              <div
                className="w-full flex items-center cursor-pointer hover:text-gray-500"
                onClick={() => navigate(name_proyect + "/recipe/create")}
              >
                <HiOutlineDocumentPlus size={"35px"} />
                <p className="font-belleza ml-1 text-[22px]">Crear Receta</p>
              </div>
              <div className="w-full flex items-center cursor-pointer hover:text-gray-500">
                <BsBookmark size={"35px"} />
                <p className="font-belleza ml-1 text-[22px]">Mis Favoritos</p>
              </div>
              <div
                className="w-full flex items-center cursor-pointer hover:text-gray-500"
                onClick={() => navigate(name_proyect + "/user/info")}
              >
                <PiUserCircle size={"35px"} />
                <p className="font-belleza ml-1 text-[22px]">Mi Perfil</p>
              </div>
              <div
                className="w-full flex items-center cursor-pointer hover:text-gray-500"
                onClick={() => {
                  logOut();
                  navigate("/");
                  showNewMessage("success", "Sesión cerrada con éxito");
                }}
              >
                <BiLogOut size={"35px"} />
                <p className="font-belleza ml-1 text-[22px]">Cerrar Sesión</p>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-naranja text-white rounded hover:bg-red-500 mt-[10%] w-full"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOptions;
