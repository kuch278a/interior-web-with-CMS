// cms/config.ts
// Configuration for connecting to the Strapi CMS instance.

export const CMS_BASE_URL: string = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
export const CMS_TOKEN: string = process.env.STRAPI_API_TOKEN || "REPLACE_WITH_STRAPI_API_TOKEN";
