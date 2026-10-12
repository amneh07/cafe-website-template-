// Set NEXT_PUBLIC_SITE_URL to the real domain when you deploy
export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Search engines are blocked by default so a demo site never gets indexed.
// For a real client site, set NEXT_PUBLIC_ALLOW_INDEXING=true
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";