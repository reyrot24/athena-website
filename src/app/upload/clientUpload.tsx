"use client";

import { useRef, useState } from "react";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const ClientUpload = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-16">
      <h1 className="text-text text-xl">Upload Your Video</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];
          setLoading(true);
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/video",
          });
          setLoading(false);
          setBlob(newBlob);
        }}
        className="flex flex-col gap-8"
      >
        <Input
          className="w-fit"
          name="file"
          ref={inputFileRef}
          type="file"
          required
        />
        <Button type="submit">Upload</Button>
      </form>
      {loading && <div className="text-text">Uploading...</div>}
      {blob && (
        <div className="text-text text-center">
          Blob url: <p className="text-accentYellow">{blob.url}</p>
        </div>
      )}
      <Button
        onClick={() => {
          setBlob(null);
          setLoading(false);
          inputFileRef.current!.value = "";
        }}
        className="w-fit"
      >
        Reset
      </Button>
    </div>
  );
};

export default ClientUpload;
