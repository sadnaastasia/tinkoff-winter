function canEstablishContacts(n, arr) {
    let sumOfContacts = arr.reduce((sum, current) => sum + current, 0);
    return sumOfContacts >= 2 * n - 2;
}

const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let numberOfTasks;
let lines = [];

rl.on("line", function (line) {
    if (!numberOfTasks) {
        numberOfTasks = Number(line);
        return;
    }

    lines.push(line);

    if (lines.length === numberOfTasks * 2) {
        rl.close();
    }
});

function parseInput(lines) {
    const result = [];

    for (let i = 0; i < numberOfTasks; ++i) {
        const n = Number(lines[2*i]);
        const socialThresholds = lines[2*i+1].split(" ").map(numberStr => Number(numberStr));

        result.push([n, socialThresholds]);
    }

    return result;
}

rl.on("close", function() {
    const tasks = parseInput(lines);

    tasks.forEach(([n, socialThresholds]) => {
        if (canEstablishContacts(n, socialThresholds)) {
            console.log("Yes");
        } else {
            console.log("No");
        }
    })
});
