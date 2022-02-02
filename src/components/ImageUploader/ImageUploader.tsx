import UploadIcon from "./upload-icon.svg";
import SendUpload from "./send-upload.svg";
import "./image-uploader-style.css";
import { useState } from "react";
import {
  PhotoUploadType,
  TProfilePhotoUploadContext,
  TRecipePhotoUploadContext,
} from "../../services/image-uploader/image-uploader.types";
import { uploadPhotoToApi } from "../../services/image-uploader/image-uploader";

interface IImageUploaderProps {
  uploadType: PhotoUploadType;
  context: TProfilePhotoUploadContext | TRecipePhotoUploadContext;
}

function ImageUploader(props: IImageUploaderProps) {
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [fileData, setFileData] = useState<FileList | null>(null);
  const handleOnFileInputChange = (event: any) => {
    console.log(event.target.files);
    if (event.target && event.target.files && event.target.files.length === 1) {
      setIsFileSelected(true);
      setFileData(event.target.files);
    }
  };

  const handleOnUpload = () => {
    // Do some operation
    if (fileData && fileData.length > 0) {
      uploadPhotoToApi({
        data: fileData,
        uploadType: props.uploadType,
        context: props.context,
        onSuccess: () => {},
        onError: () => {},
      });
    }
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
