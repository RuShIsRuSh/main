const { LadybugFunction } = require("../structures");

module.exports = class extends LadybugFunction {
    constructor(...args) {
        super(...args, {
          aliases: ["randomNumber", "randomNum"]
        });
      }
    run(min, max) {
        if (typeof min !== "number") throw "Minimun value must be a number";
        if (typeof max !== "number") throw "Maximum value must be a number";
        if (min >= max) throw "Minimun must be less than Maximum to determine the range";
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

};
