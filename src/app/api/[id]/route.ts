import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const match = id.match(/^file-(.*?)-pdf$/);
  const exID = match?.[1];

  if (!exID) {
    return NextResponse.json(
      { error: "Invalid file id format" },
      { status: 400 }
    );
  }

  try {
    const pdfUrl = `https://cdn.sanity.io/files/${process.env.PROJECT_ID}/production/${exID}.pdf`;
    const response = await fetch(pdfUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch the PDF" },
        { status: response.status }
      );
    }

    const pdfStream = response.body;

    return new NextResponse(pdfStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${id}.pdf"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
