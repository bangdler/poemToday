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

export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('localStorage is not working');
  }
}

export function getLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.log('localStorage is not working');
  }
}

export function removeLocalStorage(key) {
  try {
    return localStorage.removeItem(key);
  } catch (e) {
    console.log('localStorage is not working');
  }
}
