// Desafio 1

const getChallenge1 = document.getElementById('secondBoolean');
const getChallenge2 = document.getElementById('calc');
const getChallenge3 = document.getElementById('split');

getChallenge1.addEventListener('change', () => {
  const firstEntry = document.getElementById('firstBoolean');
  const secondEntry = document.getElementById('secondBoolean');
  if (firstEntry.value === 'true' && secondEntry.value === 'true') {
    document.querySelector('#resultado1').innerHTML = "True";
  } else {
    document.querySelector('#resultado1').innerHTML = "False";
  }
});

// Desafio 2
getChallenge2.addEventListener('click', () => {
  let base = document.getElementById('base').value;
  let height = document.getElementById('height').value; 
  let area = (base * height / 2);
  document.querySelector('#resultado2').innerHTML = "A área do triângulo é: " + area + " m²";
});

// Desafio 3
getChallenge3.addEventListener('click', () => {
  let arr = [];
  let word = '';
  let phrase = document.getElementById('phrase').value;
  for (let index = 0; index < phrase.length; index += 1) {
    let character = phrase[index];
    if (character === ' ') {
      arr.push(' ' + word);
      word = '';
    } else if (index === phrase.length - 1) {
      word += character;
      arr.push(' ' + word);
    } else {
      word += character;
    }
  } 
  document.querySelector('#resultado3').innerHTML = arr;
})

// Desafio 4
function concatName() {
  let arrayDeStrings = prompt("Insira seu nome completo", "Harry Potter");
  let splitedArray = arrayDeStrings.split(" ");
  document.querySelector('.fourth-challenge').innerHTML = "Após uma citação, seu nome ficaria: " + splitedArray[splitedArray.length - 1] + ', ' + splitedArray[0];
}

// Desafio 5
function footballPoints(vitorias, empates) {
  return 3*vitorias + empates;
}

console.log(footballPoints(13,1));

// Desafio 6
function highestCount(numbers) {
  let numberOfApparitions = 0;
  let higherNumber = numbers[0];
  for (let index = 0; index < numbers.length; index += 1) {
    let actualNumber = numbers[index];
    if (actualNumber > higherNumber) {
      higherNumber = actualNumber;
    }       
  }
  for (let index = 0; index < numbers.length; index += 1) {
    if (numbers[index] === higherNumber) {
      numberOfApparitions += 1;
    }
  }
  return numberOfApparitions;
}

console.log(highestCount([1, 9, 2, 3, 9, 5, 7]));

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distanceCat1 = Math.abs(mouse - cat1);
  let distanceCat2 = Math.abs(mouse - cat2);
  if (distanceCat1 > distanceCat2) {
    return 'cat2';
  } else if (distanceCat1 < distanceCat2) {
    return 'cat1';
  } else {
    return 'os gatos trombam e o rato foge';
  }
}

console.log(catAndMouse(10,4,3));

// Desafio 8
// function fizzBuzz(numbersFizz) {
//   let result = [];
//   for (let index = 0; index < numbersFizz.length; index += 1) {
//     let actualNumber = numbersFizz[index];
//     if (actualNumber % 3 === 0 && actualNumber % 5 !== 0) {
//       result.push('fizz');
//     } else if (actualNumber % 3 !== 0 && actualNumber % 5 === 0) {
//       result.push('buzz');
//     } else if (actualNumber % 3 === 0 && actualNumber % 5 === 0) {
//       result.push('fizzBuzz');
//     } else {
//       result.push('bug!');
//     }
//   }
//   return result
// }

function fizzBuzz(numbersFizz) {
  let result = [];
  for (let index = 0; index < numbersFizz.length; index += 1) {
    const actualNumber = numbersFizz[index];
    let dividedBy3 = actualNumber % 3 === 0;
    let dividedBy5 = actualNumber % 5 === 0;
    if (dividedBy3 && dividedBy5) {
      result.push('fizzBuzz');
    } else if (dividedBy3) {
      result.push('fizz');
    } else if (dividedBy5) {
      result.push('buzz');
    } else {
      result.push('bug!');
    }
  }
  return result;
}

console.log(fizzBuzz([2, 15, 7, 9, 45])); 

