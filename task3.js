function calculateMoneyLeftMax(numberOfGifts, maxSumOfMoney, giftPrices) {
    let moneyLeftMax = 0;
    for (let i = 1; i <= maxSumOfMoney; i++) {
        let moneyLeft = i;
        for (let j = 0; j <= giftPrices.length; j++) {
            if (moneyLeft >= giftPrices[j]) {
                moneyLeft -= giftPrices[j];
            }
        }
        moneyLeftMax = Math.max(moneyLeft, moneyLeftMax);
    }
    return moneyLeftMax;
}

const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on("line", function (line) {
    lines.push(line);

    if (lines.length === 2) {
        rl.close();
    }
});

function parseInput(lines) {
    const [numberOfGifts, maxSumOfMoney] = lines[0].split(" ").map(numberStr => Number(numberStr));
    const giftPrices = lines[1].split(" ").map(numberStr => Number(numberStr));

    return {
        numberOfGifts,
        maxSumOfMoney,
        giftPrices,
    };
}

rl.on("close", function() {
    const {
        numberOfGifts,
        maxSumOfMoney,
        giftPrices,
    } = parseInput(lines);

    console.log(calculateMoneyLeftMax(numberOfGifts, maxSumOfMoney, giftPrices))
});
