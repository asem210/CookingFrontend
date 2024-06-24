// obtiene el tiempo actual en el  formato  { day: '21', time: '23:10' }
export const getCurrentTime = () => {
  const currentDate = new Date();
  const day = currentDate.toLocaleString('es-PE', {
    day: '2-digit',
  });

  const time = currentDate.toLocaleString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    day: day,
    time: time,
  };
};

// hora de expiración despues de agregarle un "timeToAdd" en minutos, en el  formato  { day: '21', time: '23:10' }
export const expirationTime = (timeToAdd) => {
  const currentDate = new Date();
  let formattedTime = currentDate.toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
  });

  const day = currentDate.toLocaleString('es-PE', {
    day: '2-digit',
  });

  let [hours, minutes] = formattedTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + timeToAdd;

  const dayM = totalMinutes > 1440 ? parseInt(day) + 1 : day;

  hours = Math.floor(totalMinutes / 60) % 24;
  minutes = totalMinutes % 60;

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return {
    day: dayM.toString(),
    time: hours + ':' + minutes,
  };
};

// compara el tiempo actual - tiempo guardado , formato del tiempo ejem: { day: '21', time: '23:10' }
export const compareTimes = (time1, time2) => {
  const [day1, hourMin1] = [parseInt(time1.day), time1.time.split(':').map(Number)];
  const [day2, hourMin2] = [parseInt(time2.day), time2.time.split(':').map(Number)];

  return (
    day1 > day2 ||
    (day1 === day2 &&
      (hourMin1[0] > hourMin2[0] ||
        (hourMin1[0] === hourMin2[0] && hourMin1[1] >= hourMin2[1])))
  );
};

export const flipDate = (fecha) => {
  let partes = fecha.split('-');
  if (partes.length !== 3) {
    throw new Error('Formato de fecha inválido. Debe ser YYYY-MM-DD');
  }
  let fechaVolteada = `${partes[2]}-${partes[1]}-${partes[0]}`;
  return fechaVolteada;
};

export const getTodayDate = () => {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (day < 10) day = '0' + day;

  if (month < 10) month = '0' + month;

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
