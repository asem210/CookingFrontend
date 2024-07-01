import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

export const ExistPanelRecip = ({ title = 'No Existe la receta' }) => {
  return (
    <div className="flex gap-2 items-center justify-around  max-sm:flex-col  max-sm:text-center">
      <TbFaceIdError size={'60px'} />
      <p className="font-belleza font-bold text-4xl">{title}</p>
    </div>
  );
};
