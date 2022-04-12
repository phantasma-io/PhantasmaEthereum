// migrations/2_deploy_token.js
const {
  BN,           // Big Number support
} = require('@openzeppelin/test-helpers');

const PHA = artifacts.require('PhantasmaToken');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
    const voters = (await web3.eth.getAccounts()).slice(0, 4);
    await deployProxy(PHA, ['Phantasma Stake', 'SOUL', '8'], { deployer, initializer: 'initialize' });
};
