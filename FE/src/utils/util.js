export function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
export function firstAndDebounce(callback, delay) {
  let timer = 'first';
  return function (...args) {
    if (timer === 'first') {
      callback.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
      timer = 'first';
    }, delay);
  };
}

export function throttle(callback, time) {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, time);
    }
  };
}
