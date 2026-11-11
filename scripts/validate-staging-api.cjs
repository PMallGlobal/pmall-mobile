const PROD_HOST = "api.pmall.com.ng";

function fail(message) {
  console.error(`STAGING CONFIG ERROR: ${message}`);
  process.exit(1);
}

if (process.env.REACT_APP_ENV !== "staging") {
  fail("REACT_APP_ENV must equal staging.");
}

const value = (process.env.REACT_APP_API_BASE_URL || "").trim();

if (!value) {
  fail("REACT_APP_API_BASE_URL is required.");
}

let url;

try {
  url = new URL(value);
} catch {
  fail("REACT_APP_API_BASE_URL must be a valid URL.");
}

if (url.protocol !== "https:") {
  fail("Staging API must use HTTPS.");
}

if (url.hostname.toLowerCase() !== "stage.api.pmall.com.ng") {
  fail("Only the approved PMALL staging API hostname is allowed.");
}

if (url.port || url.pathname !== "/api/v1") {
  fail("Staging API must use the approved HTTPS endpoint and /api/v1 path.");
}

if (url.username || url.password || url.search || url.hash) {
  fail("API URL must not contain credentials, queries, or fragments.");
}

console.log("Staging API configuration passed preliminary validation.");
