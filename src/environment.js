const isProductionMode = !(
  process.env.NODE_ENV && process.env.NODE_ENV.match("development")
);

const api_token = isProductionMode
  ? process.env.REACT_APP_PRODUCTION_API_TOKEN
  : process.env.REACT_APP_DEV_API_TOKEN;

const auth_header = {
  Authorization: `Bearer ${api_token}`,
};

module.exports = {
  isProduction: isProductionMode,
  API_URL: isProductionMode
    ? process.env.REACT_APP_PRODUCTION_API_URL
    : process.env.REACT_APP_DEV_API_URL,
  API_TOKEN: api_token,
  AUTH_HEADER: auth_header,
};
