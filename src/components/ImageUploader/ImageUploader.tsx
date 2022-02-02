import UploadIcon from "./upload-icon.svg";
import SendUpload from "./send-upload.svg";
import "./image-uploader-style.css";
import { useState } from "react";
import { uploadPhotoToCloud } from "../../services/image-uploader/image-uploader";
import ErrorMessage from "../ErrorMessage";

interface IImageUploaderProps {
  onUploadSuccess?: (url: string) => void;
}

function ImageUploader(props: IImageUploaderProps) {
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [fileData, setFileData] = useState<FileList | null>(null);
  const [isImageUploadSuccessful, setIsImageUploadSuccessful] =
    useState<boolean>(false);
  const [isUploadError, setIsUploadError] = useState<boolean>(false);
  const handleOnFileInputChange = (event: any) => {
    if (event.target && event.target.files && event.target.files.length === 1) {
      setIsFileSelected(true);
      setFileData(event.target.files);
    }
  };

  const handleOnImageUploadSuccess = (url: string) => {
    setIsImageUploadSuccessful(true);
    // We can dispatch an action to our API in the upper-scope
    props.onUploadSuccess && props.onUploadSuccess(url);
  };

  const handleOnImageUploadError = () => {
    setIsUploadError(true);
  };
  const handleOnUpload = () => {
    if (fileData && fileData.length > 0) {
      uploadPhotoToCloud({
        data: fileData,
        onSuccess: handleOnImageUploadSuccess,
        onError: () => handleOnImageUploadError,
      });
    }
  };
  return (
    <div className={`ImageUploader__main`}>
      <img src={UploadIcon} alt="upload" />
      {!isImageUploadSuccessful && (
        <input
          type="file"
          name="upload"
          className={`upload-input`}
          accept="image/png, image/jpeg"
          onChange={handleOnFileInputChange}
        />
      )}

      {isFileSelected && !isImageUploadSuccessful && (
        <div className={`ImageUploader__sendUploadIcon`}>
          <img src={SendUpload} alt="send" onClick={handleOnUpload} />
        </div>
      )}
      {isUploadError && (
        <div className={`ImageUploader__uploadError flex-container`}>
          <ErrorMessage text="Error uploading" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
