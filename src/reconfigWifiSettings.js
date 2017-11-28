const cmd = require("node-cmd");

const reconfigWifiSettings = () => {
    console.log(`Reconfiguring wifi..`);
    cmd.get("wpa_cli -i wlan0 reconfigure", (err, str) => {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(`Reconfigured!`)
    });
};

module.exports = reconfigWifiSettings;