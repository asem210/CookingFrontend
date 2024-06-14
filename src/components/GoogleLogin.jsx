import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import userService from "../apis/user";
import { useNavigate } from "react-router-dom";

export const LoginSocialMedia = () => {
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
          console.log("1");
          const login = await userService.loginGoogle(email);
          console.log(login);
          navigate(name_proyect + "/home");
        } else {
          console.log("2");
          const newUser = await userService.createGoogle(
            email,
            decoded.given_name,
            decoded.family_name,
            decoded.picture
          );
          const login = await userService.loginGoogle(email);
          console.log(login);
          navigate(name_proyect + "/home");
        }
      } else {
        console.log("No email found in decoded token.");
      }
    } catch (error) {
      console.log("Error decoding token or fetching user: ", error);
    }
  };

  return (
    <div className="flex flex-col font-belleza w-full justify-center items-center pt-5 text-[16px] ">
      <p className=" text-textoalt">o continúa con</p>
      <div className="flex flex-row space-x-5 mt-2">
        <GoogleLogin
          onSuccess={loginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};
