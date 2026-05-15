const KEY = "ad_spec_list_slugs";

function loadList() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function saveList(v) {
  localStorage.setItem(KEY, JSON.stringify(v));
}

function clearList() {
  localStorage.removeItem(KEY);
  renderList();
  syncButtons();
}

function addSpec(slug) {
  const list = loadList();
  if (!list.includes(slug)) {
    if (list.length >= 5) {
      alert("Max 5 specs.");
      return;
    }
    list.push(slug);
    saveList(list);
  }
  renderList();
  syncButtons();
}

function removeSpec(slug) {
  saveList(loadList().filter((x) => x !== slug));
  renderList();
  syncButtons();
}

function getSpec(slug) {
  return SPECS.find((s) => s.slug === slug);
}

function renderSpecs() {
  const el = document.getElementById("addCart");
  el.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add-slug]");
    if (!btn) return;
    addSpec(btn.getAttribute("data-add-slug"));
  });
}

function renderList() {
  const slugs = loadList();
  const el = document.getElementById("list");

  if (!slugs.length) {
    el.innerHTML = "<em>No specs selected.</em>";
    document.getElementById("specDL-download-btn").style.display = "none";
    document.getElementById("specDL-download-dot").style.display = "none";
    return;
  }

  document.getElementById("specDL-download-dot").style.display = "block";
  el.innerHTML = slugs
    .map((slug) => {
      const s = getSpec(slug);
      if (!s) return "";
      return `
        <div id="specDL-list" class="row" style="justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;">
          <div class="specDL-title"><b>${s.title}</b></div>
          <a class="pill-btn secondary specDL-remove" onclick="removeSpec('${slug}')">
            <span class="badge">×</span>
            Remove
          </a>
        </div>
      `;
    })
    .join("");

  document.getElementById("specDL-download-btn").style.display = "flex";
}

function syncButtons() {
  const slugs = loadList();
  const count = slugs.length;
  const dot = document.getElementById("specDL-download-dot");

  if (dot) {
    if (count > 0) {
      dot.style.display = "flex";
      dot.textContent = count;
    } else {
      dot.style.display = "none";
      dot.textContent = "";
    }
  }

  document.querySelectorAll("[data-add-slug]").forEach((btn) => {
    const slug = btn.getAttribute("data-add-slug");
    const added = slugs.includes(slug);
    btn.disabled = added;
    btn.innerHTML = added
      ? `<span class="badge">✓</span> Added`
      : `<span class="badge">＋</span> Add to download`;
  });
}

