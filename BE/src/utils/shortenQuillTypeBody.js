export const shortenQuillTypeBody = ({ body, shortLength }) => {
  let shortBody = body.slice(0, shortLength);
  let close = false;
  for (let i = shortLength; i < body.length; i++) {
    if (body[i] === '/') {
      close = true;
    }
    if (close && body[i] === '>') {
      shortBody += '>';
      break;
    }
    shortBody += body[i];
  }
  return shortBody;
};
