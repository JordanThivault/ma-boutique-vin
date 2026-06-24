import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Hook + helper pour piloter l'upload depuis nos propres boutons
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
