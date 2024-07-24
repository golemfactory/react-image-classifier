import { TaskExecutorOptions } from "@golem-sdk/task-executor";

type ExecutorOptionsFormProps = {
  disabled: boolean;
  options: TaskExecutorOptions;
  setOptions: (config: TaskExecutorOptions) => void;
};

export default function ExecutorOptionsForm({
  disabled,
  options,
  setOptions,
}: ExecutorOptionsFormProps) {
  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Subnet</span>
          </label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={options.demand.subnetTag}
            onChange={(e) => {
              setOptions({
                ...options,
                demand: {
                  ...options.demand,
                  subnetTag: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Network</span>
          </label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={options.payment?.network}
            onChange={(e) => {
              setOptions({
                ...options,
                payment: {
                  ...options.payment,
                  network: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-2xl  whitespace-nowrap">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Min CPU cores</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            step="1"
            placeholder="1"
            min="1"
            className="input input-bordered w-full max-w-xs"
            value={options.demand.workload?.minCpuCores}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setOptions({
                ...options,
                demand: {
                  ...options.demand,
                  workload: {
                    ...options.demand.workload,
                    minCpuCores: isNaN(value) ? 1 : value,
                  },
                },
              });
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Min CPU threads</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            step="1"
            placeholder="1"
            min="1"
            className="input input-bordered w-full max-w-xs"
            value={options.demand.workload?.minCpuThreads}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setOptions({
                ...options,
                demand: {
                  ...options.demand,
                  workload: {
                    ...options.demand.workload,
                    minCpuThreads: isNaN(value) ? 1 : value,
                  },
                },
              });
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Min mem (GiB)</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            step="1"
            placeholder="1"
            min="1"
            className="input input-bordered w-full max-w-xs"
            value={options.demand.workload?.minMemGib}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setOptions({
                ...options,
                demand: {
                  ...options.demand,
                  workload: {
                    ...options.demand.workload,
                    minMemGib: isNaN(value) ? 1 : value,
                  },
                },
              });
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Min storage (GiB)</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            step="1"
            placeholder="1"
            min="1"
            className="input input-bordered w-full max-w-xs"
            value={options.demand.workload?.minStorageGib}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setOptions({
                ...options,
                demand: {
                  ...options.demand,
                  workload: {
                    ...options.demand.workload,
                    minStorageGib: isNaN(value) ? 1 : value,
                  },
                },
              });
            }}
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-4">
          <span className="label-text">Debug (log to browser console)</span>
          <input
            disabled={disabled}
            type="checkbox"
            className="toggle"
            checked={options.enableLogging}
            onChange={(e) => {
              setOptions({
                ...options,
                enableLogging: e.target.checked,
              });
            }}
          />
        </label>
      </div>
    </form>
  );
}
