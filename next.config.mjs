import { withContentCollections } from "@content-collections/next"
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
}

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform()
}

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig)
