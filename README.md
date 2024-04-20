## SoftChain- An International Supply Chain Data Sharing Using Blockchain:
Supply-chain-dapp revolutionizes supply chain management with blockchain and smart contracts. It ensures transparency, efficiency, and security from manufacturer to consumer. Seamlessly integrated with e-commerce platforms, it empowers consumers with real-time tracking and trust in product authenticity. Welcome to the future of supply chain, where every transaction is transparent, secure, and efficient.

## Features:

- **Payment Integration**: Seamlessly integrate payment gateways to facilitate secure transactions between buyers and sellers within the supply chain ecosystem.

- **Product Journey Tracker**: Track the journey of products from manufacturing to delivery, providing stakeholders with real-time updates and insights into the status and location of each item.

- **Chatbot**: Incorporate a chatbot feature to provide instant support and assistance to users, answering queries, providing information, and guiding them through the supply chain process.

- **Order and Product Management**: Efficiently manage orders and products within the supply chain, enabling stakeholders to track inventory, update product information, and streamline the order fulfillment process.

## Architecture
The project utilizes a decentralized blockchain network and smart contracts to automate and secure supply chain processes. It provides a user-friendly interface for stakeholders to interact with, integrating seamlessly with e-commerce platforms for real-time tracking and transparency. By recording data on the blockchain, it ensures traceability, and integrity, while decentralized identity solutions enhance security and privacy.

## Supply Chain Flow
![Supply Chain Flow](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/468956d6-802e-4327-9823-a6676c93f7c5)

## Demo
![image](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/a1f48bbd-1429-40ee-b85f-7a606f28de6f)

![image](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/5ed83b3e-be67-4f65-8754-bfc5c8ab3b60)

![image](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/6dc74113-560e-4a82-a7f6-72c7b3d4ebc3)

![image](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/de1d0ebf-a07a-4bfa-b53e-0edc83cb0c4f)

![Demo](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/3438eaef-6270-4a5a-85da-e42e3faa8365)

![image](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/32ebcefd-1647-4a85-a70b-8cfb82f1a766)

![image](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/e8942584-7dc9-4855-88cb-d40174890046)

![image](https://github.com/pajju0330/InternationalSupplyChainManagement-Blockchain/assets/103507406/150bd513-c45d-4df7-828b-66cb8c4d68fd)

### 🔧 Setting up development environment

#### Step 1: Installation and Setup

- **VSCode**: Download VSCode from [here](https://code.visualstudio.com/).
  
- **Node.js**: Download the latest version of Node.js from [here](https://nodejs.org/). After installation, check the version using the terminal: `node -v`.
  
- **Git**: Download the latest version of Git from the official website [here](https://git-scm.com/downloads). Check the version using the terminal: `git --version`.

#### Step 2: Create, Compile & Deploy Smart Contract

1. Open VSCode and open the terminal by pressing `Ctrl + '`.
2. Move to Server:
    ```
    $ cd server
    ```
3. Install dependencies: 
    ```
    $ npm i
    ```
4. Compilation command: 
    ```
    $ npx hardhat compile
    ```
5. Run command: 
    ```
    $ npx hardhat run ./script/deploy.js
    ```
6. Copy Paste the the contract Addresses in ./utils/RawMaterialJourney.js
7. Finally start the server
    ```
    $ npm start
    ```

#### Step 3: Run DAPP

1. Open a second terminal and navigate to the client folder:
    ```
    $ cd client
    ```
2. Install all packages in the `package.json` file:
    ```
    $ npm i
    ```

4. Run the development server:
    ```
    $ npm run dev
    ```

This setup guide should help streamline the process for developers looking to get started with the Supply-chain-dapp project.
