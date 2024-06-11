import { useDispatch, useSelector } from "react-redux";
import { addUser, clearState } from "../redux/slices/userSlice";

export const useUser = () => {
  const { name, surname, email, phone, image, password, username } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addMainUser = (
    name,
    surname,
    email,
    phone,
    image,
    password,
    username
  ) => {
    dispatch(
      addUser({ name, surname, email, phone, image, password, username })
    );
  };

  const clearStateUser = () => {
    dispatch(
      clearState({ name, surname, email, phone, image, password, username })
    );
  };

  return {
    //properties
    name,
    surname,
    email,
    phone,
    image,
    password,
    username,
    // functions
    addMainUser,
    clearStateUser,
  };
};
