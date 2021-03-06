import $ from 'jquery';
import {
  getInput,
  getButton,
  getFeeds,
  getArticles,
  getFeedsContainer,
  getFeedbackElem,
} from './renderUtils';

const removeFeedbackElem = () => {
  const feedback = getFeedbackElem();
  if (feedback) {
    feedback.remove();
  }
};

export const renderNotValidInput = () => {
  getInput().classList.add('is-invalid');
  removeFeedbackElem();
};

export const renderDuplicateError = () => {
  const input = getInput();
  input.classList.add('is-invalid');
  removeFeedbackElem();
  const elem = document.createElement('small');
  elem.append(document.createTextNode('You are already have this feed.'));
  elem.classList.add('form-text', 'text-muted', 'text-left');
  elem.id = 'feedbackElement';
  input.parentNode.insertBefore(elem, input.nextSibling);
};

export const renderWaiting = () => {
  const input = getInput();
  const button = getButton();
  input.setAttribute('disabled', true);
  button.setAttribute('disabled', true);
  input.classList.remove('is-invalid');
  removeFeedbackElem();
  const elem = document.createElement('small');
  elem.append(document.createTextNode('Loading... Please wait.'));
  elem.classList.add('form-text', 'text-muted', 'text-left');
  elem.id = 'feedbackElement';
  input.parentNode.insertBefore(elem, input.nextSibling);
};

export const renderIsValid = () => {
  getInput().classList.remove('is-invalid');
};

export const renderErrorFeedback = () => {
  const input = getInput();
  const button = getButton();
  input.removeAttribute('disabled', true);
  button.removeAttribute('disabled', true);
  input.classList.add('is-invalid');
  removeFeedbackElem();
  const elem = document.createElement('small');
  elem.append(document.createTextNode('Loading error.'));
  elem.classList.add('form-text', 'text-muted', 'text-left');
  elem.id = 'feedbackElement';
  input.parentNode.insertBefore(elem, input.nextSibling);
};

export const renderClean = () => {
  removeFeedbackElem();
  const input = getInput();
  const button = getButton();
  input.classList.remove('is-invalid');
  input.removeAttribute('disabled');
  input.value = '';
  button.removeAttribute('disabled');
};


export const renderNewFeed = ({ title, description }) => {
  getFeedsContainer().classList.remove('d-none');
  const feeds = getFeeds();
  const elem = document.createElement('div');
  const html = `<h4>${title}</h4><p>${description}</p>`;
  elem.innerHTML = html;
  feeds.append(elem);
};

export const renderNewArticle = ({ title, link, description }) => {
  getFeedsContainer().classList.remove('d-none');
  const articles = getArticles();
  const { firstChild } = articles;
  const modalBody = document.getElementById('modalBody');

  const row = document.createElement('div');
  row.classList.add('row', 'mt-3');

  const firstCol = document.createElement('div');
  firstCol.classList.add('col-lg-8');

  const a = document.createElement('a');
  a.setAttribute('href', link);

  const span = document.createElement('span');
  span.append(document.createTextNode(title));

  const secondCol = document.createElement('div');
  secondCol.classList.add('col-lg-4');

  const button = document.createElement('button');
  button.append(document.createTextNode('Description'));
  button.classList.add('btn', 'btn-primary', 'btn-sm');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#myModal');
  button.setAttribute('type', 'button');
  button.addEventListener('click', (ev) => {
    ev.preventDefault();
    modalBody.append(document.createTextNode(description));
    $('#myModal').modal('show');
  });
  a.append(span);
  firstCol.append(a);
  secondCol.append(button);
  row.append(firstCol, secondCol);
  articles.insertBefore(row, firstChild);
};
