// Debounce function
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // First time timeoutID will be undefine
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a brand new setTimeout which will have a brand new userInput
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
