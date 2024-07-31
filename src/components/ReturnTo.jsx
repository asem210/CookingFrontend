import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const BackToHomeButton = ({ navigateTo, text }) => {
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(`${name_proyect}/${navigateTo}`);
  };

  const handleHover = (event) => {
    event.currentTarget.classList.add('hover-effect');
  };

  const handleLeave = (event) => {
    event.currentTarget.classList.remove('hover-effect');
  };

  return (
    <div
      className="flex flex-row items-center w-1/3 hover:bg-gray-200 rounded-md p-2 cursor-pointer max-md:w-1/2"
      onClick={navigateToHome}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <IoIosArrowRoundBack size={36} />
      <p className="font-belleza text-[16px] text-negro ml-2 max-md:text-[14px]">{text}</p>
    </div>
  );
};

export default BackToHomeButton;
