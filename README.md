
# Polygon Quickie

A very simple no-Nodejs no-react vanilla Deno project for building chain-connected applications that are statically hostable.

The initial project is a simple chain-connected coin flipper which connects your wallet to this app, then switches the chain of your wallet to whatever is defined in the `src/main.ts` file, and then flips a coin, reporting the result back to you.

## Stack

This project is built with:

- [Deno 2.0](https://deno.com/blog/v2)
- [Vanilla TS](https://www.typescriptlang.org/) via Deno
- Simple builder to bundle dist (see `build.ts`)
- Foundry setup for smart contracts

## How to use

Install [Foundry](https://getfoundry.sh/) on your system. This is needed for smart contracts.

1. Clone the repo
2. Modify the `src/main.ts` file to your needs, and other html files as needed
3. Run `deno run build` to build the frontend
4. Run `deno run contracts:deploy` to test the example contracts
5. Serve whatever ends up in the dist folder on a simple server - IPFS, S3, Arweave, Github Pages, etc.
6. Deploy your smart contracts by tweaking the `.env` file (copy from `.env.example`) and running `deno run contracts:deploy`

## License: MIT

Copyright (c) 2024 x.com/bitfalls

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
