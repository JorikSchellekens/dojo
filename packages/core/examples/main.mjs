import { RPCProvider } from '../dist/provider/RPCProvider.js';
import { HotAccount } from '../dist/account/index.js'
import * as microstarknet from 'micro-starknet';

// Katana example world
const ExecutorContractAddress = '0x393eda36950839b7c4e97377816e20b692f14cf3f3bdcaf67d9355c4e68f2f8';
const WorldContractAddress = '0x2a79e6863214cfb96bdcb42b70eb39cdb74dd7787d2b1e792b673600892eeb2';
const MovesClass = '0x7463417c058526917303293d161f7c2bd6bb0e3f69aa521206b7db03fc56784';
const PositionClass = '0x48470d2bdb97afe267b7d7fd4fb485568e7a9151dcea3d02eeedcc4ed3d36c3';
const StatusClass = '0x560eb5a8cb7598ba7b8c89c20569e829fd5c44239497410c1857c47a744b087';
const RoleClass = '0xbebd0c207c6037030ded801a162e67d11bd40b119e40cedadcd6e8236d9776';
const SpawnClass = '0x287805587e3abd3111e19b56dbe7d8b8458e3ffb95a8f272466c1072b80e519';
const MoveClass = '0x78cb0d639526ff6c83a42bb52b74fe1c526f68f2185ef1afebfe83839ccc08b';
const RouteAuthClass = '0x57c64cd6f454239b3f77d8fbf9c047b669683e74c2ed88c9fa3369a0a2ca7ec';
const AuthorizeClass = '0x3c7a73e7586ba6891cef7d095ce97ebe3058862a3e6d1b86798bcda18d43891';
const GrantRoleClass = '0x292201cf281a7eafc0eee5194c0523bac946f1554c5fd18a478974bf7425ae8';
const GrantResourceClass = '0x589743838143033025381cb2492fae8f49e9d24f3f75feff638d02877b1bfe';
const RevokeRoleClass = '0x2399480f7a849c3d934cb817e6ea9de918dbd7df0c7b6f531df7fe80aed927d';
const RevokeResourceClass = '0x7a8e65990e5ea2434651232e50d4f4c9d0d908521970b9ab8d61bc7f1a5bd11';

const address = "0x06f62894bfd81d2e396ce266b2ad0f21e0668d604e5bb1077337b6d570a54aea"

const privateKey = "0x07230b49615d175307d580c33d6fda61fc7b9aec91df0f5c1a5ebe3b8cbfee02"

const url = 'http://127.0.0.1:5050';

const main = async () => {

    const rpcProvider = new RPCProvider(WorldContractAddress, url);

    const account = new HotAccount(rpcProvider.sequencerProvider, address, privateKey)

    const keys = [BigInt(address)]

    const pos = microstarknet.poseidonHashMany(keys)

    const query = { address_domain: 0, partition: BigInt(address), keys: keys, hash: pos  };
    const offset = 0;
    const length = 0;

    try {
        const response = await rpcProvider.execute(account.account, SpawnClass, []);
        console.log('Response:', response);
    } catch (error) {
        console.error('An error occurred:', error);
    }

    try {
        const response = await rpcProvider.entity('0x506f736974696f6e436f6d706f6e656e74', query, offset, length);
        console.log('Response:', response);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

main();