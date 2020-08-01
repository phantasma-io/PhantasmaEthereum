var Phantasma = artifacts.require("Phantasma");
module.exports = function(deployer) {
    deployer.deploy(Phantasma);
	deployer.deploy(PhantasmaEnergy);
    // Additional contracts can be deployed here
};