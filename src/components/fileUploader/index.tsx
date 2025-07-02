import { useRef, useState, useEffect } from "react";
import {
  FileUploaderRegular,
  type OutputFileEntry,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import type { FileEntry } from "@/types";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FC<IFileUploaderProps> = ({
  fileEntry,
  onChange,
}) => {
  const uploaderRef = useRef<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>(
    fileEntry.files || []
  );

  // Update local state when fileEntry from parent changes (optional sync)
  useEffect(() => {
    setUploadedFiles(fileEntry.files || []);
  }, [fileEntry.files]);

  const handleUploadSuccess = (file: OutputFileEntry) => {
    if (file.cdnUrl && file.uuid) {
      const newFiles = [...uploadedFiles, file];
      setUploadedFiles(newFiles);
      onChange({ files: newFiles }); // sync ke parent
    }
  };

  const handleRemoveFile = (uuid: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.uuid !== uuid);
    setUploadedFiles(updatedFiles);
    onChange({ files: updatedFiles }); // sync ke parent
  };

  return (
    <div>
      <FileUploaderRegular
        pubkey="3ead23bc925bbe24b4cf"
        multiple
        apiRef={uploaderRef}
        imgOnly
        onFileUploadSuccess={handleUploadSuccess}
      />

      <div className="grid grid-cols-2 gap-4 mt-8">
        {uploadedFiles.length === 0 && (
          <p className="text-sm text-gray-500 col-span-2">
            No images uploaded.
          </p>
        )}
        {uploadedFiles.map((file) => (
          <div className="relative" key={file.uuid || Math.random()}>
            {file.cdnUrl ? (
              <img
                src={`${file.cdnUrl}/-/preview/-/format/webp/`}
                alt="Preview"
                className="w-full h-auto rounded"
              />
            ) : (
              <p className="text-sm text-red-500">No preview available</p>
            )}
            <button
              type="button"
              className="absolute -right-2 -top-2 bg-white border border-gray-800 rounded-full w-7 h-7 text-gray-800"
              onClick={() => file.uuid && handleRemoveFile(file.uuid)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
