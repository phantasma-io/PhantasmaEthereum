# Phantasma ERC20/BEP20

## Audit

https://www.certik.com/projects/ghostmarket

## Technical Information

Upgradable ERC20 Contract.
Using OpenZeppelin contracts.

### Compiling contracts
```
truffle compile --all
```

### Deploying Proxy

Using Truffle to deploying Proxy
```
contracts/Migrations.sol
```
Contracts can be deployed with
```
truffle deploy --network <network_name>
```
For local deployment ganache must be started and private keys saved into

```
.secrets.json
```

local deployment:
```
truffle deploy --network development
```

testnet deployment:
```
truffle deploy --network <TESTNET_NAME>
```

mainnet deployment:
```
truffle deploy --network <MAINNET_NAME>
```

## Testing

tests can be run with:

local deployment:
```
truffle test --network development
```

testnet deployment:
```
truffle test --network <TESTNET_NAME>
```

## Verify

```
truffle run verify PhantasmaToken@<CONTRACT_HASH> --network <NETWORK_NAME>
```
