const isProductionMode = !(
  process.env.NODE_ENV && process.env.NODE_ENV.match("development")
);

const api_token = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_API_TOKEN
  : process.env.REACT_APP_DEV_API_TOKEN;

const auth_header = {
  Authorization: `Bearer ${api_token}`,
};

const apiUrl = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_DEV_API_URL;

const spacesAccessToken = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_SPACES_ACCESS_TOKEN
  : process.env.REACT_APP_DEV_SPACES_ACCESS_TOKEN;
const spacesSecretKey = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_SPACES_SECRET_KEY
  : process.env.REACT_APP_DEV_SPACES_SECRET_KEY;

const spacesEndPoint = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_SPACES_ENDPOINT
  : process.env.REACT_APP_DEV_SPACES_ENDPOINT;
const spacesDomain = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_SPACES_DOMAIN
  : process.env.REACT_APP_DEV_SPACES_DOMAIN;

const spacesBucketName = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_SPACES_BUCKET_NAME
  : process.env.REACT_APP_DEV_SPACES_BUCKET_NAME;
module.exports = {
  isProduction: isProductionMode,
  API_URL: apiUrl,
  API_TOKEN: api_token,
  AUTH_HEADER: auth_header,
  SPACES_ACCESS_TOKEN: spacesAccessToken,
  SPACES_SECRET_KEY: spacesSecretKey,

  SPACES_ENDPOINT: spacesEndPoint,
  SPACES_DOMAIN: spacesDomain,
  SPACES_BUCKET_NAME: spacesBucketName,
};
