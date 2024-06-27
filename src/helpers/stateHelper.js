// import services API
import userService from '../apis/user';
import ingredientService from '../apis/ingredient';
import stepService from '../apis/step';
import ingredientRecipeService from '../apis/ingredientRecipe';
import recipeService from '../apis/recipe';
import saveRecipeService from '../apis/saveRecipe';
import { compareTimes, getCurrentTime, getTodayDate, flipDate } from '../utils/dateUtils';

export const verifyLoggedIn = async (login, logOut) => {
  if (!localStorage.getItem('token')) {
    logOut();
    return;
  }

  const resultVerify = await userService.verify();
  if (!resultVerify?.success) {
    logOut();
    return;
  }

  login();
  return;
};

export const verifyExpiredToken = (showNewMessage, logOut) => {
  if (!localStorage.getItem('timeExpired')) {
    return;
  }

  const timeExpired = JSON.parse(localStorage.getItem('timeExpired'));
  const currentTime = getCurrentTime();
  if (compareTimes(currentTime, timeExpired)) {
    logOut();
    showNewMessage('warning', 'La sesión a caducado');
    window.location.href = 'http://localhost:5173/';
  }

  return;
};

export const callUserData = async (showNewMessage, addMainUser) => {
  if (!localStorage.getItem('token')) {
    return;
  }

  const resUserData = await userService.getThisUser();

  if (!resUserData?.success) {
    showNewMessage('error', resUserData.message);
    return;
  }

  const { name, surname, email, phone, image, id, username } = resUserData.data;
  addMainUser(name, surname, email, phone, image, '', username, id);
};

export const callIngredientData = async (showNewMessage, addAllListIngredientHook) => {
  const resIngredienteData = await ingredientService.getAll();

  if (!resIngredienteData?.success) {
    showNewMessage('error', resUserData.message);
    return;
  }
  addAllListIngredientHook(resIngredienteData.data);
};

export const callUserRecipe = async (showNewMessage, setshowPanelExist, setRecetasUser) => {
  const recipesUser = await recipeService.getAllOfUser();

  if (!recipesUser?.success) {
    showNewMessage('error', recipesUser.message);
    return;
  }
  setRecetasUser(recipesUser.data);
  if (recipesUser.data.length === 0) {
    setTimeout(() => {
      setshowPanelExist(true);
    }, 1000);
  }
};

export const callUserSaveRecipe = async (
  showNewMessage,
  setshowPanelExist,
  setRecetasSaveUser
) => {
  const recipesUserSaveRecipe = await saveRecipeService.getSaveRecipe();

  if (!recipesUserSaveRecipe?.success) {
    showNewMessage('error', recipesUserSaveRecipe.message);
    return;
  }
  setRecetasSaveUser(recipesUserSaveRecipe.data);
  if (recipesUserSaveRecipe.data.length === 0) {
    setTimeout(() => {
      setshowPanelExist(true);
    }, 1000);
  }
};

export const callRecipe = async (
  idRecipe,
  showNewMessage,
  addItemRecipe,
  addAllListIngredientRecipeHook,
  addAllListStepRecipeHook,
  setexistRecipe,
  setshowPanelExist
) => {
  const resRecipe = await recipeService.getOne(idRecipe);

  if (!resRecipe?.success) {
    resRecipe.message !== 'Receta no encontrada' && showNewMessage('error', resRecipe.message);
    setTimeout(() => {
      setshowPanelExist(true);
    }, 1000);
    return;
  }
  const { name, description, img, dificultad, porcion, time, date, id, User } = resRecipe.data;

  addItemRecipe(
    name,
    description,
    img,
    dificultad,
    porcion,
    time,
    flipDate(date),
    id,
    User.name + ' ' + User.surname
  );

  const resIngredient = await ingredientRecipeService.getOfRecipe(id);

  if (resIngredient) {
    addAllListIngredientRecipeHook(resIngredient.data);
  }

  const resStep = await stepService.getOfRecipe(id);

  if (resStep) {
    addAllListStepRecipeHook(resStep.data);
  }

  setexistRecipe(true);
};

export const pushDataSteps = async (showNewMessage, step, id_receta, num) => {
  //poner la imagen del paso si hay --
  const resPushDataSteps = await stepService.create(
    num,
    step.name,
    step.description,
    'ss',
    id_receta
  );

  if (!resPushDataSteps?.success) {
    showNewMessage('error', resUserData.message);
  }
};

export const pushDataIngredientRecipe = async (showNewMessage, ing, id_receta) => {
  const resPushDataIngredientRecipe = await ingredientRecipeService.create(
    ing.cantidad,
    ing.medicion,
    ing.especificacion,
    ing.ingrediente_id,
    id_receta,
    ing.priority
  );

  if (!resPushDataIngredientRecipe?.success) {
    showNewMessage('error', resPushDataIngredientRecipe.message);
  }
};

export const pushDataRecipeComplete = async (
  showNewMessage,
  name,
  description,
  time,
  dificultad,
  porcion,
  imgUpload,
  listStep,
  listIngredientRecipe
) => {
  try {
    showNewMessage('loading', 'cargando');

    const resPushDataRecipe = await recipeService.create(
      name,
      description,
      imgUpload,
      dificultad,
      time,
      porcion,
      getTodayDate()
    );

    if (!resPushDataRecipe?.success) {
      showNewMessage('error', resPushDataRecipe.message);
      return -1;
    }

    await Promise.all(
      listStep.map((step, index) =>
        pushDataSteps(showNewMessage, step, resPushDataRecipe.data.id, index + 1)
      )
    );

    await Promise.all(
      listIngredientRecipe.map((ing) =>
        pushDataIngredientRecipe(showNewMessage, ing, resPushDataRecipe.data.id)
      )
    );
    return resPushDataRecipe.data.id;
  } catch (error) {
    console.log(error.message);
    return -1;
  }
};

export const editDataRecipeComplete = async (
  showNewMessage,
  editDataRecipe,
  name,
  description,
  time,
  dificultad,
  porcion,
  imgUpload,
  listStep,
  listIngredientRecipe
) => {
  try {
    showNewMessage('loading', 'cargando');

    const reseditDataRecipe = await recipeService.editRecipe(
      editDataRecipe.id,
      description,
      imgUpload,
      name,
      dificultad,
      time,
      porcion,
      flipDate(editDataRecipe.date)
    );

    if (!reseditDataRecipe?.success) {
      showNewMessage('error', reseditDataRecipe.message);
      return -1;
    }

    await stepService.deleteStepsOfRecipe(editDataRecipe.id);

    await ingredientRecipeService.deleteIngsOfRecipe(editDataRecipe.id);

    await Promise.all(
      listStep.map((step, index) =>
        pushDataSteps(showNewMessage, step, reseditDataRecipe.data.id, index + 1)
      )
    );

    await Promise.all(
      listIngredientRecipe.map((ing) =>
        pushDataIngredientRecipe(showNewMessage, ing, reseditDataRecipe.data.id)
      )
    );
    return reseditDataRecipe.data.id;
  } catch (error) {
    console.log(error.message);
    return -1;
  }
};

export const editDataUserComplete = async (showNewMessage, name, surname, phone, image) => {
  try {
    showNewMessage('loading', 'cargando');

    const resEditUser = await userService.edit(name, surname, phone, image);
    if (!resEditUser?.success) {
      showNewMessage('error', resEditUser.message);
      return -1;
    }

    showNewMessage('success', 'Información del usuario editado con exito');
    return 1;
  } catch (error) {
    console.log(error.message);
    return -1;
  }
};
