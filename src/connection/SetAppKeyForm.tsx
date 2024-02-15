import { useYagna } from "@golem-sdk/react";
import { useState } from "react";

export default function SetAppKeyForm() {
  const { setYagnaOptions } = useYagna();

  const [userInput, setUserInput] = useState("");

  return (
    <main className="flex-grow flex items-center justify-center flex-col">
      <div className="card max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Before you start</h2>
          <p>Enter your Yagna app key to start using this app.</p>
          <p>
            Not sure what an app key is? Check out the{" "}
            <a
              href="https://docs.golem.network/docs/creators/javascript/examples/tools/yagna-installation-for-requestors"
              target="_blank"
              className="link"
            >
              documentation
            </a>{" "}
            for more information.
          </p>

          <div className="form-control">
            <input
              type="text"
              placeholder="Enter your app key"
              className="input input-bordered"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              disabled={!userInput}
              onClick={() => {
                setYagnaOptions({
                  apiKey: userInput,
                });
              }}
            >
              Continue to app
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