// Desafio 9
function encode(phrase) {
  let encodedPhrase = '';
  for (let index = 0; index < phrase.length; index += 1) {
    let character = phrase[index];
    switch (character) {
      case 'a':
        encodedPhrase += '1';
        break;
      case 'e': 
        encodedPhrase += '2';
        break;
      case 'i':
        encodedPhrase += '3';
        break;
      case 'o':
        encodedPhrase += '4';
        break;
      case 'u':
        encodedPhrase += '5';
        break;
      default:
        encodedPhrase += character;       
    } 
  }
  return encodedPhrase;
}

console.log(encode('hi there'));

function decode(encodedPhrase) {
  let decodedPhrase = '';
  for (let index = 0; index < encodedPhrase.length; index += 1) {
    let character = encodedPhrase[index];
    switch (character) {
      case '1':
        decodedPhrase += 'a';
        break;
      case '2': 
        decodedPhrase += 'e';
        break;
      case '3':
        decodedPhrase += 'i';
        break;
      case '4':
        decodedPhrase += 'o';
        break;
      case '5':
        decodedPhrase += 'u';
        break;
      default:
        decodedPhrase += character;       
    } 
  }
  return decodedPhrase;
}

console.log(decode('h3 th2r2!'));

// Desafio 10
function techList(tech, name) {
  if (tech.length === 0) {
    return 'Vazio!';
  }
  const sortedTech = tech.sort();
  let tecArray = [];
  for (let index = 0; index < sortedTech.length; index += 1) {
    tecArray.push({
      tech: sortedTech[index],
      name: name,
    });
  }
  return tecArray;
}

console.log (techList(["React", "Jest", "HTML", "CSS", "JavaScript"], "Lucas"));

// Desafio 11

function generatePhoneNumber(phoneNumber) {
  if (phoneNumber.length !== 11) {
    return 'Array com tamanho incorreto.'
  }
  let counter = {};
  let phone = '(';
  
  for (let index = 0; index < phoneNumber.length; index += 1) {
    let digit = phoneNumber[index];
    if (counter[digit]) {
      counter[digit] += 1;
    } else {
      counter[digit] = 1;
    }
    if (digit < 0 || digit > 9 || counter[digit] > 2) {
      return 'não é possível gerar um número de telefone com esses valores'
    }
    if (index === 1) {
      phone += digit;
      phone += ') ';
    } else if (index === 6) {
      phone += digit;
      phone += '-';
    } else {
      phone += digit;
    }
  }
  return phone;   
}

console.log(generatePhoneNumber([3, 2, 1, 8, 3, 5, 2, 1, 9, 4, 4]));

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  const sumAB = lineA + lineB > lineC;
  const sumAC = lineA + lineC > lineB;
  const sumBC = lineB + lineC > lineA;
  const difAB = Math.abs(lineA - lineB) < lineC;
  const difAC = Math.abs(lineA - lineC) < lineB;
  const difBC = Math.abs(lineB - lineC) < lineA;
  const arrayCheck = [sumAB, sumAC, sumBC, difAB, difAC, difBC];
  for (let i = 0; i < arrayCheck.length; i += 1) {
    if (arrayCheck[i] === false) {
      return false;
    }
  }
  return true;
}
console.log(triangleCheck(1,2,4));

// Desafio 13
//ideia retirada do stackOverflow, à partir do link https://stackoverflow.com/questions/30607419/return-only-numbers-from-string;
function hydrate(alcohol) {
  let alcoholString = alcohol.replace(/\D/g, ''); 
  //aqui, o \D serve para selecionar os dígitos não numéricos;
  //o 'g' ao fim da expressão significa global e serve para pegar todos os matches e não somente o primeiro.
  //"" mostra que quero substituir os dígitos por 'nada', então essa variável me retorna os números contidos na string
  let waterCups = 0;
  let arrayNumbers = [];
  for (let i = 0; i < alcoholString.length; i += 1) {
    arrayNumbers.push(Number(alcoholString.substr(i, 1)));
    waterCups += arrayNumbers[i];
  }
  // alternativas na escrita ensinadas por um amigo
  // return (waterCups === 1) ? waterCups + ' copo de água' : waterCups + ' copos de água';
  // return waterCups + (waterCups === 1 ? ' copo' : ' copos') + ' de água';
  if (waterCups === 1) return waterCups + ' copo de água';
  return waterCups + ' copos de água';
}

console.log(hydrate('1 cachaça, 5 cervejas e 1 copo de vinho'));