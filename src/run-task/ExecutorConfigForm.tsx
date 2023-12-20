import { ExecutorOptions } from "@golem-sdk/react";

type ExecutorOptionsFormProps = {
  disabled: boolean;
  options: ExecutorOptions;
  setOptions: (config: ExecutorOptions) => void;
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
            value={options.subnetTag}
            onChange={(e) => {
              setOptions({
                ...options,
                subnetTag: e.target.value,
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
      <div className="grid grid-cols-5 gap-4 max-w-2xl  whitespace-nowrap">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Min CPU cores</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            step="0.1"
            placeholder="0.00"
            className="input input-bordered w-full max-w-xs"
            value={options.minCpuCores}
            onChange={(e) => {
              setOptions({
                ...options,
                minCpuCores: parseFloat(e.target.value),
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
            step="0.1"
            placeholder="0.00"
            className="input input-bordered w-full max-w-xs"
            value={options.minCpuThreads}
            onChange={(e) => {
              setOptions({
                ...options,
                minCpuThreads: parseFloat(e.target.value),
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
            step="0.1"
            placeholder="0.00"
            className="input input-bordered w-full max-w-xs"
            value={options.minMemGib}
            onChange={(e) => {
              setOptions({
                ...options,
                minMemGib: parseFloat(e.target.value),
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
            step="0.1"
            placeholder="0.00"
            className="input input-bordered w-full max-w-xs"
            value={options.minStorageGib}
            onChange={(e) => {
              setOptions({
                ...options,
                minStorageGib: parseFloat(e.target.value),
              });
            }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Budget (GLM)</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            step="0.1"
            placeholder="0.00"
            className="input input-bordered w-full max-w-xs"
            value={options.budget}
            onChange={(e) => {
              setOptions({
                ...options,
                budget: parseFloat(e.target.value),
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
