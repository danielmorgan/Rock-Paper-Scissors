/**
 * Return a random integer between the passed parameters.
 *
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Return a random property from the passed object.
 *
 * @param object {object}
 * @returns {object}
 */
export function randomProperty(object) {
  let properties = Object.keys(object);
  let index = randomInt(0, properties.length - 1);
  let propertyKey = properties[index];

  return object[propertyKey];
}
