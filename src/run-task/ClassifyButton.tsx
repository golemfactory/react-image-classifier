import { TaskExecutor, Worker, useTask } from "@golem-sdk/react";
import useModal from "../modal/useModal";
import ResultsModalContent from "../results/ResultsModalContent";

type Result = Array<{ label: string; score: number; box: Array<number> }>;

function readFile(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = () => {
      resolve(new Uint8Array(fileReader.result as ArrayBuffer));
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

async function classifyOnGolem(
  image: File,
  runFunction: (ctx: Worker<Result>) => Promise<void>
) {
  const extension = image.name.split(".").pop();
  const input = `/golem/input/img.${extension}`;
  const output = `/golem/output/results.json`;
  const imageData = await readFile(image);

  await runFunction(async (ctx) => {
    await ctx.uploadData(imageData, input);
    await ctx.run(`python3 run.py --file-name="${input}"`);
    const result = await ctx.downloadData(output);
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(result.data));
  });
}

type ClassifyButtonProps = {
  executor: TaskExecutor;
  file: File;
};

export default function ClassifyButton({
  executor,
  file,
}: ClassifyButtonProps) {
  const { run, error, isRunning, result } = useTask<Result>(executor);

  const { openModal } = useModal();

  if (isRunning) {
    return <span className="font-bold">Classifying...</span>;
  }

  if (error) {
    return <span className="text-error font-bold">Error: {error.message}</span>;
  }

  if (result) {
    return (
      <button
        className="btn btn-success"
        onClick={() => {
          openModal(
            <ResultsModalContent
              result={result}
              imageSrc={URL.createObjectURL(file)}
            />
          );
        }}
      >
        View result
      </button>
    );
  }

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        classifyOnGolem(file, run);
      }}
    >
      Classify
    </button>
  );
}
