import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useUser } from '../hooks/userHook';
import { InputFormCreateIng } from '../components/inputs';
import { useForm } from 'react-hook-form';

const UserInfo = () => {
  const { name, username, surname, phone, image, email } = useUser();
  const { register, setValue } = useForm();

  useEffect(() => {
    setValue('name', name);
    setValue('surname', surname);
    setValue('phone', phone);
    setValue('email', email);
  }, [name]);

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className="w-screen h-[80%]  min-h-[78vh] flex flex-col items-center ">
        <section className="flex gap-10 mt-5  w-4/5">
          <article className="w-1/3">
            <figure className="overflow-hidden  w-3/5 h-44 rounded-[100%] flex items-center ">
              <img src={image} className="w-full h-full" />
            </figure>
            <p>{username} </p>
          </article>

          <div className="w-2/3 grid grid-cols-2 gap-y-5">
            <InputFormCreateIng
              label={'Nombre'}
              placeholder={'Ingrese el nombre'}
              action={register}
              name={'name'}
              width="w-4/5"
              visible
            />
            <InputFormCreateIng
              label={'Apellido'}
              placeholder={'Ingrese el apellido'}
              action={register}
              name={'surname'}
              width="w-4/5"
              visible
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
              visible
            />
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserInfo;
