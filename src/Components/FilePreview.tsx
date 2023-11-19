import Image from "next/image";
import React from "react";

export default function FilePreview({ filePreview }) {
  console.log(filePreview);
  return (
    <div className="file-preview flex-center">
      <Image src={filePreview.url} width={64} height={64} alt="img-preview" />
    </div>
  );
}
