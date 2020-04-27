const KEY_CODE_ESC = 27;


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

/**
 * Execute callback if press ESC
 * @param {Object} evt event
 * @param {*} action callback
 */
export const isEscEvent = (evt, action) => {
  if (evt.keyCode === KEY_CODE_ESC) {
    action();
  }
};

/**
 * Create a Dom Element Based on a Template
 * @param {String} template
 * @return {Element}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Rendering element to container
 * @param {Element} container
 * @param {Element} element
 * @param {string} place
 */
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 * Format count minutes to "xh xm"
 * @param {Number} totalMinutes
 * @return {String} 1h 25m
 */
export const generateLengthMarkup = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

/**
* Getting a random number in a given range
* @param {number} max maximum value
* @param {number} min minimum value
* @return {number} random value in given range
*/
export const getRandomInt = (max, min) => {
  max = max ? max : 2;
  min = min ? min : 0;

  return Math.floor(Math.random() * Math.floor(max - min)) + min;
};

/**
 * Getting a random element from an array
 * @param {Array} array
 * @return {*} random element
 */
export const getRandomElementArray = (array) => {
  return array[getRandomInt(array.length)];
};

/**
 * Getting a mixed array
 * @param {Array} array source array
 * @return {Array} mixed array
 */
export const shuffleArray = (array) => {
  return array.slice(0).sort(function () {
    return Math.random() - 0.5;
  });
};

/**
 * Getting amount of random elements from array
 * @param {Array} array source array
 * @param {number} amount number of random elements
 * @return {Array} array of random elements from an array
 */
export const getRandomElementsArray = (array, amount) => {
  amount = amount ? amount : 1;
  return shuffleArray(array).slice(0, amount);
};
