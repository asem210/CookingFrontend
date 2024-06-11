import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/slices/userSlice';

export const useUser = () => {
  const { name, surname, email, phone, image } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addMainUser = (name, surname, email, phone, image) => {
    dispatch(addUser({ name, surname, email, phone, image }));
  };

  return {
    //properties
    name,
    surname,
    email,
    phone,
    image,
    // functions
    addMainUser,
  };
};
