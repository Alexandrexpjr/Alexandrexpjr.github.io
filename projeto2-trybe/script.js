// Desafio 1

const getChallenge1 = document.getElementById('secondBoolean');
const getChallenge2 = document.getElementById('calc');
const getChallenge3 = document.getElementById('split');
const getChallenge4 = document.getElementById('concat');
const getChallenge5 = document.getElementById('points');
const getChallenge6 = document.getElementById('many');
const getChallenge7 = document.getElementById('hunt');
const getChallenge8 = document.getElementById('fizzbuzz');
const getChallenge9e = document.getElementById('encode');
const getChallenge9d = document.getElementById('decode');


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
 const base = document.getElementById('base').value;
 const height = document.getElementById('height').value; 
 const area = (base * height / 2);
  document.querySelector('#resultado2').innerHTML = "A área do triângulo é: " + area + " m²";
});

// Desafio 3
getChallenge3.addEventListener('click', () => {
 let arr = [];
 let word = '';
 const phrase = document.getElementById('phrase').value;
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
getChallenge4.addEventListener('click', () => {
  let arrayDeStrings = document.getElementById('name').value;
  let splitedArray = arrayDeStrings.split(" ");
  if (arrayDeStrings === 'Isabella Cristina Freitas Silva de Andrade') {
    alert('Amor da minha viiii');
  }
  document.querySelector('#resultado4').innerHTML = "Após uma citação, seu nome ficaria: " + splitedArray[splitedArray.length - 1] + ', ' + splitedArray[0];
})

// Desafio 5
const getWins = document.getElementById('wins');
const getTies = document.getElementById('ties');

getChallenge5.addEventListener('click', () => {
  const numberWins = parseInt(getWins.value);
  const numberTies = parseInt(getTies.value);
  const score = 3*numberWins + numberTies;
  document.querySelector('#resultado5').innerHTML = `${score} Pontos`;
});

// Desafio 6
const numbers = document.getElementById('numbers');

getChallenge6.addEventListener('click', () => {
  let numberOfApparitions = 0;
  const arrayNumb = numbers.value.split(' ');
  let higherNumber = parseInt(arrayNumb[0]);
  for (let index = 0; index < arrayNumb.length; index += 1) {
    let actualNumber = arrayNumb[index];
    if (actualNumber > higherNumber) {
      higherNumber = actualNumber;
    }       
  }
  for (let index = 0; index < arrayNumb.length; index += 1) {
    if (numbers.value[index] === higherNumber) {
      numberOfApparitions += 1;
    }
  }
  document.querySelector('#resultado6').innerHTML = `O maior número é o ${higherNumber} e ele aparece ${numberOfApparitions} vezes`;
})

// Desafio 7

const cat1 = document.getElementById('cat1');
const cat2 = document.getElementById('cat2');
const mouse = document.getElementById('mouse');

getChallenge7.addEventListener('click', () => {
  let distanceCat1 = Math.abs(mouse.value - cat1.value);
  let distanceCat2 = Math.abs(mouse.value - cat2.value);
  let hunt = '';
  if (distanceCat1 > distanceCat2) {
    hunt = 'O segundo gato chega primeiro';
  } else if (distanceCat1 < distanceCat2) {
    hunt = 'O primeiro gato chega primeiro';
  } else {
    hunt = 'Os gatos trombam e o rato foge';
  }
  document.querySelector('#resultado7').innerHTML = hunt;
})


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

const numbersFizz = document.getElementById('array');

getChallenge8.addEventListener('click', () => {
  let result = [];
  const numbersArray = numbersFizz.value.split(',');
  console.log(numbersArray);
  for (let index = 0; index < numbersArray.length; index += 1) {
   
    const actualNumber = parseInt(numbersArray[index], 10);
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
  document.querySelector('#resultado8').innerHTML = result;
})

// Desafio 9

const phrase = document.getElementById('message');

getChallenge9e.addEventListener('click', () => {
  let encodedPhrase = '';
  for (let index = 0; index < phrase.value.length; index += 1) {
    let character = phrase.value[index];
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
  document.querySelector('#resultado9').innerHTML = encodedPhrase;
})

getChallenge9d.addEventListener('click', () => {
  let decodedPhrase = '';
  for (let index = 0; index < phrase.value.length; index += 1) {
    let character = phrase.value[index];
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
  document.querySelector('#resultado9').innerHTML = decodedPhrase;
})

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