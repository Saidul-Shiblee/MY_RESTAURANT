let URL = {};
if (process.env.ENVIRONMENT === "Development") {
  URL.BASE_URL = "http://localhost:3000";
} else {
  URL.BASE_URL = "https://foody-two.vercel.app";
}

export default URL;
