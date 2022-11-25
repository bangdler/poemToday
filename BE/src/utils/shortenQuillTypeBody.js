export const shortenQuillTypeBody = quillBody => {
  let shortBody = quillBody.slice(0, 200);
  let close = false;
  for (let i = 200; i < quillBody.length; i++) {
    if (quillBody[i] === '/') {
      close = true;
    }
    if (close && quillBody[i] === '>') {
      shortBody += '>';
      break;
    }
    shortBody += quillBody[i];
  }
  return shortBody;
};
