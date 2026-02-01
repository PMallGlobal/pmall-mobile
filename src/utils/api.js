let BASE_URL = '';
if (process.env.NODE_ENV === 'development') {
  BASE_URL = ``;
}
export default BASE_URL;
