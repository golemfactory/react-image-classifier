import { useYagna } from "@golem-sdk/react";

export default function ConnectionStatus() {
  const { isConnected, reconnect, isLoading, error } = useYagna();
  return (
    <div className="flex gap-4 items-center">
      {error && <span className="badge badge-error">{`${error}`}</span>}
      <button
        className="btn "
        onClick={() => {
          reconnect();
        }}
      >
        {isConnected
          ? "🟢 Connected to Yagna"
          : isLoading
          ? "🟡 Connecting..."
          : "🔴 Connect to Yagna"}
      </button>
    </div>
  );
}
