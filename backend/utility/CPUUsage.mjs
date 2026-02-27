import os from "os";

// added an interval to check the seever cpu and memory usage in deployment
function getCPUUsage() {
    const cpus = os.cpus();

    return cpus.map((cpu, i) => {
        const { user, nice, sys, idle, irq } = cpu.times;
        const total = user + nice + sys + idle + irq;

        return {
            Core: i,
            Usage: ((1 - idle / total) * 100).toFixed(2) + "%",
            Speed: cpu.speed + " MHz",
            Model: cpu.model,
        };
    });
}

// setInterval(() => {
//     // system info
//     const currentOS = {
//         OS: os.type(),
//         Release: os.release(),
//         TotalMemory: (os.totalmem() / 1024 ** 3).toFixed(3) + " GB
//         FreeMemory: (os.freemem() / 1024 ** 3).toFixed(3) + " GB",
//     };
//
//     console.clear();
//
//     console.log("System Info:");
//     console.table([currentOS]); // wrap in array so it's a row
//
//     console.log("CPU Usage Per Core:");
//     console.table(getCPUUsage()); // show each core separately
//
//     console.log(`Server running at ${config.appUrl}\n`.yellow);
// }, 3000);
