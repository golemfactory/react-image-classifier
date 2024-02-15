import { useYagna } from "@golem-sdk/react";

export default function LogoutButton() {
  const { setYagnaOptions } = useYagna();
  return (
    <button
      className="btn btn-primary btn-ghost"
      onClick={() => {
        setYagnaOptions({ apiKey: null });
      }}
    >
      Change App Key
    </button>
  );
}
