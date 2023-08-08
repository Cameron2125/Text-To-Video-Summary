import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import {ContextProvider} from "./Context/promptContext"


function MyApp({ Component, pageProps }: AppProps) {


  return(
    <ContextProvider>
      <Component 
    {...pageProps} />
    </ContextProvider>
  
  );
}
export default MyApp;
