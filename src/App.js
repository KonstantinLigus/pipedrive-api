import { useEffect } from "react";
import "./App.css";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

function App() {
  useEffect(() => {
    const init = async () => {
      await new AppExtensionsSDK({
        identifier: "62a33a39-4b48-460f-af2f-fd47707718ef",
      }).initialize({
        size: { height: 500, width: 700 },
      });
    };
    init();
  }, []);

  return <div>hello</div>;
}

export default App;
