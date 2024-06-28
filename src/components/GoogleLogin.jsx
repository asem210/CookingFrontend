import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import userService from '../apis/user';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../hooks/messageHook';
import { useAuth } from '../hooks/authHook';
import {} from '../utils/othersUtils';
export const LoginSocialMedia = () => {
  const { showNewMessage } = useMessage();
  const { login, logOut, token, status } = useAuth();

  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  const navigate = useNavigate();
  const loginSuccess = async (credentialResponse) => {
    try {
      console.log(credentialResponse);
      const decoded = jwtDecode(credentialResponse?.credential);
      console.log(decoded);
      const email = decoded.email;
      if (email) {
        const userData = await userService.getByEmail(email);
        if (userData.success) {
          const loginGoogle = await userService.loginGoogle(email);
          login();
          navigate(name_proyect + '/home');
          showNewMessage('success', 'Sesión iniciada con éxito');
        } else {
          console.log('2');
          const newUser = await userService.createGoogle(
            email,
            capitalizeAllSentences(decoded.given_name),
            capitalizeAllSentences(decoded.family_name),
            decoded.picture,
            String(email).split('@')[0]
          );
          const loginGogle = await userService.loginGoogle(email);
          login();
          navigate(name_proyect + '/home');
          showNewMessage('success', 'Sesión iniciada con éxito');
        }
      } else {
        console.log('No email found in decoded token.');
        showNewMessage('warning', 'No hay cuenta de google asociada');
      }
    } catch (error) {
      showNewMessage('error', error.message);
    }
  };

  return (
    <div className="flex flex-col font-belleza w-full justify-center items-center pt-5 text-[16px] ">
      <p className=" text-textoalt">o continúa con</p>
      <div className="flex flex-row space-x-5 mt-2">
        <GoogleLogin
          onSuccess={loginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
};
