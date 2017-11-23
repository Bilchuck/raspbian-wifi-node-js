const cmd = require("node-cmd");

cmd.get("wpa_cli -i wlan0 reconfigure", (err, str) => {
    if (err) {
        throw err;
    }
});