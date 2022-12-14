

<div id="top"></div>

<br />
<div align="center">
<h3 align="center">Sharetape</h3>
</div>

### Built With

* [React.js](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Solidity](https://soliditylang.org/)
* [Ethers.js](https://docs.ethers.io/v5/)
* [Infura IPFS](https://infura.io/product/ipfs)


<!-- GETTING STARTED -->
## Getting Started

To get this application up and and running on your local machine follow these simple steps.

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project. 

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/adhikary97/Sharetape-Dev
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   or 
   
     ```sh
   yarn install
   ```
3. Compile the smart contract 
	  ```sh
   npx hardhat compile
   ```
4. Deploy the smart contract 
5. Get your contract address and paste in on `getContract.js`
6. Create .env file and add these keys
   ```sh
   REACT_APP_IPFS_KEY=<ipfs key>
   REACT_APP_IPFS_SECRET=<ipfs secret>
   REACT_APP_FIREBASE_KEY=<firebase api key>
   WALLET_ACCOUNT=<wallet account>
   ```
7. Run the app
	  ```sh
   npm start
   ```


### License

This project is an open source software licensed under the MIT License
