function valiadatePren(value) {
  let stringLength = value.length;

  let totalOpen = 0;
  let totalClose = 0;
  for (let i = 0; i < stringLength; i++) {
    if (value[i] == '(') {
        totalOpen += 1;  
    } else if (value[i] == ')') {
      totalClose += 1;
    }
  }

  return totalOpen === totalClose;
}

function validatePrenWithMatch(value) {
  return value.match(/\(/g).length === value.match(/\)/g).length;
}

// valid
let validPren = '(((X)) (((Y))))';
console.log(valiadatePren(validPren));
console.log(validatePrenWithMatch(validPren));

// invalid
let invalidPren = '(((X)) (((Y))';
console.log(valiadatePren(invalidPren));
console.log(validatePrenWithMatch(invalidPren));
