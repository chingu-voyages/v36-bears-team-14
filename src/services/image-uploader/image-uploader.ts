import AWS from "aws-sdk";
import {
  SPACES_ACCESS_TOKEN,
  SPACES_BUCKET_NAME,
  SPACES_DOMAIN,
  SPACES_ENDPOINT,
  SPACES_SECRET_KEY,
} from "../../environment";

const awsEndpoint = new AWS.Endpoint(SPACES_ENDPOINT!);
const spacesConfig = {
  domain: SPACES_DOMAIN!,
  bucketName: SPACES_BUCKET_NAME!,
};

export const uploadPhotoToCloud = async ({
  data,
  onSuccess,
  onError,
}: {
  data: any;
  onSuccess: (imageUrl: string) => void;
  onError: (message: string) => void;
}): Promise<void> => {
  uploadImageToSpaces({ data, onSuccess, onError });
};

const uploadImageToSpaces = async ({
  data,
  onSuccess,
  onError,
}: {
  data: any;
  onSuccess: (uploadedImageUrl: string) => void;
  onError: (message: string) => void;
}) => {
  const s3 = new AWS.S3({
    endpoint: awsEndpoint,
    accessKeyId: SPACES_ACCESS_TOKEN,
    secretAccessKey: SPACES_SECRET_KEY,
  });
  const blob = data[0];

  const params = {
    Body: blob,
    Bucket: spacesConfig.bucketName,
    Key: blob.name,
  };

  s3.putObject(params)
    .on("build", (request) => {
      request.httpRequest.headers.Host = spacesConfig.domain;
      request.httpRequest.headers["Content-Length"] = blob.size;
      request.httpRequest.headers["Content-Type"] = blob.type;
      request.httpRequest.headers["x-amz-acl"] = "public-read";
    })
    .send((err) => {
      if (err) {
        onError(`Unable to upload image: ${err.message}`);
      } else {
        const imageUrl = `${spacesConfig.domain}/${blob.name}`;
        onSuccess(imageUrl);
      }
    });
};
