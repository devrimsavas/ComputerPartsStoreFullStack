// next.config.ts
//add images api inside domains with comma 
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.restapi.co.za"],
  },
};

export default nextConfig;
