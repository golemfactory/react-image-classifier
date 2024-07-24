import { useExecutor } from "@golem-sdk/react";
import { useState } from "react";
import ExecutorOptionsForm from "./ExecutorConfigForm";
import DragAndDropFiles from "./DragAndDropFiles";
import { TaskExecutorOptions } from "@golem-sdk/task-executor";

export default function RunTaskCard() {
  const [executorOptions, setExecutorOptions] = useState<TaskExecutorOptions>({
    demand: {
      workload: {
        imageTag: "severyn/detr-resnet-50:latest",
        minCpuCores: 2,
        minCpuThreads: 2,
        minMemGib: 4,
        minStorageGib: 4,
      },
      subnetTag: "public",
    },
    market: {
      rentHours: 15 / 60,
      pricing: {
        model: "linear",
        maxStartPrice: 0.5,
        maxCpuPerHourPrice: 1.0,
        maxEnvPerHourPrice: 0.5,
      },
    },
    task: {
      maxParallelTasks: 5,
    },
    payment: {
      network: "holesky",
    },
    enableLogging: true,
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
