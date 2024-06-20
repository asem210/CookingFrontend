import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useUser } from '../hooks/userHook';
import { InputFormStatic } from '../components/inputs';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const { name, username, surname, phone, image, email } = useUser();
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className="w-screen h-[80%]  min-h-[78vh] flex flex-col items-center ">
        <section className="flex gap-10 mt-5  w-4/5">
          <article className="w-1/3">
            <figure className="overflow-hidden  w-1/2 h-44 rounded-[100%] flex items-center ">
              <img src={image} className="w-full h-full" />
            </figure>
            <p>{username} </p>
          </article>

          <div className="w-2/3  flex flex-col ">
            <div className="grid grid-cols-2 gap-y-5">
              <InputFormStatic label={'Nombre'} width="w-4/5" value={name} />
              <InputFormStatic label={'Apellido'} width="w-4/5" value={surname} />
              <InputFormStatic label={'Email'} width="w-4/5" value={email} />
              <InputFormStatic label={'Celular'} width="w-4/5" value={phone} />
            </div>
            <button
              className="bg-naranja py-3 px-8 rounded-2xl text-white mt-10 hover:bg-red-500 w-1/2 m-auto "
              onClick={() => {
                navigate(name_proyect + '/user/edit');
              }}
            >
              Editar Información
            </button>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserInfo;
