import { withContentCollections } from "@content-collections/next";
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: "export",
};
 
// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);