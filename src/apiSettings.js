let BASE_URL;

switch (process.env.REACT_APP_ENV) {
  case "dev":
    BASE_URL = "http://localhost:5000/api/kimono/";
    break;

  default:
    BASE_URL = "http://localhost:9082/api/kimono/";
    break;
}

export default BASE_URL;
