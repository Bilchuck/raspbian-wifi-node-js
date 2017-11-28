const _ = require("ramda");

const isCeail = el => el.includes("Cell");
const isEssid = str => str.includes("ESSID");
const isWpa = arr => arr.some(str => str.includes("WPA"));

const byCeils = (acc, row) => isCeail(row) ? [...acc, []] : _.over(_.lensIndex(-1), arr => [...arr, row], acc);

const parseEssidLine = line => line.replace(/"/gi, "").replace(/ESSID:/gi, "").trim();

const buildWifiDTO = lines => ({
    essid: _.compose(parseEssidLine, _.head, _.filter(isEssid))(lines),
    encryption: isWpa(lines) ? "WPA-PSK" : "NONE",
});

const parseIwlistOutput = _.compose(
    _.map(buildWifiDTO),
    _.reduce(byCeils, []),
    _.tail,
    _.filter(_.length),
    _.split("\n"),
);

module.exports = parseIwlistOutput;
