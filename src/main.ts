// Import types from ethers
import { BrowserProvider, JsonRpcSigner, JsonRpcProvider } from './ethers6.min.js';

const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const RPC_URLS = [
    'https://polygon.llamarpc.com',
    'https://polygon.rpc.subquery.network/public',
    'https://polygon.drpc.org',
    'https://polygon-rpc.com', 
    'https://1rpc.io/matic'
];
const RPC_URL = IS_LOCAL ? 'http://127.0.0.1:8545' : RPC_URLS[Math.floor(Math.random() * RPC_URLS.length)];

// DOM Elements
const connectBtn = document.getElementById('connectBtn') as HTMLButtonElement;
const blockHeightBtn = document.getElementById('blockHeightBtn') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLDivElement;
const outputEl = document.getElementById('output') as HTMLDivElement;

let provider: BrowserProvider;
let signer: JsonRpcSigner;

// Get the provider (either standard Web3 or Phantom)
async function getProvider(): Promise<any> {
    if (window.phantom?.ethereum) {
        return window.phantom.ethereum;
    }
    if (window.ethereum) {
        return window.ethereum;
    }
    throw new Error('No Web3 provider found. Please install MetaMask or Phantom.');
}

// Connect wallet
async function connectWallet() {
    try {
        statusEl.textContent = 'Connecting...';
        const ethereum = await getProvider();
        
        // Request account access
        await ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create ethers provider
        provider = new BrowserProvider(ethereum);
        signer = await provider.getSigner();
        
        const address = await signer.getAddress();
        statusEl.textContent = `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
        
        // Show block height button
        blockHeightBtn.classList.remove('hidden');
        connectBtn.classList.add('hidden');
    } catch (err: unknown) {
        const error = err as Error;
        statusEl.textContent = `Error: ${error.message}`;
    }
}

// Check block height
async function checkBlockHeight() {
    try {
        statusEl.textContent = 'Checking block height...';
        
        // Get network from RPC
        const rpcProvider = new JsonRpcProvider(RPC_URL);
        const network = await rpcProvider.getNetwork();
        const chainId = Number(network.chainId);
        
        // Switch network if needed
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
        } catch (err: unknown) {
            const error = err as Error;
            statusEl.textContent = `Error switching network: ${error.message}`;
            return;
        }
        
        // Get block height
        const blockNumber = await provider.getBlockNumber();
        outputEl.textContent = `Current block height: ${blockNumber}`;
        statusEl.textContent = 'Block height fetched successfully';
    } catch (err: unknown) {
        const error = err as Error;
        statusEl.textContent = `Error: ${error.message}`;
    }
}

// Event Listeners
connectBtn.addEventListener('click', connectWallet);
blockHeightBtn.addEventListener('click', checkBlockHeight);

// Types for window object
declare global {
    interface Window {
        ethereum?: any;
        phantom?: {
            ethereum?: any;
        };
    }
}