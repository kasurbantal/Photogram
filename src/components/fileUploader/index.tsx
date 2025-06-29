import { useRef, useState } from "react";
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
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);

  const handleUploadSuccess = (file: OutputFileEntry) => {
    const newFiles = [...uploadedFiles, file];
    setUploadedFiles(newFiles);
    onChange({ files: newFiles });
  };

  const handleRemoveFile = (uuid: string) => {
    const updatedFiles = fileEntry.files.filter((file) => file.uuid !== uuid);
    onChange({ files: updatedFiles });
    setUploadedFiles(updatedFiles);
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
        {fileEntry.files.map((file) => (
          <div className="relative" key={file.uuid}>
            {file.cdnUrl && (
              <img
                src={file.cdnUrl}
                alt="Preview"
                className="w-full h-auto rounded"
              />
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
