import React, { useState } from 'react';
import Timer from '../components/Timer/Timer';
import Desconfiada from '../images/mylovedesconfiada.JPG';
import Beijo from '../images/beijandomylove.JPG'

function TimeToFiveDecades() {
  const [theDayHasCome, setDay] = useState(false);
  return (
    <div>
      <Timer setDay={setDay} />
      <img src={ theDayHasCome ? Beijo : Desconfiada } alt="" className='desconfiada' width={ `${100}%` }/>
    </div>
  );
}

export default TimeToFiveDecades;