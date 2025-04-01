import { withContentCollections } from "@content-collections/next"
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: "/blog/zen-browser",
        destination: "https://taroj1205.poyo.jp/blog/zen-browser-april",
        permanent: true,
      },
    ]
  },
}

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform()
}

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig)