function placeholderImage(base64Img, text) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="700" height="260">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="14" y="14" width="672" height="232" fill="#fff" stroke="#d1d5db" stroke-width="2"/>
      <image href="${base64Img}" x="14" y="14" width="672" height="232" preserveAspectRatio="xMidYMid meet"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="24" fill="#6b7280">${base64Img ? "" : text}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function buildPdfDom(specs) {
  const root = document.createElement("div");
  root.id = "specDL-root";
  const colthead = ["18%", "18%", "46%", "18%"];

  root.innerHTML = `
    <div class="specDL-page specDL-pageBreak specDL-cover">
      <div style="display:inline-block;text-align:center;">
        <img style="width:80%;height:auto;margin-bottom:10px;margin-left:auto;margin-right:auto;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAABHCAYAAAAwcWolAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVcSURBVHgB7d3/cdxEGMbxb5j8j6kgmwoIFaBUQKiASwWBCiJXAFSQowKSCnKpAFNBlgpIB6B3ZPtu7PP9sN5XWq2ez8wOJONJHNuPtO+72tUT4OduvMHH7934DX9/deMCfz9242rP73/sRsLHy25k/Hl+337pxvsjH2Pf1x8Y7+/z8Jll+fCUPigJHxGhe9uNF/i7ZH+YzfNuPKNsY3/fSv852SexLF9/RdlW3Wjx9ynozxWZVMmBTvR3Z2+Z/kIhUp2SA+1Zx+6yujkjUqFSA2135oS/Q3WzyOyVGOhXxNS371HdLJUrLdCpG7/iL9MvlYhUrbRA/0nMVDtqLVikKCUFOnK9OSOyAKUEOqpuXqO6WRakhEAnVDeLuCgh0O+Iq5u/ILIgUwfa6uYGf3ZnzogszJSBboipb6N2fIkU7ynTSPRTbW8ZNcFk6xJ/XvsL7InFD/i6mirQ1gRL+LJ6WXWz7Grx5xnoFmdTTLntC/IKf1pvlsUbO9D24EiLP9XNIowb6ET/aKe3TH8cj8jijRnoyLpZRBgv0FF1s9abRXaMEehETN1sTbA1InIrOtCJ/ighbxmtN4vcEx3oFv+6OaO6WWSvyEBb3fwT/lQ3izwgKtCJuLp5jDcuiMxSRKDtrQgRdXPIo3IiNfEOtL37KOI87Ux/nraIHOC9OSPiTDDzGtXNIkeV/m4rY3XzBhE5ag6BXiMiJ5lDoCMOEBSp0hwCbc+AN4jIUXMItLHjisZ6SbjIbM0l0ImYd0WLVGUugTZ2iEHUsphIFeYUaKMGmcgBcwt0g44bEnnQ3AJtrJZWg0xkjzkG2sIccUi/yOzNMdBGa9Mie8w10EZr0yJ3zDnQiWU3yHQxk3vGCvR3xGx/tAbZUtemFWi5Z4xA2/ZHO23kNTFKX5uOuuA8Q+SO6ECv2R4btCHmPLCGsqfeUYHWU3NyT2SgM/0Jnbvs1xGve/Vem/6Mn+/x1+D7781IFaIC/dC7mjP9myK92Q+359T7H/w0+C+xrfCld2pXIirQh97V3BJzR1jhFxzvH3DPnWIN/uedZ6QKEYE+5V3NUQ0yr7XpK3w1+IQ64f+UXEZ36Gp4BzpzWoNqQ0yDLOHTINvgr2VYqBMxRyT/jVTDO9B/nPGxkQ2yxDCZmM+t5XHvyW6ICbPRm0gqMuWTYpmYBpnxmJaec3E6h80gLJwrjge0uf7YqDCbDVIN74P2z2W1tjV4Er4a+uAcq+UPsTvXG2Ikthcdq9czfWfdZgX2wIj1ARrinwb7xDQNMfs3NozHvq7efZFitd34z2m0nK9x/Pt3x78MD8THoM+tlLHidOuRPzfP8Q4/JX5Ot0rYnLEhZtpnYX7LMFHT7hJk9BKD6pSy28qWsSKaUDbtbni8NfWu0V4i1Skl0JnYBtmQqXfUmvmU1ujuXKWS9kNbAyvjLzFsbXpD3MVmChndnatVUqBtyh11N7RudeLxWurpktr6f0aqVNqJJRviGmRDuop2sbEXzmfmze7MepCkYiUeQRTVIGsYNvXO9DvIMvNkYW6RqpUY6ExczWrLWEMaZJl5hlphXohSDwmMapB5rE1n+lDPYep6Uyq0yCKUGujIBtnQtWmT6YNScrfYHuu0wxlVMy9Iycf4bojbOOD12F3bjeeU9UTZzcWwQd3sxSn9XO6oBlnCbxqa6Z+JtrvhlMG2r5PNGOwCs0YWqfRAZ+IaZEPXpu+ydeoV2zt2Zhw2tbaa/hv6i5ROH1mwqbdPniJqi+XN2vRLfGW2u5ianfEtPtshbZvlhu2pLwqw3HqCjOkF/YXJ/ntx/f83Ib+4Hvn61192xs2e6SsUYDngf9b4jvLdHCZ+AAAAAElFTkSuQmCC">
        <div style="height:4px;background:linear-gradient(90deg,#EDE6DB 0%,#FF6EC7 29.81%,#03FFFF 63.94%,#FF6A3D 96.15%);margin-bottom:50px;"></div>
      </div>
      <h1>Ad Specs Bundle</h1>
      <p class="specDL-muted">Generated ${new Date().toLocaleString()}</p>
    </div>
    <div class="specDL-page specDL-pageBreak">
      <h2>Contents</h2>
      <ol>${specs.map((s) => `<li>${s.title}</li>`).join("")}</ol>
    </div>
    ${specs
      .map(
        (s, i) => `
      <div class="specDL-page ${i === specs.length - 1 ? "" : "specDL-pageBreak"}">
        <h2>${s.title}</h2>
        <p style="opacity:.85">${s.description}</p>
        <p style="opacity:.85">Supported dimension: ${s.dimension}</p>
        <div style="display:${s.remark ? "block" : "none"}">
          <p style="font-weight:bold;font-style:italic;color:#434343;font-size:12px;">Remark: </p>
          <span style="font-size:12px;font-style:italic;color:#434343;">${s.remark}</span>
        </div>
        <a
          href="${s.link}"
          target="_blank"
          class="specDL-demo-btn"
          style="display:inline-block;background:#000;color:#fff;border-radius:10px;padding:10px 20px;margin-top:10px;font-family:Arial,sans-serif;font-size:13px;text-decoration:none;"
        >View Demo</a>
        <h4 style="margin:20px 0 10px 0;">Ad Spec</h4>
        <table class="specDL-table" style="width:100%;table-layout:fixed;border-collapse:collapse;">
          <thead>
            <tr>
              ${s.table[0].map((h, idx) => `<th style="width:${colthead[idx]};text-align:left;">${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${s.table
              .slice(1)
              .map(
                (r) => `
              <tr>
                <td style="width:18%;text-align:left;">${r[0]}</td>
                <td style="width:18%;text-align:left;">${r[1]}</td>
                <td style="width:46%;text-align:left;">${r[2]}</td>
                <td style="width:18%;text-align:left;">${r[3]}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        <img class="specDL-image" src="${placeholderImage(s.image, s.title)}" alt="">
        <p class="specDL-muted" style="margin-top:10px;">
          Selection key: <b>${s.slug}</b>
        </p>
      </div>
    `,
      )
      .join("")}
  `;

  return root;
}

async function downloadPdf() {
  const slugs = loadList();
  if (!slugs.length) {
    alert("Select at least one spec.");
    return;
  }

  const specs = slugs.map(getSpec).filter(Boolean);
  const stage = document.getElementById("specDL-render-stage");
  stage.innerHTML = "";

  Object.assign(stage.style, {
    position     : "fixed",
    top          : "0",
    left         : "-9999px",
    width        : "794px",
    zIndex       : "9999",
    background   : "#fff",
    visibility   : "visible",
    overflow     : "visible",
    pointerEvents: "none",
  });

  const pdfDom = buildPdfDom(specs);
  stage.appendChild(pdfDom);

  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 300)));

  await html2pdf()
    .set({
      filename    : "KULT_Display_AdSpec.pdf",
      margin      : 0,
      enableLinks : true,
      html2canvas : { scale: 2, backgroundColor: "#fff", useCORS: true, logging: false },
      jsPDF       : { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak   : { mode: ["css"] },
    })
    .from(pdfDom)
    .save();

  stage.innerHTML = "";
  stage.removeAttribute("style");
}

