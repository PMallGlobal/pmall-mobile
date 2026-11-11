const PRODUCTION_API_URL = "https://api.pmall.com.ng/api/v1";

const APP_ENV = process.env.REACT_APP_ENV || "development";

const configuredApiUrl = (
  process.env.REACT_APP_API_BASE_URL || ""
).trim().replace(/\/+$/, "");

if (APP_ENV === "staging") {
  if (!configuredApiUrl) {
    throw new Error(
      "PMALL staging requires REACT_APP_API_BASE_URL."
    );
  }

  if (
    configuredApiUrl !== "https://stage.api.pmall.com.ng/api/v1"
  ) {
    throw new Error(
      "PMALL staging must use the approved staging API endpoint."
    );
  }
}

export const BASE_URL =
  configuredApiUrl || PRODUCTION_API_URL;
