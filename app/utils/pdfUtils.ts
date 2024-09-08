"use server";
import { Paper } from "@/components/Paper";
import { createClientServer } from "@/utils/supabase/server";

export async function saveLikedPdf(paper: Paper, userId: string) {
  const supabase = createClientServer();
  const b = await supabase.from("saved_pdfs").insert([
    {
      // title text not null,
      // summary text not null,
      // pdfUrl text not null,
      // owner text not null

      title: paper.name,
      summary: paper.summary,
      pdfurl: paper.pdfUrl,
      owner: userId,
    },
  ]);
  console.log(b);
}

export async function getLikedPdfs(userId: string): Promise<Paper[]> {
  const supabase = createClientServer();
  const { data, error } = await supabase
    .from("saved_pdfs")
    .select("*")
    .eq("owner", userId);
  if (error) {
    console.error("Error fetching liked PDFs:", error);
    return [];
  }
  return data.map((d) => ({
    name: d.title,
    summary: d.summary,
    pdfUrl: d.pdfurl,
  }));
}
