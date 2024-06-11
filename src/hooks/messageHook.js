import { useDispatch, useSelector } from 'react-redux';
import { openMessage, closeMessage } from '../redux/slices/messageSlice';

export const useMessage = () => {
  const { show, type, message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const showNewMessage = (type, message) => {
    dispatch(openMessage({ type, message }));
  };

  const closeModalMessage = () => {
    dispatch(closeMessage());
  };
  return {
    //properties
    show,
    type,
    message,
    //functions
    showNewMessage,
    closeModalMessage,
  };
};
