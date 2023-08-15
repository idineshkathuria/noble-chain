import { getDefaultConfig } from "connectkit";
import { configureChains, createConfig } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseGoerli],
  [publicProvider()]
);

const walletConnectProjectId = "f470e4b220022a67782084b800e5dc43";

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "Charity Fundraiser dApp",
    connectors: [new InjectedConnector({ chains })],
    walletConnectProjectId,
    publicClient,
    webSocketPublicClient,
  })
);

// Added project here to get Project ID : https://cloud.walletconnect.com/app/project?uuid=f256aa81-e772-4671-b68a-68c5c39bb61b
// Deployed Contracts on BaseGoerli
