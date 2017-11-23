const _ = require("ramda");

const parseIwlistOutput = output => _.compose(
    _.map(buildWifiDTO),
    _.reduce(byCeils),
    _.tail,
    _.filter(length),
    _.split("\n"),
)
const isCeail = rl => el.includes("Cell");
const byCeils = (acc, row) => isCeail(row) ? [...acc, []] : _.over(_.last, _.push(row), acc);

const buildWifiDTO = lines => ({
    essid: _.compose(parseEssidLine, first, filter(isEssid))(lines),
    encryption: isWpa(lines) ? "WPA-PSK" : "NONE",
});

const parseEssidLine = line => line.replace(/"/gi, "").replace(/ESSID:/gi, "").trim();

module.exports = parseIwlistOutput;
