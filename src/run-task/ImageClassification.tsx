import { useYagna } from "@golem-sdk/react";
import ConnectToYagna from "../connection/ConnectToYagna";
import ConnectionStatus from "../header/ConnectionStatus";
import RunTaskCard from "./RunTaskCard";
import LogoutButton from "../header/LogoutButton";

export default function ImageClassification() {
  const { isConnected } = useYagna();
  return (
    <>
      <header className="flex w-full justify-end px-16 py-4 gap-4">
        <ConnectionStatus />
        <LogoutButton />
      </header>
      <main className="flex-grow flex items-center justify-center flex-col">
        {!isConnected ? <ConnectToYagna /> : <RunTaskCard />}
      </main>
    </>
  );
}
