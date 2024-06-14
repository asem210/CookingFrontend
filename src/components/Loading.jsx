import React from 'react';

const Loading = ({ size = 80, color = '#333' }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTopColor: color,
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className="border-4 border-solid border-gray-300 border-t-transparent rounded-full animate-spin"
        style={spinnerStyle}
      ></div>
      <p className="font-belleza text-3xl mt-1">Cargando...</p>
    </div>
  );
};

export default Loading;
