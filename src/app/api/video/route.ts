import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      body,
      request,
      // Chiamato dal browser: qui c'è il cookie di sessione dell'area riservata.
      // (La notifica di fine upload arriva invece dai server di Vercel, firmata.)
      onBeforeGenerateToken: async () => {
        if (!(await isAuthenticated())) throw new Error("Sessione scaduta: accedi di nuovo.");
        return {
          allowedContentTypes: ["video/mp4"],
          maximumSizeInBytes: 500 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Video caricato su Vercel Blob:", blob.url);
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
