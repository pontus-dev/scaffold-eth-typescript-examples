# 🏗 Scaffold-Eth Unity WebGL

## Unity Web GL

This is the typescript repo of scaffold-eth with a built in Unity WebGL project. The directories that you'll use are:

```bash
packages/vite-app-ts/
packages/vite-app-ts/unity-webgl-project/
packages/hardhat-ts/
```

## KNOWN ISSUES

When you navigate away from the Unity tab in scaffold-eth you may get an uncaught exception due to a bug in emscripten. [This is known and being worked on.](https://github.com/jeffreylanters/react-unity-webgl/issues/250) If you have a workaround you can submit a pull request and I will review it!

## Quick Start

Running the app

1. install your dependencies

   ```bash
   yarn install
   ```

2. start a hardhat node

   ```bash
   yarn chain
   ```

3. run the app, `open a new command prompt`

   ```bash
   # build hardhat & external contracts types
   yarn contracts:build
   # deploy your hardhat contracts
   yarn deploy
   # start vite
   yarn start
   ```

## Overview

> everything you need to build on Ethereum! 🚀

🧪 Quickly experiment with Solidity and scaffolding that has an example of using a Unity frontend for your smart contracts:

![image](https://user-images.githubusercontent.com/99667871/158994315-2ac85e8f-2a29-45b3-b581-8598e9bff621.png)

🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat-ts/contracts`

📝 Edit your react frontend `MainPage.tsx` in `packages/vite-app-ts/src`

💼 Edit your deployment scripts in `packages/hardhat-ts/deploy`

🧊 Edit your Unity project in `packages/vite-app-ts/public/unity-webgl-project`

📱 Open http://localhost:3000 to see the app

## Opening the Unity project

1. Open the Unity Editor. Unity Version 2021.2.15f1 was used to create this project. Other versions should be fine too.
2. Use the folder `packages/vite-app-ts/unity-webgl-project/` as your project to open.
   ![image](https://user-images.githubusercontent.com/99667871/158993543-20349a19-a199-471a-ac41-d999afff744b.png)

## Building the Unity Project

1. Open the Unity project.
2. Then and click <b>File > Build Settings...</b>.
3. Make sure you have WebGL as platform target
   ![image](https://user-images.githubusercontent.com/99667871/158988300-56e3f36a-ebfa-460f-89dc-2b927360e66b.png)
4. Then click <b>Player Settings...</b> and under the player tab, make sure your WebGL Publishing Settings has Compression Format set to Disabled
   ![image](https://user-images.githubusercontent.com/99667871/158993797-c46b3bc1-681d-41c1-a0b1-69f834594ba2.png)
5. Exit the player settings and click <b>Build</b> and choose `packages/vite-app-ts/public/unitybuild` as the selected folder
   ![image](https://user-images.githubusercontent.com/99667871/158988464-e0e90db2-8d14-429a-b37c-b9362f6b64bf.png)

## Unity Editor and VSCode

Opening the entire scaffold-eth-unity-webgl project in VSCode and setting this setting in unity lets you double click a script in Unity and have it open in the appropriate VSCode window.

![image](https://user-images.githubusercontent.com/99667871/158994759-e92e3562-4599-47de-9f67-b0a097ae99c4.png)
<i>Notice the removed project path before the -g flag</i>

## Communication between react scaffold-eth and unity

This project uses [github.com/jeffreylanters/react-unity-webgl](https://github.com/jeffreylanters/react-unity-webgl) this way we just set up our usual eth-hooks and feed them into our react-unity-webgl UnityComponent and then we can send and receive calls between react and unity.

For the react specific parts look here:
`packages\vite-app-ts\src\components\unity\UnityComponent.tsx`

And for Unity we need to specify a JavaScript interop library here: `packages\vite-app-ts\unity-webgl-project\Assets\Plugins\WebGL\ReactUnityWebGL.jslib`

And then we can send and receive calls through scripts, like here
`packages\vite-app-ts\unity-webgl-project\Assets\Scripts\ReactHooksController.cs`

To learn more about the integration and how to do custom integrations. Please refer to the react-unity-webgl documentation. [github.com/jeffreylanters/react-unity-webgl](https://github.com/jeffreylanters/react-unity-webgl)

For learning about Unity, please refer to [unity.com/learn](https://unity.com/learn)

For learning more about Scaffold-eth and Solidity refer to the information below.

# 📚 Scaffold-eth Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

Eth-hooks documentation is [here](https://scaffold-eth.github.io/eth-hooks/). Learn how to use the contexts here.

# 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

# 🏃💨 Speedrun Ethereum

Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.

# 🛠 Buidl

Check out all the [active branches](https://github.com/austintgriffith/scaffold-eth/branches/active), [open issues](https://github.com/austintgriffith/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

- 🚤 [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)

# 💌 P.S.

🌍 You need an RPC key for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js` with your new key.

# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🙏 Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!
