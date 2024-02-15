import { useYagna } from "@golem-sdk/react";
import SetAppKeyForm from "./connection/SetAppKeyForm";
import ImageClassification from "./run-task/ImageClassification";

function App() {
  const { isConnected } = useYagna();
  if (!isConnected) {
    return <SetAppKeyForm />;
  }
  return <ImageClassification />;
}

export default App;
