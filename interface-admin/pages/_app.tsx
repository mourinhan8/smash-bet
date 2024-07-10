import "rc-slider/assets/index.css";
import "../styles/antd-style.less";
import "../styles/main.scss";

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";

import { ReactElement, ReactNode, useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { AuthProvider } from "@/common/hooks/useAuth";
import { ConfigProvider } from "antd";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import type { NextPage } from "next";
import { Provider } from "react-redux";
import SEO from "../next-seo.config";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import store from "@/common/redux/store";
import { Web3Modal } from "@web3modal/react";

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

const chains = [bsc];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>SSBs ADMIN</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Bounty Task" />
      </Head>
      <AuthProvider>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: `"Inter", sans-serif`,
                // colorPrimary: "#47DEFF",
              },
            }}
          >
            <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class" forcedTheme={Component.theme || null}>
              <DefaultSeo {...SEO} />
              <WagmiConfig config={wagmiConfig}>{getLayout(<Component {...pageProps} />)}</WagmiConfig>
              <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </ConfigProvider>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
