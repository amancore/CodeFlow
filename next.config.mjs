// @type {import('next').NextConfig}
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
	images: {
		unoptimized: true,
	},
	output: isProd ? "export" : undefined, // only export in production
	distDir: isProd ? "build" : ".next", // build folder
	basePath: isProd ? "/CodeFlow" : "",
	assetPrefix: isProd ? "/CodeFlow/" : "",
};

export default nextConfig;
