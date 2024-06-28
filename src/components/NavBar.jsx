import React, { useState, useEffect } from 'react';
import ModalOptions from './ModalOptions';
import images from '../constants/images';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/userHook';
import { useAuth } from '../hooks/authHook';
import { getObjectById } from '../utils/finderUtils';
import { useMessage } from '../hooks/messageHook';
import { callUserData } from '../helpers/stateHelper';

const NavBar = () => {
  // Hooks
  const { status } = useAuth();
  const { name, surname, addMainUser, image } = useUser();
  const { showNewMessage } = useMessage();
  //usestate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // auxiliary variables
  const logo = getObjectById(images, 3);
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const navigate = useNavigate();

  useEffect(() => {
    callUserData(showNewMessage, addMainUser);
  }, []);

  return (
    <nav className="w-screen min-h-16 h-[10%] flex justify-between items-center mt-2  ">
      <ModalOptions isOpen={isModalOpen} onClose={closeModal} />
      <figure className="w-1/5 flex items-center">
        <img
          src={logo.link}
          className="h-4/5 rounded-xl ml-[25%] cursor-pointer hover:shadow-sm"
          onClick={() => {
            navigate(name_proyect + '/home');
          }}
        />
      </figure>
      <div className="mr-[5%] flex items-center">
        {status ? (
          <div
            className="flex items-center justify-evenly cursor-pointer px-4 rounded-xl hover:shadow-sm hover:text-slate-600"
            onClick={openModal}
          >
            <p className="mr-2 font-belleza text-[18px]  max-sm:hidden ">
              {name + ' ' + surname}
            </p>

            <figure className="rounded-full overflow-hidden flex items-center border-2 border-naranja w-[50px]">
              <img
                src={
                  image ||
                  'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'
                }
                className="w-full aspect-square object-cover"
              />
            </figure>
          </div>
        ) : (
          <button
            className="bg-naranja py-3 px-8 rounded-2xl text-white mt-4 hover:bg-red-500 mr-10 max-md:mr-2 max-md:text-[10px] max-md:py-2 max-md:mt-0"
            onClick={() => {
              navigate(name_proyect + '/login');
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
