import React, { useEffect, useState } from 'react';
import './Timer.css'

function Timer({ setDay }) {
  const [timeTo, setTimeTo] = useState(5);
  const [id, setId] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const theDay = new Date(2021, 11, 18);
      const today = new Date();
      const seconds = Math.floor((theDay - today) / 1000);
      setTimeTo(timeTo - 1);
    }, 1000);
    setId(intervalId);
    return () => {
      clearInterval(intervalId);
    }
  }, [timeTo]);

  useEffect(() => {
    if (timeTo === 0) {
      clearInterval(id);
      setDay(true);
    }
  }, [timeTo, id , setDay])

  const renderTimer = () => {
    const hours = Math.floor(timeTo / 3600);
    const minutes = Math.floor((timeTo % 3600) / 60);
    const seconds = timeTo % 60;

    return (
      <h1>{hours > 9 ? hours : '0' + hours}:{minutes > 9 ? minutes : '0' + minutes}:{seconds > 9 ? seconds : '0' + seconds}</h1>
    )
  }

  const renderInfo = () => {
    return (
      <div className='info'>
        <h1>Faltam <span>{timeTo} segundos para 5 décadas</span></h1>
        <h2>Isso equivale a {Math.floor(timeTo / 60)} minutos</h2>
        <h3>E também a {Math.floor(timeTo / 3600)} horas </h3>
      </div>
    );
  }

  const renderCongrats = () => {
    return (
      <div className='congrats'>
        <h1>Feliz 5 décadas my love</h1>
        <h1>Te amo {"\u2764"}{"\u2764"}{"\u2764"}</h1>
      </div>
    )
  }

  return (
    <div className='timer'>
      { renderTimer() }
      {
        (timeTo > 0) ? renderInfo() : renderCongrats()
      }
    </div>
   );
}

export default Timer;

// new Date(ano, mês, dia, hora, minuto, segundo, milissegundo)