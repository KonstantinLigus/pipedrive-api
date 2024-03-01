import { useEffect } from "react";
import "./App.css";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

function App() {
  useEffect(() => {
    const init = async () => {
      await new AppExtensionsSDK({
        identifier: "2dcd3daa-9c9f-4cfe-8dc5-f2faf7e7a346",
      }).initialize({
        size: { height: 500, width: 700 },
      });
    };
    init();
  }, []);

  return <div>hello</div>;
}

export default App;
