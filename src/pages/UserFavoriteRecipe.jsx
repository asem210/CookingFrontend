import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import Loading from '../components/Loading';
import { ExistPanelRecip } from '../components/ExistPanel';
// import react icons
import { HiMagnifyingGlass } from 'react-icons/hi2';
// import hooks
import { useUser } from '../hooks/userHook';
import { useMessage } from '../hooks/messageHook';
//import helpers
import { callUserSaveRecipe } from '../helpers/stateHelper';

const UserFavoriteRecipe = () => {
  //hooks
  const { userId } = useUser();
  const { showNewMessage } = useMessage();
  //usesate
  const [showPanelExist, setshowPanelExist] = useState(false);
  const [recetasSaveUser, setRecetasSaveUser] = useState([]);

  useEffect(() => {
    callUserSaveRecipe(showNewMessage, setshowPanelExist, setRecetasSaveUser);
  }, []);

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      {recetasSaveUser.length !== 0 ? (
        <div className="w-screen h-[80%]  min-h-[80vh] flex flex-col items-center gap-5">
          <section className="w-3/5   items-center justify-center flex flex-col mt-10">
            <p className="font-belleza text-[18px] ">Encuentra la receta</p>
            <div className="w-1/2  my-2 flex items-center relative">
              <input className="border border-black rounded-md  p-1.5 w-full  "></input>
              <HiMagnifyingGlass className="absolute left-[92%]" />
            </div>
          </section>
          <section className="w-4/5 ">
            <div className="grid grid-cols-4 grid-flow-row gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 ">
              {recetasSaveUser.map((item, index) => {
                return (
                  <CardRecipe
                    img={item.receta.img}
                    time={item.receta.time}
                    porcion={item.receta.porcion}
                    dificulty={item.receta.dificultad}
                    fitStep="Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada"
                    name={item.receta.name}
                    key={index}
                    idReceta={item.receta.id}
                    date={item.receta.date}
                    saveRecipe={true}
                    editable={false}
                    SavebookMark={true}
                  ></CardRecipe>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <div className="min-h-[81vh] items-center flex justify-center">
          {showPanelExist ? (
            <div className="flex flex-col items-center ">
              <ExistPanelRecip title="No tiene asignado ninguna receta en favoritos"></ExistPanelRecip>
            </div>
          ) : (
            <Loading size={90}></Loading>
          )}
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};

export default UserFavoriteRecipe;
