const suite = require('../node_modules/erc20-test-suite/lib/suite');
const Phantasma = artifacts.require("PhantasmaToken");
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectRevert, // Assertions for transactions that should fail
  expectEvent,  // Assertions for emitted events
  ether
} = require('@openzeppelin/test-helpers');

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

contract("PhantasmaToken", async accounts => {
    it("Owner is set", async () => {
        let instance = await Phantasma.deployed();
        let owner = await instance.owner.call();
        assert.equal(owner, accounts[0]);
    });

    it("Owner balance after deploy", async () => {
        let instance = await Phantasma.deployed();
        let owner = await instance.owner.call();
        let ownerBalance = await instance.balanceOf.call(owner);
        assert.equal(ownerBalance.toString(), '0');
    });

    it("Owner balance after deploy", async () => {
        let instance = await Phantasma.deployed();
        let balance = await instance.balanceOf.call(accounts[0]);
        assert.equal(balance.toString(), '0');
    });

    it("Name", async () => {
        let instance = await Phantasma.deployed();
        let name = await instance.name.call();
        assert.equal(name, 'Phantasma Stake');
    });

    it("Symbol", async () => {
        let instance = await Phantasma.deployed();
        let symbol = await instance.symbol.call();
        assert.equal(symbol, 'SOUL');
    });

    it("Decimals", async () => {
        let instance = await Phantasma.deployed();
        let decimals = await instance.decimals.call();
        assert.equal(decimals, 8);
    });

    it("Pause/unpause contract", async () => {
        let instance = await Phantasma.deployed();
        let paused = await instance.paused.call();
        assert.equal(paused, false);

        await instance.pause();

        paused = await instance.paused.call();
        assert.equal(paused, true);

        await instance.unpause();
        paused = await instance.paused.call();
        assert.equal(paused, false);
    });

    it("SwapIn tokens", async () => {
        let instance = await Phantasma.deployed();
        await instance.swapIn(accounts[1], 2000, {from: accounts[0]});
        let balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(balance.toString(), '2000');

    });

    it("SwapOut tokens", async () => {
        let instance = await Phantasma.deployed();
        var receipt = await instance.transfer(accounts[0], 1000, { from: accounts[1] })
        expectEvent(receipt, 'Transfer', {
            from: accounts[1],
            to: ZERO_ADDRESS,
            value: new BN('1000'),
        });

        let total = await instance.totalSupply.call();
        let balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(balance.toString(), '1000');
        assert.equal(balance.toString(), total.toString());

    });

    it("Standard transfer", async () => {
        let instance = await Phantasma.deployed();
        await instance.swapIn(accounts[1], 2000, {from: accounts[0]});

        let balanceBefore = await instance.balanceOf.call(accounts[1]);
        assert.equal(balanceBefore.toString(), '3000');

        let receipt = await instance.transfer(accounts[3], 2000, { from: accounts[1] })

        let balanceAfter = await instance.balanceOf.call(accounts[3]);
        assert.equal(balanceAfter.toString(), '2000');

        let balanceSender = await instance.balanceOf.call(accounts[1]);
        assert.equal(balanceSender.toString(), '1000');
    });

    it("Transfer ownership", async () => {
        let instance = await Phantasma.deployed();
        await instance.transferOwnership(accounts[1]);
        let owner = await instance.owner.call();
        assert.equal(owner, accounts[1]);
    });

    it("Total supply", async () => {
        let instance = await Phantasma.deployed();
        let total = await instance.totalSupply.call();
        assert.equal(total.toString(), '3000');
    });

    it("Approve/Allowance/TransferFrom", async () => {
        let instance = await Phantasma.deployed();
        await instance.swapIn(accounts[0], 2000, { from: accounts[1] });

        await instance.approve(accounts[2], 2000);

        let allowance = await instance.allowance.call(accounts[0], accounts[2])
        assert.equal(allowance.toString(), '2000');

        await instance.transferFrom(accounts[0], accounts[2], 2000, { from: accounts[2] })
        assert.equal(allowance.toString(), '2000');

        let balance = await instance.balanceOf.call(accounts[2]);
        assert.equal(balance.toString(), '2000')

        await expectRevert(instance.transferFrom(accounts[0], accounts[2], 2000, { from: accounts[2] }),
        "ERC20: transfer amount exceeds balance -- Reason given: ERC20: transfer amount exceeds balance."
        );

        await expectRevert(instance.transferFrom(accounts[0], accounts[2], 2000, { from: accounts[1] }),
        "ERC20: transfer amount exceeds balance -- Reason given: ERC20: transfer amount exceeds balance."
        );
    });
});
