import { useDispatch, useSelector } from 'react-redux';
import { addUser, changeImgEdit, clearState, clearImgEdit } from '../redux/slices/userSlice';

export const useUser = () => {
  const { name, surname, email, phone, image, password, username, imgEdit, userId } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addMainUser = (name, surname, email, phone, image, password, username, userId) => {
    dispatch(addUser({ name, surname, email, phone, image, password, username, userId }));
  };

  const clearStateUser = () => {
    dispatch(clearState());
  };

  const clearStateImgEdit = () => {
    dispatch(clearImgEdit());
  };

  const changeImgEditHook = (img) => {
    dispatch(changeImgEdit(img));
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
    imgEdit,
    userId,
    // functions
    addMainUser,
    clearStateUser,
    changeImgEditHook,
    clearStateImgEdit,
  };
};
