/** Cached base64 of the subset CJK font used for Unicode PDF text. */
let cachedFontBase64: string | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export const PDF_UNICODE_FONT = "NotoSansSC";

/**
 * Load a UTF-8 capable CJK subset into jsPDF (Helvetica cannot render 中文).
 * Font file: public/fonts/NotoSansSC-PDF.ttf
 */
export async function ensurePdfUnicodeFont(doc: {
  addFileToVFS: (filename: string, data: string) => void;
  addFont: (postScriptName: string, fontName: string, fontStyle: string) => void;
  setFont: (fontName: string, fontStyle?: string) => void;
}): Promise<string> {
  if (!cachedFontBase64) {
    const response = await fetch("/fonts/NotoSansSC-PDF.ttf");
    if (!response.ok) {
      throw new Error(`Failed to load PDF font (${response.status}).`);
    }
    cachedFontBase64 = arrayBufferToBase64(await response.arrayBuffer());
  }
  const vfsName = "NotoSansSC-PDF.ttf";
  doc.addFileToVFS(vfsName, cachedFontBase64);
  doc.addFont(vfsName, PDF_UNICODE_FONT, "normal");
  doc.addFont(vfsName, PDF_UNICODE_FONT, "bold");
  doc.setFont(PDF_UNICODE_FONT, "normal");
  return PDF_UNICODE_FONT;
}
