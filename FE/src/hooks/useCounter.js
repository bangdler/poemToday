import { useState, useRef, useCallback } from 'react';

export function useCounter({ initialSeconds, interval }) {
  // 초단위 시간
  const [count, setCount] = useState(initialSeconds);
  const timer = useRef(null);

  const startCount = useCallback(() => {
    if (timer.current !== null) return;
    timer.current = setInterval(() => setCount(x => x - 1), interval);
  }, []);

  const stopCount = useCallback(() => {
    if (timer.current === null) return;
    clearInterval(timer.current);
  }, []);

  const resetCount = useCallback(() => {
    setCount(initialSeconds);
    stop();
  }, []);

  const getTimeFromCount = useCallback(count => {
    const hours = Math.floor(count / 3600);
    const totalMinutes = Math.floor(count / 60);
    const minutes = totalMinutes % 60;
    const seconds = count % 60;
    return [hours, minutes, seconds];
  }, []);

  return { count, startCount, stopCount, resetCount, getTimeFromCount };
}
