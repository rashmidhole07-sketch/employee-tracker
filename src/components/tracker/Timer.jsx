import { useState, useEffect, useRef } from "react";

const Timer = ({ onSave }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Start Timer
  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);
    startTimeRef.current = new Date();

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  // Stop Timer
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);

    const endTime = new Date();

    onSave({
      start: startTimeRef.current,
      end: endTime,
      duration: seconds,
    });

    setSeconds(0);
  };

  // Format Time
  const formatTime = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Cleanup
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="card p-5 text-center shadow-sm">
  <h1 className="display-5 mb-3">{formatTime(seconds)}</h1>

  <button
    className={`btn ${isRunning ? "btn-danger" : "btn-success"} px-4`}
    onClick={isRunning ? stopTimer : startTimer}
  >
    {isRunning ? "Stop" : "Start"}
  </button>
</div>
  );
};

export default Timer;