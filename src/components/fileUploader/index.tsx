import * as React from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

interface IFileUploaderProps {}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = () => {
  return (
    <>
      <div>
        <FileUploaderRegular
          sourceList="local, camera, facebook, gdrive"
          classNameUploader="uc-light"
          pubkey="3ead23bc925bbe24b4cf"
        />
      </div>
    </>
  );
};

export default FileUploader;
