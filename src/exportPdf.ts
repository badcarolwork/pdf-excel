import { AdSpec } from "./data";

declare const html2pdf: any;

function stripHtml(str: string): string {
  return String(str || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function buildPdfDom(specs: AdSpec[]): HTMLElement {
  const root = document.createElement("div");
  root.id = "pdf-root";
  root.style.cssText = "width:794px;background:#fff;font-family:Arial,sans-serif;";

  const coverHtml = `
    <div style="width:794px;padding:60px 48px;background:#fff;text-align:center;page-break-after:always;">
      <div style="display:inline-block;margin-bottom:24px;">
        <div style="height:4px;background:linear-gradient(90deg,#FF6EC7 0%,#03FFFF 50%,#FF6A3D 100%);border-radius:2px;margin-bottom:16px;"></div>
        <h1 style="font-size:36px;font-weight:800;color:#0D0D0D;margin:0 0 8px;letter-spacing:-1px;">Ad Spec Bundle</h1>
        <p style="font-size:14px;color:#888;margin:0;">Generated ${new Date().toLocaleString()}</p>
      </div>
      <div style="margin-top:40px;">
        <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#aaa;margin:0 0 16px;">Contents</h2>
        <ol style="text-align:left;display:inline-block;padding:0;list-style:none;">
          ${specs.map((s, i) => `<li style="padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;"><span style="color:#ccc;margin-right:12px;">${String(i + 1).padStart(2, "0")}</span>${s.title}</li>`).join("")}
        </ol>
      </div>
    </div>
  `;

  const pagesHtml = specs
    .map(
      (s, i) => `
    <div style="width:794px;padding:48px;background:#fff;${i < specs.length - 1 ? "page-break-after:always;" : ""}">
      <div style="height:3px;background:linear-gradient(90deg,#FF6EC7,#03FFFF,#FF6A3D);border-radius:2px;margin-bottom:24px;"></div>
      <h2 style="font-size:24px;font-weight:800;color:#0D0D0D;margin:0 0 8px;letter-spacing:-0.5px;">${s.title}</h2>
      <p style="font-size:13px;color:#555;line-height:1.6;margin:0 0 16px;">${stripHtml(s.description)}</p>
      <div style="display:flex;gap:16px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="background:#F5F3EE;border-radius:6px;padding:8px 14px;">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#999;display:block;margin-bottom:2px;">Dimensions</span>
          <span style="font-size:12px;color:#333;font-weight:600;">${s.dimension}</span>
        </div>
        ${s.remark ? `<div style="background:#FFF8F5;border-radius:6px;padding:8px 14px;flex:1;">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#999;display:block;margin-bottom:2px;">Remark</span>
          <span style="font-size:12px;color:#555;">${stripHtml(s.remark)}</span>
        </div>` : ""}
      </div>
      <a href="${s.link}" target="_blank" style="display:inline-block;background:#0D0D0D;color:#fff;border-radius:6px;padding:8px 18px;font-size:12px;text-decoration:none;font-weight:600;margin-bottom:20px;">View Demo →</a>
      <h3 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#aaa;margin:0 0 10px;">Asset Specifications</h3>
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <thead>
          <tr style="background:#0D0D0D;">
            <th style="text-align:left;padding:10px 12px;color:#fff;font-weight:600;width:25%;">Component</th>
            <th style="text-align:left;padding:10px 12px;color:#fff;font-weight:600;width:12%;">Quantity</th>
            <th style="text-align:left;padding:10px 12px;color:#fff;font-weight:600;width:45%;">Size</th>
            <th style="text-align:left;padding:10px 12px;color:#fff;font-weight:600;width:18%;">Format</th>
          </tr>
        </thead>
        <tbody>
          ${s.table
            .map(
              (row, ri) => `
            <tr style="background:${ri % 2 === 0 ? "#fff" : "#F9F8F5"};">
              <td style="padding:9px 12px;color:#222;border-bottom:1px solid #eee;font-weight:500;">${row.component}</td>
              <td style="padding:9px 12px;color:#555;border-bottom:1px solid #eee;">${row.quantity}</td>
              <td style="padding:9px 12px;color:#555;border-bottom:1px solid #eee;white-space:pre-line;">${row.size}</td>
              <td style="padding:9px 12px;color:#555;border-bottom:1px solid #eee;">${row.format}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin-top:20px;font-size:10px;color:#ccc;letter-spacing:1px;">SLUG: ${s.slug}</p>
    </div>
  `
    )
    .join("");

  root.innerHTML = coverHtml + pagesHtml;
  return root;
}

export async function downloadPdf(specs: AdSpec[]): Promise<void> {
  if (!specs.length) return;

  const stage = document.getElementById("pdf-render-stage")!;
  stage.innerHTML = "";
  Object.assign(stage.style, {
    position: "fixed",
    top: "0",
    left: "-9999px",
    width: "794px",
    zIndex: "9999",
    background: "#fff",
    visibility: "visible",
    overflow: "visible",
    pointerEvents: "none",
  });

  const dom = buildPdfDom(specs);
  stage.appendChild(dom);

  await new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 300)));

  await html2pdf()
    .set({
      filename: "KULT_AdSpec_Bundle.pdf",
      margin: 0,
      enableLinks: true,
      html2canvas: { scale: 2, backgroundColor: "#fff", useCORS: true, logging: false },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css"] },
    })
    .from(dom)
    .save();

  stage.innerHTML = "";
  stage.removeAttribute("style");
}
