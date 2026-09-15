/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        // Browsers whose first language is Thai land on the Thai page.
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "th(?:-[A-Za-z]+)?(?:[,;].*)?" }],
        destination: "/th",
        permanent: false,
      },
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
