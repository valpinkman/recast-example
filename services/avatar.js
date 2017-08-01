/**
 * @function getAvatar
 * @param {string} username
 * @param {?string} initials
 * @returns {string} the customized url for the avatar, with optionals initials
 */
const getAvatar = (username, initials = '') =>
  `https://avatar.tobi.sh/${username}.svg${initials ? `?text=${initials}` : ''}`;

export default getAvatar;
