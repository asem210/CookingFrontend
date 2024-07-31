import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import { ExistPanelRecip } from '../components/ExistPanel';
import Loading from '../components/Loading';
// import react icons
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { PiChefHat } from 'react-icons/pi';

//import hooks
import { useUser } from '../hooks/userHook';
import { useMessage } from '../hooks/messageHook';
//import utils y helpers
import { callUserRecipe } from '../helpers/stateHelper';

const UserRecipe = () => {
  //usesate
  const [recetasUser, setRecetasUser] = useState([]);
  const [showPanelExist, setshowPanelExist] = useState(false);
  //variables
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  //hooks
  const { showNewMessage } = useMessage();
  const { userId } = useUser();
  const [filterInput, setFilter] = useState('');

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const recetaFilter = recetasUser.filter((receta) =>
    receta.name.toLowerCase().includes(filterInput.toLowerCase())
  );

  useEffect(() => {
    callUserRecipe(showNewMessage, setshowPanelExist, setRecetasUser);
  }, []);

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      {recetasUser.length !== 0 ? (
        <div className="w-screen h-[80%]  min-h-[78vh] flex flex-col items-center gap-5">
          <section className="w-3/5   items-center justify-center flex flex-col mt-10 max-md:w-[80%] max-md:mt-1">
            <h2 className="flex flex-row gap-2 items-center max-md:flex-col  font-belleza text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-negro mb-4 text-center">
              <PiChefHat size={'85px'} />
              Mis Recetas
            </h2>
            <p className="font-belleza text-[18px] ">Encuentra tu receta</p>
            <div className="w-1/2  my-2 flex items-center relative max-md:w-full ">
              <input
                className="border border-black rounded-md  p-1.5 w-full  "
                type="text"
                placeholder="Escriba el nombre de la receta"
                value={filterInput}
                onChange={handleChange}
              ></input>
              <HiMagnifyingGlass className="absolute left-[94%] max-md:left-[90%] " />
            </div>
          </section>
          <section className="w-4/5 ">
            {recetaFilter.length !== 0 ? (
              <div className="grid grid-cols-4 grid-flow-row gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 w-fit mx-auto">
                {recetasUser &&
                  recetaFilter.map((item, index) => {
                    return (
                      <CardRecipe
                        img={item.img}
                        time={item.time}
                        porcion={item.porcion}
                        dificulty={item.dificultad}
                        description={item.description}
                        name={item.name}
                        key={index}
                        idReceta={item.id}
                        date={item.date}
                        saveRecipe={false}
                        editable={userId === item.user_id}
                      ></CardRecipe>
                    );
                  })}
              </div>
            ) : (
              <div className="w-fit mx-auto items-center mt-12">
                <ExistPanelRecip title="No hay recetas con ese nombre"></ExistPanelRecip>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="min-h-[81vh] items-center flex justify-center">
          {showPanelExist ? (
            <div className="flex flex-col items-center">
              <ExistPanelRecip title="No tiene recetas creadas"></ExistPanelRecip>
              <button
                className="bg-naranja py-3 px-8 rounded-2xl text-white mt-4 hover:bg-red-500 mr-10 max-sm:mx-0"
                onClick={() => {
                  navigate(name_proyect + '/recipe/create');
                }}
              >
                Crear una receta
              </button>
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

export default UserRecipe;
