import "../styles/fonts.css";
import "../styles/globals.css";

import Layout from "src/components/Layout";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";

function MyApp(appProps: AppProps) {
  return (
    <Provider store={store}>
      <Layout {...appProps} />
    </Provider>
  );
}

export default MyApp;
