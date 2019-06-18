import React from 'react';

export default function Clock(props)  {
  const {mode, timeLeft} = props;
  return (
    <div id="timer-wrapper">
      <h2 id="timer-label">{mode}</h2>
      <div className="d-inline-block w-50 h1 rounded" id="time-left">{String(Math.floor(timeLeft / 60)).padStart(2, '0') + ':'  + String(timeLeft % 60).padStart(2, '0')}</div>
    </div>
  );
}
