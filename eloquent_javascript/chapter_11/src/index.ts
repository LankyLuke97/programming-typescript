console.log("Chapter 11, Exercise 1: Quiet Times");

/*
 *
 * This was my attempt. It's definitely working and processes all in parallel.
 * However, it loads everything into memory at once, which could be a problem, 
 * and the whole thing fails as soon as one file fails.
 * It's also a lot of chaining, which could be hard to maintain.
async function activityTable(day: number) {
    let logFileList = await textFile("camera_logs.txt");
    let table = new Array(24).fill(0);
    let dates = (await Promise.all(logFileList.split(/\r?\n/).map(async filename => {
        let res = (await textFile(filename)).split(/\r?\n/)
          .map(timestamp => new Date(Number(timestamp)))
        return res;
      }))).reduce((a,b) => a.concat(b)).filter(date => date.getDay() == day);
    for (let date of dates) table[date.getHours()]++;
    return table;
}
*/

// textFile is a function built into the examples, so this won't compile for TS locally
async function activityTable(day: number) {
    let table: number[] = new Array(24).fill(0);

    let logFileList = await textFile("camera_logs.txt");
    for (let filename of logFileList.split("\n")) {
        let log = await textFile(filename);
        for (let timestamp of log.split("\n")) {
            let date = new Date(Number(timestamp));
            if (date && date.getDay() == day) {
                let hour = date.getHours();
                if (hour !== undefined && hour !== null) table[hour]++;
            }
        }
    }

    return table;
}

console.log("Chapter 11, Exercise 2: Real Promises");

function activityTable(day: number) {
    let table = new Array(24).fill(0);
    return textFile("camera_logs.txt").then(files => {
        return Promise.all(files.split(/\r?\n/).map(log => {
            return textFile(log).then(lines => {
                let dates = lines.split(/\r?\n/).map(line => new Date(Number(line))).filter(date => date.getDay() == day);
                for (let date of dates) table[date.getHours()]++;
            });
        }));
    }).then(() => table);
}
