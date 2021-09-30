function randomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomColor() {
  return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
}

function checkAnswer({ target }) {
  resetSelected();
  const score = document.querySelector('#score');
  const instruction = document.getElementById('answer');
  target.classList.add('selected');
  if (target.id === 'correct') {
    instruction.innerText = 'Acertou! Novas cores!';
    placar += 3;
  } else {
    instruction.innerText = 'Errou! Tente novamente';
    placar -= 1;
  }
  score.innerText = `Placar: ${placar}`;
}

function generateColors() {
  const correct = document.querySelector('#correct');
  if (correct) { correct.id = ''; }
  const instruction = document.getElementById('answer');
  instruction.innerText = 'Escolha uma cor';

  const getBalls = document.getElementsByClassName('ball');
  const balls = Array.from(getBalls);

  balls[randomNumber(5)].id = 'correct';
}

function chooseCorrect() {
  const getSpan = document.getElementById('rgb-color');
  const getBalls = document.getElementsByClassName('ball');
  const balls = Array.from(getBalls);
  const correct = document.getElementById('correct');

  balls.forEach((ball) => {
    ball.style.backgroundColor = randomColor();
    ball.addEventListener('click', checkAnswer);
  });

  getSpan.innerText = correct.style.backgroundColor;
}

generateColors();
chooseCorrect();
let placar = 0;

function resetSelected() {
  const selected = document.querySelector('.selected');
  if (selected) { selected.classList.remove('selected'); }
}

const reset = document.getElementById('reset-game');
reset.addEventListener('click', () => {
  resetSelected();
  generateColors();
  chooseCorrect();
});

function bot() {
  const resetButton = document.getElementById('reset-game');

  setInterval(function() {
    const color = document.getElementById('rgb-color').innerText;

    Array.from(document.getElementsByClassName('ball')).forEach((el) => {
      if (el.style.backgroundColor == color) {
        el.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));

        setTimeout(() => {
          resetButton.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          }));
        }, 300)
        return true;
      }
    });
  }, 600);
}