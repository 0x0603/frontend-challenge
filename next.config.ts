import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Automatically inject shared Sass modules (no need to @use in every file)
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src")],
    additionalData: '@use "styles/responsive" as *; @use "styles/utils" as *;',
  },
};

export default nextConfig;
