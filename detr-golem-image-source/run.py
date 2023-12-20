from transformers import DetrImageProcessor, DetrForObjectDetection
import torch
from PIL import Image
import json
import argparse

parser = argparse.ArgumentParser(description="Process some arguments.")
parser.add_argument("--file-name", dest="file_name", type=str, help="File name")
args = parser.parse_args()

if not args.file_name:
    raise ValueError("Please provide a file name.")

image = Image.open(args.file_name)

# you can specify the revision tag if you don't want the timm dependency
processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50", revision="no_timm")
model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50", revision="no_timm")

inputs = processor(images=image, return_tensors="pt")
outputs = model(**inputs)

# convert outputs (bounding boxes and class logits) to COCO API
# let's only keep detections with score > 0.9
target_sizes = torch.tensor([image.size[::-1]])
results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]

# Create the results array
results_arr = []
for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
    results_arr.append({
        "label": model.config.id2label[label.item()],
        "score": round(score.item(), 3),
        "box": [round(i, 2) for i in box.tolist()]
    })

# Write the results to a JSON file
with open("/golem/output/results.json", "w") as f:
    json.dump(results_arr, f)
