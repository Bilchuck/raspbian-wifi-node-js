const _ = require("ramda");
const fs = require("fs");
const reconfigWifiSettings = require("./reconfigWifiSettings");

const WIFI_CONFIG_FILE_PATH = `/etc/wpa_supplicant/wpa_supplicant.conf`;

const log = (text, any) => {
    console.log(text);
    return any;
}
const writeConfig = text => fs.writeFileSync(WIFI_CONFIG_FILE_PATH, text);

const buildWifiConfigFile = wifiConfig => `ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=UA

network={
    ssid="${wifiConfig.essid}"
    psk="${wifiConfig.password}"
    key_mgmt="${wifiConfig.encryption}"
}
`;
const connectToWifi = _.compose(
    log("Wifi configuring finished!"),
    reconfigWifiSettings,
    log('reconfiguring wifi settings'),
    writeConfig,
    log('Writing new wifi config to the file'),
    buildWifiConfigFile,
    log("Starting wifi connecting.."),
);

module.exports = connectToWifi;