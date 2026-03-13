import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/private/",
          "/wp-admin",
          "/wp-login.php",
          "/wp-includes",
          "/xmlrpc.php",
          "/.env",
          "/.git",
          "/config",
          "/phpmyadmin",
        ],
      },
    ],
    sitemap: "https://takethetools.com/sitemap.xml",
  };
}
