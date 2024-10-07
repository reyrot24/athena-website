import { createClient, type ClientConfig } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const config: ClientConfig = {
  projectId: process.env.PROJECT_ID,
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-07-27", // use current date (YYYY-MM-DD) to target the latest API version
};
export const client = createClient(config);

const builder = imageUrlBuilder(client);
export const urlFor = (source: string) => builder.image(source);
