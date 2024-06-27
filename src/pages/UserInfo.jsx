import React from 'react';
import { useNavigate } from 'react-router-dom';
// import components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { InputFormStatic } from '../components/inputs';
//import hook
import { useUser } from '../hooks/userHook';

const UserInfo = () => {
  const { name, username, surname, phone, image, email } = useUser();
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  return (
    <div className="container-page">
      <NavBar></NavBar>
      <div className="w-screen h-[80%]  min-h-[78vh] flex flex-col items-center ">
        <section className="flex gap-10 mt-5  w-4/5 max-sm:w-full px-5  max-lg:items-center max-sm:flex-col max-sm:gap-1">
          <article className="w-1/3   flex flex-col items-center gap-2  ">
            <p className="font-belleza ">Foto de Perfil:</p>
            <figure className="overflow-hidden  w-1/2  min-w-48 h-44 rounded-[100%] flex items-center max-sm:min-w-48  ">
              <img src={image} className="w-full h-full" />
            </figure>
            <p>{'Username'} </p>
          </article>

          <div className="w-2/3  flex flex-col  items-center max-sm:w-full">
            <div className=" p-5 w-full grid grid-cols-2 max-lg:grid-cols-1 gap-y-3  gap-5">
              <InputFormStatic label={'Nombre'} width="w-full " value={name} />
              <InputFormStatic label={'Apellido'} width="w-full " value={surname} />
              <InputFormStatic label={'Email'} width="w-full" value={email} />
              <InputFormStatic label={'Celular'} width="w-full" value={phone} />
            </div>
            <div className="w-full  flex  justify-center p-5">
              <button
                className="bg-naranja w-3/4 py-3 px-8 rounded-2xl text-white  hover:bg-red-500 max-lg:w-full "
                onClick={() => {
                  navigate(name_proyect + '/user/edit');
                }}
              >
                Editar Información
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserInfo;
