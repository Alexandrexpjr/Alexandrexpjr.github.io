const getSubmitButton = document.getElementById('submit-button');

getSubmitButton.addEventListener('click', () => {
  const getEmailInput = document.getElementById('email');
  const getPasswordInput = document.getElementById('email-password');
  if (getEmailInput.value === 'tryber@teste.com' && getPasswordInput.value === '123456') {
    return alert('Olá, Tryber!');
  } return alert('Email ou senha inválidos.');
});

const getFinalSubmitButton = document.getElementById('submit-btn');
getFinalSubmitButton.disabled = true;
const getCheckbox = document.getElementById('agreement');

getCheckbox.addEventListener('change', () => {
  // Busca conteúdo do input
  const check = document.getElementById('agreement');

  // Confere o value do input
  if (check.value === 'check') {
  // Habilita o botão
    getFinalSubmitButton.disabled = false;
    check.value = 'role';
  } else {
  // Desabilita o botão
    getFinalSubmitButton.disabled = true;
    check.value = 'check';
  }
});
// Eu e minha dupla consultamos esse site para ajudar na resolução:
// Link: https://cursos.alura.com.br/forum/topico-habitar-desabilitar-botao-65202;

const textarea = document.getElementById('textarea');
textarea.addEventListener('keyup', () => {
  const contador = document.getElementById('counter');
  contador.innerHTML = 500 - textarea.value.length;
});
// Último Requisito
const getDivNomeSobrenome = document.getElementById('div-nome-sobrenome');
const getDivEmail = document.getElementById('div-email');
const getDivHouse = document.getElementById('div-house');
const getDivFamily = document.getElementById('div-family');
const getDivConteudo = document.getElementById('div-conteudo');
const getDivRate = document.getElementById('div-rate');
const getDivTextArea = document.getElementById('div-textarea');

const getInputNome = document.getElementById('input-name');
const getInputSobrenome = document.getElementById('input-lastname');
const getInputEmail = document.getElementById('input-email');
const getSelectHouse = document.getElementById('house');
const getLabelFamily = document.getElementsByName('family');
const getLabelConteudo = document.getElementsByName('label-content');
const getLabelRate = document.getElementsByName('rate');
const getTextArea = document.getElementById('textarea');

function family() {
  for (let index = 0; index < getLabelFamily.length; index += 1) {
    const input = getLabelFamily[index];
    if (input.checked === true) {
      getDivFamily.innerHTML = `Família: ${input.value}`;
    }
  }
}

function content() {
  const arr = [];
  for (let index = 0; index < getLabelConteudo.length; index += 1) {
    const input = getLabelConteudo[index];
    if (input.checked === true) {
      arr.push(input.value);
    }
  }
  const strings = arr.join(', ');
  getDivConteudo.innerHTML = `Matérias: ${strings}`;
}

function rate() {
  for (let index = 0; index < getLabelRate.length; index += 1) {
    const input = getLabelRate[index];
    if (input.checked === true) {
      getDivRate.innerHTML = `Avaliação: ${input.value}`;
    }
  }
}

function getInfo(event) {
  event.preventDefault();
  getDivNomeSobrenome.innerHTML = `Nome: ${getInputNome.value} ${getInputSobrenome.value}`;
  getDivEmail.innerHTML = `Email: ${getInputEmail.value}`;
  getDivHouse.innerHTML = `&nbsp Casa: ${getSelectHouse.value}`;
  family();
  content();
  rate();
  getDivTextArea.innerHTML = `Observações: ${getTextArea.value}`;
}

document.getElementById('evaluation-form').addEventListener('submit', getInfo);
