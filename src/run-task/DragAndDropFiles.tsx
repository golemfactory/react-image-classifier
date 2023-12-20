import { DragEventHandler, useRef, useState } from "react";
import ClassifyButton from "./ClassifyButton";
import { TaskExecutor } from "@golem-sdk/react";

type FileInput = {
  file: File;
  id: string;
  imgSrc: string;
};

type DragAndDropFilesProps = {
  executor: TaskExecutor;
};

export default function DragAndDropFiles({ executor }: DragAndDropFilesProps) {
  const dropRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<FileInput[]>([]);

  const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files?.length) {
      setFiles((prev) => {
        const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
          file,
          id: globalThis.crypto.randomUUID(),
          imgSrc: URL.createObjectURL(file),
        }));
        return [...prev, ...newFiles];
      });
    }
  };

  const noFilesClasses = "h-96";

  return (
    <div
      ref={dropRef}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`min-w-[500px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-col gap-4
        ${files.length === 0 ? noFilesClasses : ""}
      `}
    >
      {files.length === 0 ? (
        <span>Drag and drop files here</span>
      ) : (
        <ul className="w-full flex flex-col gap-4 p-8">
          {files.map(({ file, id, imgSrc }) => (
            <li
              key={id}
              className="w-[600px] flex flex-row items-center justify-start gap-4 px-4"
            >
              <div className="h-16 w-24 border-2 border-gray-300 flex items-center justify-center">
                <img
                  draggable={false}
                  src={imgSrc}
                  alt={file.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-bold">{file.name}</span>
              <div className="flex-grow flex justify-end gap-4 items-center">
                <ClassifyButton executor={executor} file={file} />
                <button
                  className="btn btn-error"
                  onClick={() => setFiles(files.filter((f) => f.id !== id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
