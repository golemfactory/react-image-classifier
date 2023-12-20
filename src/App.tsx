import { YagnaProvider } from "@golem-sdk/react";
import SetAppKeyForm from "./connection/SetAppKeyForm";
import useAppKey from "./connection/useAppKey";
import ImageClassification from "./run-task/ImageClassification";

function App() {
  const [appKey] = useAppKey();
  if (!appKey) {
    return <SetAppKeyForm />;
  }
  return (
    <YagnaProvider config={{ yagnaAppKey: appKey }}>
      <ImageClassification />
    </YagnaProvider>
  );
}

export default App;
