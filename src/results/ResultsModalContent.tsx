import Decimal from "decimal.js";
import { useRef } from "react";

const COLORS = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff8000",
  "#ff0080",
  "#80ff00",
];

type ResultsModalContentProps = {
  result: Array<{ label: string; score: number; box: Array<number> }>;
  imageSrc: string;
};

function getContainedSize(img: HTMLImageElement) {
  const { naturalWidth, naturalHeight, width, height } = img;
  const ratio = naturalWidth / naturalHeight;
  const calculatedWidth = height * ratio;
  const isWidthGreater = calculatedWidth > width;
  return [
    isWidthGreater ? width : calculatedWidth,
    isWidthGreater ? width / ratio : height,
  ];
}

export default function ResultsModalContent({
  result,
  imageSrc,
}: ResultsModalContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function drawBoxes(highlightIndex?: number) {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const [width, height] = getContainedSize(img);
    canvas.width = width;
    canvas.height = height;

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const xScale = width / naturalWidth;
    const yScale = height / naturalHeight;

    ctx.scale(xScale, yScale);

    result.forEach((r, index) => {
      const [xMin, yMin, xMax, yMax] = r.box;
      ctx.strokeStyle = COLORS[index % COLORS.length];
      ctx.lineWidth = 4;
      ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);

      if (index === highlightIndex) {
        ctx.fillStyle = COLORS[index % COLORS.length] + "AA";
        ctx.fillRect(xMin, yMin, xMax - xMin, yMax - yMin);
      }
    });
  }

  return (
    <div className="card card-compact max-w-[80vw] bg-base-100 shadow-xl p-4">
      <div className="flex flex-row gap-4 overflow-hidden">
        <div className="h-[80vh] w-[80%] relative">
          <div className="absolute flex justify-center items-center h-full w-full">
            <canvas ref={canvasRef} />
          </div>
          <img
            src={imageSrc}
            ref={imgRef}
            alt="Classified image"
            className="h-full w-full object-contain "
            onLoad={() => drawBoxes()}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-1" onMouseLeave={() => drawBoxes()}>
            {result.map((r, index) => (
              <div
                className="flex flex-row justify-between gap-4 border-2 border-gray-300 p-2
                    hover:bg-gray-300 hover:border-gray-400 hover:cursor-pointer
                    "
                key={`${r.label}-${r.score}-${index}`}
                onMouseEnter={() => drawBoxes(index)}
              >
                <span className="font-bold">{r.label}</span>
                <span>({new Decimal(r.score).mul(100).toFixed(2)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
