import isURL from 'validator/lib/isURL';

export const formStates = Object.freeze({
  clean: 'clean',
  linkIsValid: 'isValid',
  linkNotValid: 'notValid',
  duplicate: 'duplicate',
  waiting: 'waiting',
});

const isLinkExist = (url, state) => {
  const links = new Set(state.feedsList.map(({ link }) => link));
  return links.has(url);
};

export const getNewState = (inputData, state) => {
  const newState = { newFeedUrl: inputData };
  if (!inputData) {
    newState.formState = formStates.clean;
    return newState;
  }
  if (isURL(inputData)) {
    newState.formState = isLinkExist(inputData, state)
      ? formStates.duplicate : formStates.linkIsValid;
  } else {
    newState.formState = formStates.linkNotValid;
  }
  return newState;
};
