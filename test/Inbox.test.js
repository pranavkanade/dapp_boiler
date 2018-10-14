const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// add more data listeners. Settles the warining regarding the data leak
require('events').EventEmitter.defaultMaxListeners = 15;

const web3 = new Web3(ganache.provider());
const {
    interface,
    bytecode
} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //  get the list of all the accounts
    accounts = await web3.eth.getAccounts();

    // deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hello, World!']
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
});

describe('Inbox', () => {
    it('got deployed', () => {
        assert.ok(inbox.options.address);
    });
});