const { fullNetworkMap } = require("./networks");

module.exports = function networks() {
  const ruleObj = {};

  Object.entries(fullNetworkMap).forEach(([name, network]) => {
    ruleObj[`.shareon > *.${name}`] = {
      "background-color": network.color,
    };

    ruleObj[`.shareon > *.${name}::before`] = {
      "background-image": `url('${network.icon}')`,
    };

    if (Object.prototype.hasOwnProperty.call(network, "iconWhenText")) {
      ruleObj[`.shareon > *.${name}:not(:empty)::before`] = {
        "background-image": `url('${network.iconWhenText}')`,
      };
    }
  });

  return ruleObj;
};
