import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useContractReader, useGasPrice } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber } from 'ethers';
import { create } from 'ipfs-http-client';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { concat } from 'uint8arrays';

import { useAppContracts } from '~~/config/contractContext';
import { getNetworkInfo } from '~~/functions';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// This is the context that Unity will use to communicate with the React app.
const unityContext = new UnityContext({
  productName: 'scaffold-eth-unity-webgl',
  companyName: 'BuidlGuidl',
  // The url's of the Unity WebGL runtime, these paths are public and should be
  // accessible from the internet and relative to the index.html.
  loaderUrl: 'unitybuild/Build/unitybuild.loader.js',
  dataUrl: 'unitybuild/Build/unitybuild.data',
  frameworkUrl: 'unitybuild/Build/unitybuild.framework.js',
  codeUrl: 'unitybuild/Build/unitybuild.wasm',
  streamingAssetsUrl: 'unitybuild/Build/streamingassets',
  // Additional configuration options.
  webglContextAttributes: {
    preserveDrawingBuffer: true,
  },
});

// helper function to "Get" from IPFS
// you usually go content.toString() after this...
const getFromIPFS = async (hashToGet: string): Promise<string> => {
  const chunks = [];
  for await (const chunk of ipfs.cat(hashToGet)) {
    chunks.push(chunk);
  }

  const data = concat(chunks);
  const decodedData = new TextDecoder().decode(data).toString();
  return decodedData;
};

// This is the React component that will be rendering the Unity app.
export const UnityComponent: FC = () => {
  // The app's state.
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const ethersContext = useEthersContext();
  const yourCollectible = useAppContracts('YourCollectible', ethersContext.chainId);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progression, setProgression] = useState<number>(0);
  // const [purpose] = useContractReader(yourContract, yourContract?.purpose, [], yourContract?.filters.SetPurpose());
  // const [balance, _update, status] = useBalance(ethersContext.account);
  const [balance] = useContractReader(yourCollectible, yourCollectible?.balanceOf);
  const address = ethersContext.account ?? '';
  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
  const yourBalance = balance && balance.toNumber();
  const [yourCollectibles, setYourCollectibles] = useState<string[]>();

  useEffect(() => {
    const updateYourCollectibles = async (): Promise<void> => {
      if (balance === undefined) return;
      if (yourCollectible === undefined) return;
      const collectibleUpdate: string[] = [];
      for (let tokenIndex = BigNumber.from(0); tokenIndex < balance; tokenIndex = tokenIndex.add(1)) {
        try {
          console.log('GEtting token index', tokenIndex);
          const tokenId = await yourCollectible.tokenOfOwnerByIndex(address, tokenIndex);
          console.log('tokenId', tokenId);
          const tokenURI = await yourCollectible.tokenURI(BigNumber.from(tokenId));
          console.log('tokenURI', tokenURI);

          const ipfsHash = tokenURI?.replace('https://ipfs.io/ipfs/', '');
          console.log('ipfsHash', ipfsHash);

          const jsonManifestBuffer = await getFromIPFS(ipfsHash ?? '');

          try {
            const jsonManifest = JSON.parse(jsonManifestBuffer);
            console.log('jsonManifest', jsonManifest);
            collectibleUpdate.push(JSON.stringify({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest }));
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setYourCollectibles(collectibleUpdate);
    };
    void updateYourCollectibles();
  }, [address, yourBalance]);
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast', getNetworkInfo(ethersContext.chainId));
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  // Built-in event invoked when the Unity canvas is ready to be interacted with.
  function handleOnUnityCanvas(canvas: HTMLCanvasElement): void {
    canvas.setAttribute('role', 'unityCanvas');
  }

  // Built-in event invoked when the Unity app's progress has changed.
  function handleOnUnityProgress(progression: number): void {
    setProgression(progression);
  }

  // Built-in event invoked when the Unity app is loaded.
  function handleOnUnityLoaded(): void {
    setIsLoaded(true);
  }

  // Custom event invoked when the Unity app sends a message including something
  // written in an input field.
  function handleSetPurpose(message: string): void {
    /* look how you call setPurpose on your contract: */
    // void tx?.(yourContract?.setPurpose(message));
  }

  // When the component is mounted, we'll register some event listener.
  useEffect(() => {
    unityContext.on('canvas', handleOnUnityCanvas);
    unityContext.on('progress', handleOnUnityProgress);
    unityContext.on('loaded', handleOnUnityLoaded);
    unityContext.on('SetPurpose', handleSetPurpose);
    // When the component is unmounted, we'll unregister the event listener.
    return function () {
      unityContext.removeAllEventListeners();
    };
  }, [tx]);

  // When the balance is updated, it will be sent to Unity.
  // useEffect(() => {
  //  unityContext.send('ReactHooks', 'SetBalance', status === 'success' ? formatEther(balance) : 'loading');
  // }, [balance, isLoaded, status]);

  useEffect(() => {
    const serialized = JSON.stringify(yourCollectibles);
    unityContext.send('ReactHooks', 'SetCollectibles', serialized ?? '[]');
  }, [yourCollectibles]);

  // This is the React component that will be rendering the Unity app.
  return (
    <Fragment>
      <div className="wrapper">
        {/* Introduction text */}
        <h1>React Unity WebGL Tests</h1>
        <p>In scaffold-eth-unity we will explore the possibilities with the React Unity WebGL Module.</p>
        {/* Some buttons to interact */}
        <h1 style={{ fontSize: '24px' }}>purpose: {/* purpose*/}</h1>
        {/* The Unity container */}
        <Fragment>
          <div className="unity-container">
            {/* The loading screen will be displayed here. */}
            {isLoaded === false && (
              <div className="loading-overlay">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: (progression * 100).toString() + '%' }} />
                </div>
              </div>
            )}
            {/* The Unity app will be rendered here. */}
            <Unity style={{ width: '100%', margin: 'auto' }} className={'unity-canvas'} unityContext={unityContext} />
          </div>
          {/* Displaying some output values */}
        </Fragment>
      </div>
    </Fragment>
  );
};
