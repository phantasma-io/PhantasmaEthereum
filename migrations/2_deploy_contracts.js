var Phantasma = artifacts.require("Phantasma");
module.exports = function(deployer) {
    deployer.deploy(Phantasma);
    // Additional contracts can be deployed here
};