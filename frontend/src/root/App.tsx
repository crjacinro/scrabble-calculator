import {HelmetProvider} from "react-helmet-async";
import Main from "~/root/Main";

export const App = () => {
  return (
    <HelmetProvider>
        <Main />
    </HelmetProvider>
  )
};
