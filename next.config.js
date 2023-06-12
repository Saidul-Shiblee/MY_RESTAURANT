/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    CLOUDINARY_NAME: "dvxrxaens",
    CLOUDINARY_API_KEY: "311732954488955",
  },
  experimental: {
    externalDir: true,
  },
  // Potential new config flag:
  disableExperimentalFeaturesWarning: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "sipbitego.com",
      "www.foodiecrush.com",
      "res.cloudinary.com",
    ],
  },
};
