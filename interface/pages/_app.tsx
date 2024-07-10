import "react-quill/dist/quill.snow.css";
import "../styles/main.scss";

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { mainnet } from "wagmi/chains";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import ErrorBoundary from "@/common/components/ErrorBoundary";
import Head from "next/head";
import Layout from "@/common/components/Layout";
import type { NextPage } from "next";
import { Provider } from "react-redux";
import SEO from "../next-seo.config";
import { ThemeProvider } from "next-themes";
import { Web3Modal } from "@web3modal/react";
import store from "@/common/redux/store";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  theme?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const chains = [mainnet];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [ready, setReady] = useState(false);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Head>
        <title>Smash Showdown</title>
        <link rel="icon" href="/svg/logo.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width" />
        <meta name="description" content="Smash Showdown" />
        <meta name="image" content="/svg/logo.svg" />

        <meta itemProp="name" content="Smash Showdown" />
        <meta itemProp="description" content="Smash Showdown" />
        <meta itemProp="image" content="/svg/logo.svg" />
      </Head>

      <Provider store={store}>
        <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class" forcedTheme={Component.theme || null}>
          <DefaultSeo {...SEO} />
          <ErrorBoundary>
            <WagmiConfig client={wagmiClient}>{ready ? <Layout>{getLayout(<Component {...pageProps} />)}</Layout> : null}</WagmiConfig>
          </ErrorBoundary>
          <Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
            themeVariables={{
              "--w3m-accent-color": "#0979A6",
              "--w3m-logo-image-url": "/svg/logo.svg",
              "--w3m-background-color": "#000000",
            }}
          />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
