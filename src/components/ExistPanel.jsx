import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

export const ExistPanelRecip = () => {
  return (
    <div className="flex gap-2 items-center">
      <TbFaceIdError size={'60px'} />
      <p className="font-belleza font-bold text-4xl">No Existe la receta</p>
    </div>
  );
};
