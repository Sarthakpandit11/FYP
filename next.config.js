// /** @type {import("next").NextConfig} */
// module.exports = {
//     images: {
//     domains: ['t2.gstatic.com'], // Add the domain(s) you want to allow here
//   }
// }

/** @type {import("next").NextConfig} */
module.exports = {
  images: {
    domains: ['t2.gstatic.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false, 
    };
    return config;
  },
};
