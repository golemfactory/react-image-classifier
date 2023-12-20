import { ExecutorOptions, useExecutor } from "@golem-sdk/react";
import { useState } from "react";
import ExecutorOptionsForm from "./ExecutorConfigForm";
import DragAndDropFiles from "./DragAndDropFiles";

export default function RunTaskCard() {
  const [executorOptions, setExecutorOptions] = useState<ExecutorOptions>({
    package: "severyn/detr-resnet-50:latest",
    enableLogging: false,
    budget: 1,
    subnetTag: "public",
    payment: {
      driver: "erc20",
      network: "goerli",
    },
    minCpuCores: 1,
    minMemGib: 8,
    minCpuThreads: 1,
    minStorageGib: 4,
    maxParallelTasks: 5,
  });

  const {
    executor,
    initialize,
    error,
    isInitialized,
    isInitializing,
    terminate,
    isTerminating,
  } = useExecutor(executorOptions);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body justify-between">
        {!isInitialized && (
          <>
            <h2 className="card-title">Let's initialize a new Task Executor</h2>
            <ExecutorOptionsForm
              options={executorOptions}
              setOptions={setExecutorOptions}
              disabled={isInitializing}
            />
            <div className="card-actions justify-end pt-4">
              <button
                onClick={() => {
                  initialize();
                }}
                className="btn btn-primary"
                disabled={isInitializing}
              >
                {isInitializing ? "Initializing..." : "Initialize"}
              </button>
            </div>
          </>
        )}

        {!!error && (
          <p className="text-red-500">Something went wrong when initializing</p>
        )}

        {isInitialized && executor && (
          <>
            <h2 className="card-title pb-4">
              Task Executor is ready to classify images
            </h2>
            <DragAndDropFiles executor={executor} />
            <button
              onClick={() => {
                terminate();
              }}
              className="btn btn-primary self-end mt-4"
              disabled={isTerminating}
            >
              {isTerminating ? (
                <>
                  <span className="loading loading-spinner"></span>
                  <span>Terminating...</span>
                </>
              ) : (
                "Terminate"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
