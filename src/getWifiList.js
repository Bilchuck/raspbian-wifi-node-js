const cmd = require("node-cmd");
const parseIwlistOutput = require("./parseIwlistOutput");

const getWifiList = () => new Promise((resolve, reject) => {
    console.log("Start getting wifi list..");
    cmd.get("iwlist wlan0 scan", (err, buffer) => {
        if (cmdError) {
            reject(err);
        } else {
            console.log("Successfully got wifi list!");
            try {
                console.log("Start parsing wifi list..");
                const wifiList = parseWifiOutput(buffer);
            } catch (parseError) {
                console.error("Can't parse wifi list");
                reject(parseError);
            }
            resolve();
        }
    });
});

module.exports = getWifiList;