import type { AppProps } from "next/app";
import QuestionnaireLayout from "@/components/QuestionnaireLayout/QuestionnaireLayout";
import "@/styles/root.scss";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
