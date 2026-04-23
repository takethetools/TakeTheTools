/**
 * AdSense Ad Slot Configuration
 * 
 * HOW TO USE:
 * 1. Go to Google AdSense → Ads → By ad unit → Create new ad unit
 * 2. Create 5 ad units with these names:
 *    - "Header Banner" (Horizontal/Auto)
 *    - "In-Content Auto" (Responsive Auto)
 *    - "Rectangle Sidebar" (Rectangle 300x250)
 *    - "Horizontal In-Article" (Horizontal)
 *    - "Footer Auto" (Auto)
 * 3. Copy each slot ID and paste below
 * 4. Redeploy the site
 * 
 * Until you create separate slots, the same slot ID works but
 * limits AdSense optimization capabilities.
 */

export const AD_SLOTS = {
  // Top banner / header area ads
  HEADER_BANNER: "2317951509",        // Replace with your Header Banner slot ID

  // Auto ads between content sections
  IN_CONTENT_AUTO: "1525640166",      // Replace with your In-Content slot ID

  // Rectangle ads for sidebar
  SIDEBAR_RECTANGLE: "7337416228",    // Replace with your Rectangle slot ID

  // Horizontal ads within articles/tool pages
  IN_ARTICLE_HORIZONTAL: "1883051203", // Replace with your Horizontal slot ID

  // Footer / bottom of page ads
  FOOTER_AUTO: "2224478316",          // Replace with your Footer slot ID
} as const;

export const ADSENSE_CLIENT = "ca-pub-3148286057781421";