import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import images from '../constants/images';

const Results = () => {
  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };
  const gif = getObjectById(5);

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className="w-screen h-[80%] flex flex-col items-center gap-5">
        <section className="w-3/5   items-center justify-center flex flex-col">
          <h2 className="font-belleza text-[30px] ">Bienvenido a </h2>
          <figure className="overflow-y-hidden  items-center justify-center flex h-20 w-full mt-[-10px]">
            <img src={gif.link} alt="Loading..." className="h-[400%] " />
          </figure>

          <p className="font-belleza text-[18px] ">
            Encuentra la receta perfecta con los ingredientes que tienes en casa
          </p>
          <div className="w-1/2  my-2 flex items-center relative">
            <input className="border border-black rounded-md  p-1.5 w-full  "></input>
            <HiMagnifyingGlass className="absolute left-[92%]" />
          </div>
        </section>
        <section className="w-4/5 ">
          <div className="grid grid-cols-4 grid-flow-row gap-5">
            <CardRecipe
              img={
                'https://content.skyscnr.com/m/2dcd7d0e6f086057/original/GettyImages-186142785.jpg?resize=2560px:1707px'
              }
              time="30"
              porcion="4"
              dificulty="medio"
              fitStep="Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada"
              name="Pollo a la naranja"
            ></CardRecipe>

            <CardRecipe
              img={
                'https://assets.elgourmet.com/wp-content/uploads/2023/03/kanel_rSsnyqvI3g8XNAhPiaECQJUOdG27Ho-1024x683.png.webp'
              }
              time="45"
              porcion="6"
              dificulty="fácil"
              fitStep="Precalienta el horno a 180°C. En un tazón grande, mezcla la harina, el azúcar, la levadura y la sal. Agrega la mantequilla derretida y la leche tibia. Amasa hasta obtener una masa suave y elástica. Deja reposar durante 1 hora. Forma bollos con la masa y colócalos en una bandeja para hornear. Hornea durante 15 minutos o hasta que estén dorados."
              name="Bollos de canela"
            ></CardRecipe>
            <CardRecipe
              img={
                'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/87bb52f6-15d5-4cd9-9253-04f01555491f/Derivates/d666b5c2-ba8c-4201-afc6-11f2f6990f23.jpg'
              }
              time="60"
              porcion="8"
              dificulty="medio"
              fitStep="En un bol grande, mezcla la harina, el polvo de hornear, la sal y el azúcar. Agrega la leche, el huevo y el aceite. Mezcla hasta que quede suave. Calienta una sartén a fuego medio y vierte un cucharón de masa. Cocina hasta que aparezcan burbujas en la superficie, luego voltea y cocina por el otro lado. Repite con el resto de la masa."
              name="Panqueques"
            ></CardRecipe>

            <CardRecipe
              img={
                'https://kikkomanusa.com/sabor/wp-content/uploads/sites/6/2023/02/14017_Easy-Weeknight-Stir-Fry-with-Noodles.jpg'
              }
              time="40"
              porcion="6"
              dificulty="fácil"
              fitStep="Hierve agua en una olla grande. Agrega los fideos y cocina según las instrucciones del paquete. Mientras tanto, calienta aceite en una sartén grande y saltea el ajo hasta que esté dorado. Agrega las verduras y saltea hasta que estén tiernas. Escurre los fideos cocidos y añádelos a la sartén. Agrega salsa de soja y revuelve bien. Sirve caliente."
              name="Salteado de fideos y verduras"
            ></CardRecipe>
          </div>
        </section>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Results;
