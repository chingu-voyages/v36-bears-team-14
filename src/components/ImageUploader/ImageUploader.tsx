import UploadIcon from "./upload-icon.svg";
import SendUpload from "./send-upload.svg";
import "./image-uploader-style.css";
import { useState } from "react";
import { uploadPhotoToCloud } from "../../services/image-uploader/image-uploader";
import ErrorMessage from "../ErrorMessage";

interface IImageUploaderProps {
  onUploadSuccess?: (url: string) => void;
  customClassNames?: string;
}

function ImageUploader(props: IImageUploaderProps) {
  const [, setIsFileSelected] = useState<boolean>(false);
  const [, setIsImageUploadSuccessful] = useState<boolean>(false);
  const [isUploadError, setIsUploadError] = useState<boolean>(false);
  const handleOnFileInputChange = (event: any) => {
    if (event.target && event.target.files && event.target.files.length === 1) {
      setIsFileSelected(true);
      if (event.target.files.length && event.target.files.length > 0) {
        uploadPhotoToCloud({
          data: event.target.files,
          onSuccess: handleOnImageUploadSuccess,
          onError: () => handleOnImageUploadError,
        });
      }
    }
  };

  const handleOnImageUploadSuccess = (url: string) => {
    setIsImageUploadSuccessful(true);
    setIsFileSelected(false);
    // We can dispatch an action to our API in the upper-scope
    props.onUploadSuccess && props.onUploadSuccess(url);
  };

  const handleOnImageUploadError = () => {
    setIsUploadError(true);
  };
  // const handleOnUpload = () => {
  //   if (fileData && fileData.length > 0) {
  //     uploadPhotoToCloud({
  //       data: fileData,
  //       onSuccess: handleOnImageUploadSuccess,
  //       onError: () => handleOnImageUploadError,
  //     });
  //   }
  // };
  return (
    <div
      className={`ImageUploader__main ${
        props.customClassNames ? props.customClassNames : ""
      }`}
    >
      <img src={UploadIcon} alt="upload" />

      <input
        type="file"
        name="upload"
        className={`upload-input`}
        accept="image/png, image/jpeg"
        onChange={handleOnFileInputChange}
      />

      {/* {isFileSelected && (
        <div className={`ImageUploader__sendUploadIcon`}>
          <img src={SendUpload} alt="send" />
        </div>
      )} */}
      {isUploadError && (
        <div className={`ImageUploader__uploadError flex-container`}>
          <ErrorMessage text="Error uploading" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
