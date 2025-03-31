"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientUpload from "./clientUpload";

export default async function Upload() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");
  if (!user) {
    redirect("/sign-in");
  }

  return <ClientUpload />;
}
