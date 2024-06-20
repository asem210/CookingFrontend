import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useUser } from '../hooks/userHook';
import { InputFormCreateIng } from '../components/inputs';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ImageUploaderUser } from '../components/uploadImage';
import userService from '../apis/user';
import { useMessage } from '../hooks/messageHook';
const UserEdit = () => {
  const { name, username, surname, phone, image, email, imgEdit, changeImgEditHook } =
    useUser();
  const { register, setValue, handleSubmit } = useForm();
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const { showNewMessage } = useMessage();
  useEffect(() => {
    changeImgEditHook(image);
    setValue('name', name);
    setValue('surname', surname);
    setValue('phone', phone);
    setValue('email', email);
  }, [name]);

  const editCall = async (name, surname, phone, image) => {
    try {
      await userService.edit(name, surname, phone, image);
    } catch (error) {
      showNewMessage('error', 'Error al editar: ' + error.message);
    }
  };

  const onSubmit = (formData) => {
    try {
      editCall(formData.name, formData.surname, formData.phone, imgEdit);
    } catch (error) {
      showNewMessage('error', 'Error al editar: ' + error.message);
    } finally {
      showNewMessage('success', 'Información del usuario editado con exito');
      navigate(name_proyect + '/user/info');
    }
  };

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className="w-screen h-[80%]  min-h-[78vh] flex flex-col items-center ">
        <section className="flex gap-10 mt-5  w-[90%]  ">
          <article className="w-1/3 items-center justify-center flex flex-col">
            <figure className="overflow-hidden  w-[40%] h-44 rounded-[100%] flex items-center ">
              <img src={imgEdit} className="w-full h-full" />
            </figure>
            <p>{username} </p>
            <ImageUploaderUser />
          </article>

          <div className="w-2/3  flex flex-col  ">
            <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-y-5 ">
                <InputFormCreateIng
                  label={'Nombre'}
                  placeholder={'Ingrese el nombre'}
                  action={register}
                  name={'name'}
                  width="w-4/5"
                />

                <InputFormCreateIng
                  label={'Apellido'}
                  placeholder={'Ingrese el apellido'}
                  action={register}
                  name={'surname'}
                  width="w-4/5"
                />
                <InputFormCreateIng
                  label={'email'}
                  placeholder={'Ingrese el email'}
                  action={register}
                  name={'email'}
                  width="w-4/5"
                  visible
                />
                <InputFormCreateIng
                  label={'Celular'}
                  placeholder={'Ingrese el celular'}
                  action={register}
                  name={'phone'}
                  width="w-4/5"
                />
              </div>

              <button
                className="bg-naranja py-3 px-8 rounded-2xl text-white mt-9 m-auto hover:bg-red-500  w-1/2 "
                type="submit"
              >
                Editar
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default UserEdit;
