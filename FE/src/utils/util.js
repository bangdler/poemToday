import qs from 'qs';

export const debounce = (callback, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

export const firstAndDebounce = (callback, delay) => {
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
};

export const throttle = (callback, time) => {
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
};

export const throttleByAnimationFrame = callback =>
  function (...args) {
    window.requestAnimationFrame(() => {
      callback.apply(this, args);
    });
  };

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('localStorage is not working');
  }
};

export const getLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.log('localStorage is not working');
  }
};

export const removeLocalStorage = key => {
  try {
    return localStorage.removeItem(key);
  } catch (e) {
    console.log('localStorage is not working');
  }
};

export const buildUrl = ({ username, page, category }) => {
  const pageQuery = qs.stringify({ page });
  const categoryQuery = qs.stringify({ category }, { arrayFormat: 'repeat' });
  const AND = page && category.length ? '&' : '';
  return username ? `/@${username}?${categoryQuery}${AND}${pageQuery}` : `/?${categoryQuery}${AND}${pageQuery}`;
};
