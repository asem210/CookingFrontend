import React, { useState, useEffect } from "react";
import ModalOptions from "./ModalOptions";
import images from "../constants/images";
import { useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import { useUser } from "../hooks/userHook";
import userService from "../apis/user";
import { useMessage } from "../hooks/messageHook";
import { useAuth } from "../hooks/authHook";
const NavBar = () => {
  const { login, status, logOut, token, change } = useAuth();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, surname, addMainUser, image } = useUser();
  const [isToken, setisToken] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  // const { showNewMessage } = useMessage();
  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };

  const logo = getObjectById(3);

  useEffect(() => {
    const callUser = async () => {
      try {
        const res = await userService.getThisUser();
        if (res && res?.success === true) {
          const user = res.data;
          addMainUser(
            user.name,
            user.surname,
            user.email,
            user.phone,
            user.image,
            "",
            ""
          );
        }
        // else if (res?.message === 'Token no es valido') {
        //   showNewMessage('warning', 'sesion caducada');

        //   navigate(name_proyect + '/login');
        // }
      } catch (error) {
        console.log(error);
      }
    };

    const IsLogin = () => {
      const storedToken = localStorage.getItem("token");
      console.log(storedToken);
      if (token != storedToken && storedToken != null) {
        if (storedToken) {
          setisToken(true);
        }
        login();
      }
    };

    IsLogin();
    callUser();
  }, []);

  return (
    <nav className=" w-screen min-h-16  h-[10%] flex justify-between">
      <ModalOptions isOpen={isModalOpen} onClose={closeModal} />
      <figure className=" w-1/5 items-center flex">
        <img
          src={logo.link}
          className="h-4/5  rounded-xl   ml-[25%] cursor-pointer hover:shadow-sm"
          onClick={() => {
            navigate(name_proyect + "/home");
          }}
        />
      </figure>
      <div className="mr-[5%]   flex items-center ">
        {isToken ? (
          <div
            className="flex  items-center justify-evenly cursor-pointer  px-4 rounded-xl hover:shadow-sm  hover:text-slate-600 "
            onClick={openModal}
          >
            <p className="mr-2 font-belleza text-[18px] ">
              {name + " " + surname}{" "}
            </p>
            <figure className=" rounded-full  overflow-hidden flex items-center  border-2 border-naranja">
              <img
                src={
                  image ||
                  "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
                }
                className="w-[55px]  h-[55px]"
              />
            </figure>
          </div>
        ) : (
          <button
            className="bg-naranja py-3 px-8 rounded-2xl text-white mt-4 hover:bg-red-500 mr-10"
            onClick={() => {
              navigate(name_proyect + "/login");
            }}
          >
            Iniciar Sesión / Registrarse
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
