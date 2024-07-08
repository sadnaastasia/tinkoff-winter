const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
let numberOfLines = null;
let arrayofNumbersOfChildrenPairsAndEvents;

rl.on('line', function (line) {
  if (numberOfLines === null) {
    arrayofNumbersOfChildrenPairsAndEvents = line.split(' ');
    numberOfLines =
      Number(arrayofNumbersOfChildrenPairsAndEvents[1]) +
      Number(arrayofNumbersOfChildrenPairsAndEvents[2]) +
      1;
    return;
  }

  lines.push(line);
  if (lines.length == numberOfLines) {
    rl.close();
  }
});

function parseInput(lines) {
  let arrayOfNumbersOfCountedManules = lines[0].split(' ');
  let arrayOfPairsOfFriends = [];
  for (
    let i = 1;
    i < Number(arrayofNumbersOfChildrenPairsAndEvents[1]) + 1;
    i++
  ) {
    let arrayFromLine = lines[i].split(' ');
    arrayOfPairsOfFriends.push(arrayFromLine);
  }
  let arrayOfEvents = [];
  for (
    let j = Number(arrayofNumbersOfChildrenPairsAndEvents[1]) + 1;
    j <
    Number(arrayofNumbersOfChildrenPairsAndEvents[2]) +
      Number(arrayofNumbersOfChildrenPairsAndEvents[1]) +
      1;
    j++
  ) {
    let arrayFromLine = lines[j].split(' ');
    arrayOfEvents.push(arrayFromLine);
  }
  console.log(`${arrayOfNumbersOfCountedManules}`);
  console.log(`${arrayOfPairsOfFriends}`);
  console.log(`${arrayOfEvents}`);
  return {
    arrayOfNumbersOfCountedManules,
    arrayOfPairsOfFriends,
    arrayOfEvents,
  };
}

function countTheNumberOfManules(
  arrayOfNumbersOfCountedManules,
  arrayOfPairsOfFriends,
  arrayOfEvents
) {
  let arrayOfAnswers = [];
  for (let i = 0; i < arrayOfEvents.length; i++) {
    if (arrayOfEvents[i][0] == '+') {
      let arrayOfPairsOfFriendsFiltered = arrayOfPairsOfFriends.filter((pair) =>
        pair.find((item) => Number(item) == Number(arrayOfEvents[i][1]))
      );
      let arrayOfFriends = arrayOfPairsOfFriendsFiltered.map((pair) =>
        pair.find((item) => Number(item) != Number(arrayOfEvents[i][1]))
      );
      for (let j = 0; j < arrayOfFriends.length; j++) {
        arrayOfNumbersOfCountedManules[Number(arrayOfFriends[j]) - 1] =
          Number(
            arrayOfNumbersOfCountedManules[Number(arrayOfFriends[j]) - 1]
          ) + Number(arrayOfEvents[i][2]);
      }
    }
    if (arrayOfEvents[i][0] == '?') {
      arrayOfAnswers.push(
        Number(arrayOfNumbersOfCountedManules[Number(arrayOfEvents[i][1]) - 1])
      );
    }
  }
  return arrayOfAnswers;
}

rl.on('close', function () {
  const {
    arrayOfNumbersOfCountedManules,
    arrayOfPairsOfFriends,
    arrayOfEvents,
  } = parseInput(lines);
  countTheNumberOfManules(
    arrayOfNumbersOfCountedManules,
    arrayOfPairsOfFriends,
    arrayOfEvents
  ).map((item) => console.log(item));
});
