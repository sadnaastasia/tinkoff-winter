const sortedRequiredLettersStr = ["T", "I", "N", "K", "O", "F", "F"].sort().join("");
function checkIfPhraseCanBeBuilt(str) {
    const sortedLettersStr = str.split("").sort().join("");
    return sortedLettersStr === sortedRequiredLettersStr;
}

const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = [];
let numberOfLines = null;

rl.on("line", function (line) {
    if (numberOfLines === null) {
        numberOfLines = Number(line);
        return;
    }

    lines.push(line);
    if (lines.length == numberOfLines) {
        rl.close();
    }
});

rl.on("close", function() {
    for (let i = 0; i < lines.length; i++) {
        if (checkIfPhraseCanBeBuilt(lines[i])) {
            console.log("Yes");
        } else {
            console.log("No");
        }
    }
});
