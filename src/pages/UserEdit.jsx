import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { InputFormCreateIng } from '../components/inputs';
import { ImageUploaderUser } from '../components/uploadImage';
// import hooks
import { useUser } from '../hooks/userHook';
import { useMessage } from '../hooks/messageHook';
// Import utils y helpers
import { editDataUserComplete } from '../helpers/stateHelper';

const UserEdit = () => {
  //hooks
  const { name, username, surname, phone, image, email, imgEdit, changeImgEditHook } =
    useUser();
  const { register, setValue, handleSubmit } = useForm();
  const { showNewMessage } = useMessage();
  // variables
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  useEffect(() => {
    changeImgEditHook(image);
    setValue('name', name);
    setValue('surname', surname);
    setValue('phone', phone);
    setValue('email', email);
  }, [name]);

  const onSubmit = async (formData) => {
    const resEdit = await editDataUserComplete(
      showNewMessage,
      formData.name,
      formData.surname,
      formData.phone,
      imgEdit
    );

    if (resEdit !== -1) {
      navigate(name_proyect + '/user/info');
    }
  };

  return (
    <div className="container-page">
      <NavBar></NavBar>
      <div className="w-screen h-[80%]  min-h-[78vh] flex flex-col items-center ">
        <section className="flex gap-10 mt-5  w-4/5 max-sm:w-full px-5  max-lg:items-center max-sm:flex-col max-sm:gap-1">
          <article className="w-1/3   flex flex-col items-center gap-2 max-sm:w-1/2">
            <p className="font-belleza ">Foto de Perfil:</p>
            <figure className="overflow-hidden  w-1/2  min-w-48 h-44 rounded-[100%] flex items-center max-sm:min-w-48  ">
              <img src={imgEdit} className="w-full h-full" />
            </figure>
            <p>{'username'} </p>
            <ImageUploaderUser />
          </article>

          <div className="w-2/3  flex flex-col  items-center max-sm:w-full">
            <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-5 w-full grid grid-cols-2 max-lg:grid-cols-1 gap-y-3  gap-5">
                <InputFormCreateIng
                  label={'Nombre'}
                  placeholder={'Ingrese el nombre'}
                  action={register}
                  name={'name'}
                  width="w-full"
                />

                <InputFormCreateIng
                  label={'Apellido'}
                  placeholder={'Ingrese el apellido'}
                  action={register}
                  name={'surname'}
                  width="w-full"
                />
                <InputFormCreateIng
                  label={'email'}
                  placeholder={'Ingrese el email'}
                  action={register}
                  name={'email'}
                  width="w-full"
                  visible
                />
                <InputFormCreateIng
                  label={'Celular'}
                  placeholder={'Ingrese el celular'}
                  action={register}
                  name={'phone'}
                  width="w-full"
                />
              </div>

              <div className="w-full  flex  justify-center p-5">
                <button
                  className="bg-naranja w-3/4 py-3 px-8 rounded-2xl text-white  hover:bg-red-500 max-lg:w-full "
                  type="submit"
                >
                  Editar Información
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default UserEdit;
