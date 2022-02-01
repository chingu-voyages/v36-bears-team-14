import UploadIcon from "./upload-icon.svg";
import SendUpload from "./send-upload.svg";
import "./image-uploader-style.css";
import { useState } from "react";
import { PhotoUploadType } from "../../services/photo-uploader/photo-uploader.types";

interface IImageUploaderProps {
  uploadType: PhotoUploadType;
}

function ImageUploader(props: IImageUploaderProps) {
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [fileData, setFileData] = useState<any>(null);
  const handleOnFileInputChange = (event: any) => {
    console.log(event.target.files);
    if (event.target && event.target.files && event.target.files.length === 1) {
      setIsFileSelected(true);
      setFileData(event.target.files[0]);
    }
  };

  const handleOnUpload = () => {
    // Do some operation
  };
  return (
    <div className={`ImageUploader__main`}>
      <img src={UploadIcon} alt="upload" />
      <input
        type="file"
        name="upload"
        className={`upload-input`}
        accept="image/png, image/jpeg"
        onChange={handleOnFileInputChange}
      />
      {isFileSelected && (
        <div className={`ImageUploader__sendUploadIcon`}>
          <img src={SendUpload} alt="send" onClick={handleOnUpload} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
