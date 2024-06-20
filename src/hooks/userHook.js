import { useDispatch, useSelector } from 'react-redux';
import { addUser, changeImgEdit, clearState, clearImgEdit } from '../redux/slices/userSlice';

export const useUser = () => {
  const { name, surname, email, phone, image, password, username, imgEdit } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const addMainUser = (name, surname, email, phone, image, password, username) => {
    dispatch(addUser({ name, surname, email, phone, image, password, username }));
  };

  const clearStateUser = () => {
    dispatch(clearState({ name, surname, email, phone, image, password, username }));
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
    // functions
    addMainUser,
    clearStateUser,
    changeImgEditHook,
    clearStateImgEdit,
  };
};