(function loadExcelJS() {
  if (window.ExcelJS) return;
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js";
  s.onload = function () { console.log("ExcelJS ready"); };
  document.head.appendChild(s);
})();

function _stripHtml(str) {
  var nl = String.fromCharCode(13) + String.fromCharCode(10);
  return String(str || "")
    .split("<br/>").join(nl)
    .split("<br />").join(nl)
    .split("<br>").join(nl)
    .split("</br>").join(nl)
    .split("<BR>").join(nl)
    .split("<BR/>").join(nl)
    .split("<BR />").join(nl)
    .replace(/<[^>]+>/g, "")
    .trim();
}

function _safeSheetName(name) {
  var result = String(name || "Sheet");
  result = result.split("/").join("");
  result = result.split(" ").join("_");
  return result.substring(0, 31) || "Sheet";
}

var _BORDER = {
  top:    { style: "thin", color: { argb: "FFD1D5DB" } },
  bottom: { style: "thin", color: { argb: "FFD1D5DB" } },
  left:   { style: "thin", color: { argb: "FFD1D5DB" } },
  right:  { style: "thin", color: { argb: "FFD1D5DB" } },
};

var _STYLE = {
  sheetTitle: {
    font:      { bold: true, size: 13, color: { argb: "FFFFFFFF" } },
    fill:      { type: "pattern", pattern: "solid", fgColor: { argb: "FF000000" } },
    alignment: { vertical: "middle", horizontal: "center", wrapText: false },
    border:    _BORDER,
  },
  rowLabel: {
    font:      { bold: true, size: 10, color: { argb: "FF000000" } },
    fill:      { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F4F6" } },
    alignment: { vertical: "middle", horizontal: "left", wrapText: true },
    border:    _BORDER,
  },
  titleCell: {
    font:      { size: 10, color: { argb: "FF000000" } },
    fill:      { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } },
    alignment: { vertical: "middle", horizontal: "left", wrapText: false },
    border:    _BORDER,
  },
  colHeader: {
    font:      { bold: true, size: 10, color: { argb: "FF000000" } },
    fill:      { type: "pattern", pattern: "solid", fgColor: { argb: "FF9AF0E2" } },
    alignment: { vertical: "middle", horizontal: "center", wrapText: true },
    border:    _BORDER,
  },
  dataCell: {
    font:      { size: 10 },
    fill:      { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border:    _BORDER,
  },
  dataCellAlt: {
    font:      { size: 10 },
    fill:      { type: "pattern", pattern: "solid", fgColor: { argb: "FFF9FAFB" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border:    _BORDER,
  },
  remarkCell: {
    font:      { italic: true, size: 9, color: { argb: "FF666666" } },
    fill:      { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
  },
};

function _applyStyle(cell, style) {
  if (style.font)      cell.font      = style.font;
  if (style.fill)      cell.fill      = style.fill;
  if (style.alignment) cell.alignment = style.alignment;
  if (style.border)    cell.border    = style.border;
}

function _buildWorksheet(wb, spec) {
  var ws = wb.addWorksheet(_safeSheetName(spec.title));
  var tableRows = spec.table.slice(1);
  var numComponents = tableRows.length;

  ws.columns = [
    { width: 18 },
    { width: 22 },
    ...Array(numComponents).fill({ width: 30 }),
  ];

  var ROW_LOGO      = 1;
  var ROW_LOGO_END  = 3;
  var ROW_HEADER    = ROW_LOGO_END + 1;
  var ROW_COMP      = ROW_HEADER + 1;
  var ROW_FORMAT    = ROW_COMP + 1;
  var ROW_DIMENSION = ROW_FORMAT + 1;
  var ROW_QUANTITY  = ROW_DIMENSION + 1;
  var ROW_LANDING   = ROW_QUANTITY + 1;
  var ROW_REMARK    = ROW_LANDING + 1;

  ws.getRow(ROW_LOGO).height   = 20;
  ws.getRow(ROW_LOGO + 1).height = 20;
  ws.getRow(ROW_LOGO + 2).height = 20;
  ws.mergeCells(ROW_LOGO, 1, ROW_LOGO_END, lastCol);
  ws.getRow(ROW_HEADER).height  = 28;
  ws.getRow(ROW_COMP).height    = 36;
  ws.getRow(ROW_FORMAT).height  = 20;
  ws.getRow(ROW_DIMENSION).height = 80;
  ws.getRow(ROW_QUANTITY).height  = 20;
  ws.getRow(ROW_LANDING).height   = 20;
  ws.getRow(ROW_REMARK).height    = 40;

  var lastCol = 2 + numComponents;

  var headerCell = ws.getRow(ROW_HEADER).getCell(1);
  headerCell.value = "AD TEMPLATE";
  _applyStyle(headerCell, _STYLE.sheetTitle);

  var techCell = ws.getRow(ROW_HEADER).getCell(2);
  techCell.value = "TECHNICAL SPECIFICATIONS/ FORMAT";
  _applyStyle(techCell, _STYLE.sheetTitle);
  ws.mergeCells(ROW_HEADER, 2, ROW_HEADER, lastCol);
  for (var hi = 3; hi <= lastCol; hi++) {
    _applyStyle(ws.getRow(ROW_HEADER).getCell(hi), _STYLE.sheetTitle);
  }

  var titleCell = ws.getRow(ROW_COMP).getCell(1);
  titleCell.value = spec.title;
  _applyStyle(titleCell, _STYLE.titleCell);
  ws.mergeCells(ROW_COMP, 1, ROW_LANDING, 1);
  for (var tr = ROW_FORMAT; tr <= ROW_LANDING; tr++) {
    _applyStyle(ws.getRow(tr).getCell(1), _STYLE.titleCell);
  }

  var compLabelCell = ws.getRow(ROW_COMP).getCell(2);
  compLabelCell.value = "Component";
  _applyStyle(compLabelCell, _STYLE.rowLabel);
  tableRows.forEach(function (row, i) {
    var cell = ws.getRow(ROW_COMP).getCell(3 + i);
    cell.value = _stripHtml(row[0]);
    _applyStyle(cell, _STYLE.colHeader);
  });

  var formatLabelCell = ws.getRow(ROW_FORMAT).getCell(2);
  formatLabelCell.value = "File Format";
  _applyStyle(formatLabelCell, _STYLE.rowLabel);
  tableRows.forEach(function (row, i) {
    var cell = ws.getRow(ROW_FORMAT).getCell(3 + i);
    cell.value = _stripHtml(row[3]);
    _applyStyle(cell, i % 2 === 0 ? _STYLE.dataCell : _STYLE.dataCellAlt);
  });

  var dimLabelCell = ws.getRow(ROW_DIMENSION).getCell(2);
  dimLabelCell.value = "Dimension (W x H)";
  _applyStyle(dimLabelCell, _STYLE.rowLabel);
  tableRows.forEach(function (row, i) {
    var cell = ws.getRow(ROW_DIMENSION).getCell(3 + i);
    cell.value = _stripHtml(row[2]);
    _applyStyle(cell, i % 2 === 0 ? _STYLE.dataCell : _STYLE.dataCellAlt);
  });

  var qtyLabelCell = ws.getRow(ROW_QUANTITY).getCell(2);
  qtyLabelCell.value = "Quantity";
  _applyStyle(qtyLabelCell, _STYLE.rowLabel);
  tableRows.forEach(function (row, i) {
    var cell = ws.getRow(ROW_QUANTITY).getCell(3 + i);
    cell.value = _stripHtml(row[1]);
    _applyStyle(cell, i % 2 === 0 ? _STYLE.dataCell : _STYLE.dataCellAlt);
  });

  var urlLabelCell = ws.getRow(ROW_LANDING).getCell(2);
  urlLabelCell.value = "Landing URL";
  _applyStyle(urlLabelCell, _STYLE.rowLabel);
  var urlCell = ws.getRow(ROW_LANDING).getCell(3);
  urlCell.value = "1";
  _applyStyle(urlCell, _STYLE.dataCell);
  if (numComponents > 1) {
    ws.mergeCells(ROW_LANDING, 3, ROW_LANDING, lastCol);
    for (var li = 1; li < numComponents; li++) {
      _applyStyle(ws.getRow(ROW_LANDING).getCell(3 + li), _STYLE.dataCell);
    }
  }

  var remarkCell = ws.getRow(ROW_REMARK).getCell(1);
  remarkCell.value = _stripHtml(spec.remark);
  _applyStyle(remarkCell, _STYLE.remarkCell);
  ws.mergeCells(ROW_REMARK, 1, ROW_REMARK, lastCol);
  for (var rc = 2; rc <= lastCol; rc++) {
    _applyStyle(ws.getRow(ROW_REMARK).getCell(rc), _STYLE.remarkCell);
  }

  return ws;
}

async function downloadExcel() {
  if (!window.ExcelJS) {
    alert("ExcelJS is still loading — please try again in a moment.");
    return;
  }

  var slugs = loadList();
  if (!slugs.length) {
    alert("Select at least one spec.");
    return;
  }

  var LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAABHCAYAAAAwcWolAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVcSURBVHgB7d3/cdxEGMbxb5j8j6kgmwoIFaBUQKiASwWBCiJXAFSQowKSCnKpAFNBlgpIB6B3ZPtu7PP9sN5XWq2ez8wOJONJHNuPtO+72tUT4OduvMHH7934DX9/deMCfz9242rP73/sRsLHy25k/Hl+337pxvsjH2Pf1x8Y7+/z8Jll+fCUPigJHxGhe9uNF/i7ZH+YzfNuPKNsY3/fSv852SexLF9/RdlW3Wjx9ynozxWZVMmBTvR3Z2+Z/kIhUp2SA+1Zx+6yujkjUqFSA2135oS/Q3WzyOyVGOhXxNS371HdLJUrLdCpG7/iL9MvlYhUrbRA/0nMVDtqLVikKCUFOnK9OSOyAKUEOqpuXqO6WRakhEAnVDeLuCgh0O+Iq5u/ILIgUwfa6uYGf3ZnzogszJSBboipb6N2fIkU7ynTSPRTbW8ZNcFk6xJ/XvsL7InFD/i6mirQ1gRL+LJ6WXWz7Grx5xnoFmdTTLntC/IKf1pvlsUbO9D24EiLP9XNIowb6ET/aKe3TH8cj8jijRnoyLpZRBgv0FF1s9abRXaMEehETN1sTbA1InIrOtCJ/ighbxmtN4vcEx3oFv+6OaO6WWSvyEBb3fwT/lQ3izwgKtCJuLp5jDcuiMxSRKDtrQgRdXPIo3IiNfEOtL37KOI87Ux/nraIHOC9OSPiTDDzGtXNIkeV/m4rY3XzBhE5ag6BXiMiJ5lDoCMOEBSp0hwCbc+AN4jIUXMItLHjisZ6SbjIbM0l0ImYd0WLVGUugTZ2iEHUsphIFeYUaKMGmcgBcwt0g44bEnnQ3AJtrJZWg0xkjzkG2sIccUi/yOzNMdBGa9Mie8w10EZr0yJ3zDnQiWU3yHQxk3vGCvR3xGx/tAbZUtemFWi5Z4xA2/ZHO23kNTFKX5uOuuA8Q+SO6ECv2R4btCHmPLCGsqfeUYHWU3NyT2SgM/0Jnbvs1xGve/Vem/6Mn+/x1+D7781IFaIC/dC7mjP9myK92Q+359T7H/w0+C+xrfCld2pXIirQh97V3BJzR1jhFxzvH3DPnWIN/uedZ6QKEYE+5V3NUQ0yr7XpK3w1+IQ64f+UXEZ36Gp4BzpzWoNqQ0yDLOHTINvgr2VYqBMxRyT/jVTDO9B/nPGxkQ2yxDCZmM+t5XHvyW6ICbPRm0gqMuWTYpmYBpnxmJaec3E6h80gLJwrjge0uf7YqDCbDVIN74P2z2W1tjV4Er4a+uAcq+UPsTvXG2Ikthcdq9czfWfdZgX2wIj1ARrinwb7xDQNMfs3NozHvq7efZFitd34z2m0nK9x/Pt3x78MD8THoM+tlLHidOuRPzfP8Q4/JX5Ot0rYnLEhZtpnYX7LMFHT7hJk9BKD6pSy28qWsSKaUDbtbni8NfWu0V4i1Skl0JnYBtmQqXfUmvmU1ujuXKWS9kNbAyvjLzFsbXpD3MVmChndnatVUqBtyh11N7RudeLxWurpktr6f0aqVNqJJRviGmRDuop2sbEXzmfmze7MepCkYiUeQRTVIGsYNvXO9DvIMvNkYW6RqpUY6ExczWrLWEMaZJl5hlphXohSDwmMapB5rE1n+lDPYep6Uyq0yCKUGujIBtnQtWmT6YNScrfYHuu0wxlVMy9Iycf4bojbOOD12F3bjeeU9UTZzcWwQd3sxSn9XO6oBlnCbxqa6Z+JtrvhlMG2r5PNGOwCs0YWqfRAZ+IaZEPXpu+ydeoV2zt2Zhw2tbaa/hv6i5ROH1mwqbdPniJqi+XN2vRLfGW2u5ianfEtPtshbZvlhu2pLwqw3HqCjOkF/YXJ/ntx/f83Ib+4Hvn61192xs2e6SsUYDngf9b4jvLdHCZ+AAAAAElFTkSuQmCC";

  var specs = slugs.map(getSpec).filter(Boolean);
  var wb = new ExcelJS.Workbook();

  var logoId = wb.addImage({
    base64: LOGO_BASE64,
    extension: "png",
  });

  specs.forEach(function (spec) {
    var ws = _buildWorksheet(wb, spec);
    ws.addImage(logoId, {
      tl: { col: 0, row: 0 },
      br: { col: 2, row: 3 },
    });
  });

  var buffer = await wb.xlsx.writeBuffer();
  var blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "KULT_Display_AdSpec.xlsx";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("specDL-card-close").addEventListener("click", function () {
  document.getElementById("specDL-card").style.display = "none";
});

document.getElementById("specDL-download").addEventListener("click", function () {
  document.getElementById("specDL-card").style.display = "unset";
});

document.addEventListener("DOMContentLoaded", function () {
  const excelBtn = document.getElementById("specDL-excel-btn");
  if (excelBtn) {
    excelBtn.addEventListener("click", downloadExcel);
  }
});

$("#desc-dropdown").click(function () {
  $(".description-container").toggleClass("show visible");
  $("#addCart").toggleClass("show visible");
  $("#desc-dropdown").toggleClass("show visible");
});

function observeWidth2() {
  const target2 = $("body")[0];
  const ro2 = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const width = $(entry.target).width();
      if (width > 1039 && width < 1200) {
        $(".gallery-inner-section").addClass("mid").removeClass("small");
      } else if (width < 1040) {
        $(".gallery-inner-section").addClass("mid small");
      } else {
        $(".gallery-inner-section").removeClass("mid small");
      }
    }
  });
  ro2.observe(target2);
}

observeWidth2();
renderSpecs();
renderList();
syncButtons();