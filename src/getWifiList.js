const cmd = require("node-cmd");
const parseIwlistOutput = require("./parseIwlistOutput");

const getWifiList = () => new Promise((resolve, reject) => {
    console.log("Start getting wifi list..");
    cmd.get("iwlist wlan0 scan", (cmdError, buffer) => {
        if (cmdError) {
            console.error(cmdError);
            reject(err);
        } else {
            console.log("Successfully got wifi list!");
            try {
                console.log("Start parsing wifi list..");
                const wifiList = parseIwlistOutput(buffer);
                resolve(wifiList);
            } catch (parseError) {
                console.error("Can't parse wifi list");
                reject(parseError);
            }
        }
    });
});

module.exports = getWifiList;