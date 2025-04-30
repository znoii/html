import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 

const TimerApp = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [inputSeconds, setInputSeconds] = useState<number>(10);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setInputSeconds(value);
  };

  const startTimer = () => {
    if (inputSeconds <= 0) return;
    setSeconds(inputSeconds);
    setIsRunning(true);
    setTimeExpired(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setIsRunning(false);
          setTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  return (
    <div className="timer-container">
      <h1>Таймер</h1>
      
      <div className="input-group">
        <label>
          Введите количество секунд:
          <input
            type="number"
            value={inputSeconds}
            onChange={handleInputChange}
            min="1"
            disabled={isRunning}
          />
        </label>
      </div>

      <div className="counter">
        {isRunning || seconds > 0 ? `Осталось секунд: ${seconds}` : ''}
      </div>

      {timeExpired && (
        <div className="expired-message">ВРЕМЯ ИСТЕКЛО</div>
      )}

      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>
          Старт
        </button>
      </div>
    </div>
  );
};

export default TimerApp;