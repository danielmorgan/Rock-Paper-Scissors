/**
 * Return a random integer between the passed parameters.
 *
 * @param min
 * @param max
 * @returns {number}
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
