import { useDispatch, useSelector } from 'react-redux';
import {
  addListStep,
  addListStepRecipe,
  addStep,
  addStepRecipe,
  clearStep,
  clearStepRecipe,
  removeListStep,
  removeListStepRecipe,
} from '../redux/slices/stepSlice';

export const useStep = () => {
  const { step, listStep, stepRecipe, listStepRecipe } = useSelector((state) => state.step);

  const dispatch = useDispatch();

  const addStepHook = (step) => {
    dispatch(addStep(step));
  };

  const clearStepHook = () => {
    dispatch(clearStep());
  };

  const addStepToList = (ing) => {
    dispatch(addListStep(ing));
  };

  const deleteStepOfList = (id) => {
    dispatch(removeListStep({ id }));
  };

  return {
    //properties
    step,
    listStep,
    stepRecipe,
    listStepRecipe,
    //functions
    addStepHook,
    clearStepHook,
    addStepToList,
    deleteStepOfList,
  };
};
