import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** Client con permessi di scrittura: usalo solo dentro Server Actions. */
export function getWriteClient() {
  const token = process.env.CREATE_TOKEN;
  if (!token) return null;
  return client.withConfig({ token, useCdn: false });
}
