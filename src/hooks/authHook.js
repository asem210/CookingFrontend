import { useDispatch, useSelector } from 'react-redux';
import { onLogin, onLogout } from '../redux/slices/authSlice';

export const useAuth = () => {
  const { token, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(onLogout());
  };

  const login = () => {
    dispatch(onLogin());
  };

  return {
    //properties
    token,
    status,
    //functions
    logOut,
    login,
  };
};
