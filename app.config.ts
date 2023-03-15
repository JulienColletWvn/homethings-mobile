require("dotenv").config();

module.exports = () => ({
  expo: {
    name: "Homethings",
    slug: "homethings",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#1E1F1E",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.qlist.homethings",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#1E1F1E",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      baseUrl: process.env.API_URL,
      eas: {
        projectId: "9026c47d-21f4-46dc-991d-d078369b0cfb",
      },
    },
    owner: "qlist",
  },
});
