const apiUrl = process.env.API_URL || "http://localhost:5000";

const proxiedResources = ["studios", "bookings", "wishlist"];

const nextConfig = {
  async rewrites() {
    return proxiedResources.flatMap((resource) => [
      {
        source: `/api/${resource}`,
        destination: `${apiUrl}/api/${resource}`,
      },
      {
        source: `/api/${resource}/:path*`,
        destination: `${apiUrl}/api/${resource}/:path*`,
      },
    ]);
  },
};

export default nextConfig;
