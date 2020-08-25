var Mankini = artifacts.require("Mankini");
module.exports = function(deployer) {
    //deployer.deploy(Phantasma);
	//deployer.deploy(Phantasma).then( ()=> deployer.deploy(mankini) );
	// get the owner address
	//tried some stuff here from a blog
	// const accounts = await web3.eth.getAccounts();
	// const owner = accounts[0];
	
	// deploy the second, with address parameter
	//deployer.deploy(PhantasmaEnergy, owner);
	
	
	
	deployer.deploy(Mankini);
    // Additional contracts can be deployed here
};