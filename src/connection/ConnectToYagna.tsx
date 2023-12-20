import { useYagna } from "@golem-sdk/react";

export default function ConnectToYagna() {
  const { reconnect } = useYagna();
  return (
    <div className="card max-w-3xl">
      <div className="card-body">
        <h2 className="card-title">Not connected to yagna</h2>
        <p>
          Looks like yagna is not running on your local machine. Please follow
          the instructions in the{" "}
          <a
            className="link"
            target="_blank"
            href="https://docs.golem.network/docs/creators/javascript/examples/tools/yagna-installation-for-requestors"
          >
            quickstart
          </a>
        </p>
        <p>
          Make sure to include the flag <code>{`--api-allow-origin`}</code> with
          the url of this app:
        </p>
        <div className="mockup-code">
          <pre data-prefix="$">
            <code>
              {`yagna service run --api-allow-origin='${window.location.origin}'`}
            </code>
          </pre>
        </div>
        <div className="card-actions justify-end">
          <button className="btn" onClick={() => reconnect()}>
            Try reconnecting now
          </button>
        </div>
      </div>
    </div>
  );
}
