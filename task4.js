const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
let numberOfLines = null;
let arrayofNumbersOfApixesAndCompanies;

rl.on('line', function (line) {
  if (numberOfLines === null) {
    arrayofNumbersOfApixesAndCompanies = line.split(' ');
    numberOfLines = arrayofNumbersOfApixesAndCompanies.reduce(
      (sum, number) => sum + Number(number),
      0
    );
    return;
  }

  lines.push(line);
  if (lines.length == numberOfLines) {
    rl.close();
  }
});

function parseInput(lines) {
  let arrayOfCompanies = [];
  for (let i = 0; i < arrayofNumbersOfApixesAndCompanies[1]; i++) {
    arrayOfCompanies.push(lines[i]);
  }
  let arrayOfApixes = [];
  for (let i = arrayofNumbersOfApixesAndCompanies[1]; i < numberOfLines; i++) {
    let arrFromLine = lines[i].split(' ');
    arrayOfApixes.push(arrFromLine);
  }
  return {
    arrayOfCompanies,
    arrayOfApixes,
  };
}

function findMinSumOfMoney(arrayOfCompanies, arrayOfApixes) {
  let arrayOfCheckedNumberOfParent = [];
  let minSum;
  let sum = 0;
  outer: for (let i = 0; i < arrayOfApixes.length; i++) {
    if (
      arrayOfCheckedNumberOfParent.length == 0 ||
      !arrayOfCheckedNumberOfParent.find((item) => item == arrayOfApixes[i][0])
    ) {
      let numberOfParent = arrayOfApixes[i][0];
      let underTree = arrayOfApixes.reduce(function (array, apix) {
        if (apix[0] === numberOfParent) return array.concat([apix]);
        return array;
      }, []);
      for (let i = 0; i < arrayOfCompanies.length; i++) {
        if (
          underTree.length < 2 ||
          !underTree.find((item) => item[2] == arrayOfCompanies[i])
        ) {
          arrayOfCheckedNumberOfParent.push(numberOfParent);
          sum = 0;
          continue outer;
        }
        let currentSum;
        sum += Number(
          underTree.reduce(function (sum, apix) {
            if (currentSum == undefined) return (currentSum = apix[1]);
            if (apix[2] == arrayOfCompanies[i] && currentSum > apix[1])
              sum = apix[1];
            return sum;
          }, 0)
        );
      }
      arrayOfCheckedNumberOfParent.push(numberOfParent);
      if (minSum == undefined) minSum = sum;
      if (minSum > sum) minSum = sum;
      sum = 0;
    }
  }
  return minSum == undefined ? -1 : minSum;
}

rl.on('close', function () {
  const { arrayOfCompanies, arrayOfApixes } = parseInput(lines);
  console.log(findMinSumOfMoney(arrayOfCompanies, arrayOfApixes));
});
