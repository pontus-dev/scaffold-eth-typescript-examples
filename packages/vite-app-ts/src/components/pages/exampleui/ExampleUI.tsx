import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { transactor } from 'eth-components/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useGasPrice, useNetwork } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { components } from 'moralis/types/generated/web3Api';
import React, { useState, FC, useEffect, Fragment, useContext } from 'react';
import { useMoralis } from 'react-moralis';
import Unity, { UnityContext } from 'react-unity-webgl';

import { getNetworkInfo } from '~~/functions';

type ApiChain = components['schemas']['chainList'];
type NFT = components['schemas']['nft'];

export interface IExampleUIProps {
  mainnetProvider: StaticJsonRpcProvider | undefined;
}

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

export const ExampleUI: FC<IExampleUIProps> = (props) => {
  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const ethersContext = useEthersContext();
  const network = useNetwork(props.mainnetProvider)[0];
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progression, setProgression] = useState<number>(0);
  const signer = ethersContext.signer;
  const address = ethersContext.account ?? '';
  const chain: ApiChain | undefined = (
    network?.name ? (network?.name === 'homestead' ? 'mainnet' : network?.name) : 'rinkeby'
  ) as ApiChain;
  const options = { chain: 'mainnet' as ApiChain, address: '0x34aA3F359A9D614239015126635CE7732c18fDF3' };
  const [data, setData] = useState<NFT[]>();
  const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast', getNetworkInfo(ethersContext.chainId));
  const { Moralis } = useMoralis();

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

  async function fetchData(): Promise<void> {
    const nfts = await Moralis.Web3API.account.getNFTs(options);
    setData(nfts.result?.splice(5, 5));
  }
  useEffect(() => {
    void fetchData();
  }, []);

  // When the component is mounted, we'll register some event listener.
  useEffect(() => {
    unityContext.on('canvas', handleOnUnityCanvas);
    unityContext.on('progress', handleOnUnityProgress);
    unityContext.on('loaded', handleOnUnityLoaded);
    // When the component is unmounted, we'll unregister the event listener.
    return function () {
      unityContext.removeAllEventListeners();
    };
  }, [tx]);

  // When the NFTdata is updated, it will be sent to Unity.
  useEffect(() => {
    unityContext.send('ReactHooks', 'SetNFTs', data ? JSON.stringify(data) : '');
  }, [data, isLoaded]);

  // This is the React component that will be rendering the Unity app.
  return (
    <Fragment>
      <div className="wrapper">
        {/* Introduction text */}
        <h1>React Unity WebGL NFT gallery</h1>
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
