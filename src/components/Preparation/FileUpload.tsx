"use client";
import React from "react";
import FatHeading from "../Wrapped/FatHeading";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import MutedText from "../Wrapped/MutedText";

function FileUpload({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col gap-6 text-center bg-zinc-900 text-starship-400 dark p-6">
      <FatHeading className="text-3xl">
        Select your Google Maps
        <br />
        data to get started
      </FatHeading>

      <MutedText className="!text-zinc-200 text-base">
        Maps Unwrapped needs your maps data to generate your
        statistics.
        <br />
        
        
        You can upload either a <strong>.zip file </strong> or the extracted <strong>Takeout folder</strong> without any changes.
      </MutedText>
      <label htmlFor="file-upload">
        <Button
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <File size={16} className="mr-2" />
          Upload Here
        </Button>
      </label>

      <input
        type="file"
        accept=".zip"
        id="file-upload"
        className="hidden"
        ref={inputRef}
        webkitdirectory
        onChange={(e) => {
          if (e.target.files) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

export default FileUpload;
