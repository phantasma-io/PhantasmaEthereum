var Phantasma = artifacts.require("Phantasma");
var PhantasmaEnergy = artifacts.require("PhantasmaEnergy");
module.exports = function(deployer) {
    deployer.deploy(Phantasma);
	deployer.deploy(PhantasmaEnergy);
    // Additional contracts can be deployed here
};