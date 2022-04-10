import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {MantineProvider} from "@mantine/core";
import {NotificationsProvider} from '@mantine/notifications';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
  );
}

export default MyApp
