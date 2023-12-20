import useAppKey from "../connection/useAppKey";

export default function LogoutButton() {
  const [_, setAppKey] = useAppKey();
  return (
    <button
      className="btn btn-primary btn-ghost"
      onClick={() => {
        setAppKey(null);
      }}
    >
      Change App Key
    </button>
  );
}
