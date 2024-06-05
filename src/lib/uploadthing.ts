//These lines import the generateUploadButton and generateUploadDropzone functions from the @uploadthing/react library.

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

//This line imports the OurFileRouter type from the @/app/api/uploadthing/core module. This type is likely used by the generateUploadButton and generateUploadDropzone functions to define the file routing behavior.
import type { OurFileRouter } from "@/app/api/uploadthing/core";

//These lines use the imported functions to generate the UploadButton and UploadDropzone components. They are typed with the OurFileRouter type to define the file routing behavior for the upload components.
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

//Overall, this code sets up the UploadButton and UploadDropzone components for file uploading using the @uploadthing/react library, with the file routing behavior defined by the OurFileRouter type.
