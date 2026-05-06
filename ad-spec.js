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
      <div style="display:inline-block;">
        <img style="width:60%;height:auto;margin-bottom:10px;">
        <div style="height:4px;background:linear-gradient(90deg,#EDE6DB 0%,#FF6EC7 29.81%,#03FFFF 63.94%,#FF6A3D 96.15%);margin-top:7px;"></div>
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
        <div
          class="specDL-demo-btn"
          data-href="${s.link}"
          style="display:inline-block;background:#000;color:#fff;border-radius:10px;padding:10px 20px;margin-top:10px;font-family:Arial,sans-serif;font-size:13px;cursor:default;"
        >View Demo ↗</div>
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
    position: "fixed",
    top: "0",
    left: "0",
    width: "794px",
    zIndex: "-9999",
    background: "#fff",
    visibility: "hidden",
    pointerEvents: "none",
  });

  const pdfDom = buildPdfDom(specs);
  stage.appendChild(pdfDom);

  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 200)));

  const A4_WIDTH_PT  = 595.28;
  const A4_HEIGHT_PT = 841.89;

  const worker = html2pdf()
    .set({
      filename    : "KULT_Display_AdSpec.pdf",
      margin      : 0,
      html2canvas : { scale: 2, backgroundColor: "#fff", useCORS: true },
      jsPDF       : { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak   : { mode: ["css"] },
    })
    .from(pdfDom);

  const pdf = await worker.toPdf().get("pdf");

  const stageRect  = stage.getBoundingClientRect();
  const stageWidth = stage.offsetWidth || 794;
  const scaleX     = A4_WIDTH_PT / stageWidth;

  const domButtons = pdfDom.querySelectorAll(".specDL-demo-btn");

  domButtons.forEach((btn) => {
    const href = btn.getAttribute("data-href");
    if (!href) return;

    const btnRect   = btn.getBoundingClientRect();
    const offsetTop = btnRect.top - stageRect.top;

    const elLeft   = (btnRect.left - stageRect.left) * scaleX;
    const elTop    = offsetTop * scaleX;
    const elWidth  = btnRect.width  * scaleX;
    const elHeight = btnRect.height * scaleX;

    const pageIndex = Math.floor(elTop / A4_HEIGHT_PT);
    const yOnPage   = elTop - pageIndex * A4_HEIGHT_PT;

    pdf.setPage(pageIndex + 1);
    pdf.link(elLeft, yOnPage, elWidth, elHeight, { url: href });
  });

  pdf.save("KULT_Display_AdSpec.pdf");

  stage.innerHTML = "";
  stage.removeAttribute("style");
}

(function loadSheetJS() {
  if (window.XLSX) return;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
  s.onload = () => console.log("SheetJS ready");
  document.head.appendChild(s);
})();

function _stripHtml(str) {
  return String(str || "")
    .split("<br/>").join("\r\n")
    .split("<br />").join("\r\n")
    .split("<br>").join("\r\n")
    .split("</br>").join("\r\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function _setCell(ws, col, row, value, style) {
  ws[col + row] = { v: value, t: "s", s: style || {} };
}

var _border = {
  top:    { style: "thin", color: { rgb: "D1D5DB" } },
  bottom: { style: "thin", color: { rgb: "D1D5DB" } },
  left:   { style: "thin", color: { rgb: "D1D5DB" } },
  right:  { style: "thin", color: { rgb: "D1D5DB" } },
};

var _XLS = {
  title: {
    font: { bold: true, sz: 13, color: { rgb: "FFFFFF" } },
    fill: { patternType: "solid", fgColor: { rgb: "000000" } },
    alignment: { vertical: "center", horizontal: "center", wrapText: true },
  },
  metaLabel: {
    font: { bold: true, sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "F3F4F6" } },
    alignment: { vertical: "center", wrapText: true },
    border: { bottom: { style: "thin", color: { rgb: "D1D5DB" } } },
  },
  metaValue: {
    font: { sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "center", wrapText: true },
    border: { bottom: { style: "thin", color: { rgb: "D1D5DB" } } },
  },
  adSpecLabel: {
    font: { bold: true, sz: 20 },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "center", horizontal: "center", wrapText: true },
  },
  tableHead: {
    font: { bold: true, sz: 10, color: { rgb: "000000" } },
    fill: { patternType: "solid", fgColor: { rgb: "9AF0E2" } },
    alignment: { vertical: "center", horizontal: "left", wrapText: true },
    border: _border,
  },
  tableRowEven: {
    font: { sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "top", wrapText: true },
    border: _border,
  },
  tableRowOdd: {
    font: { sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "F9FAFB" } },
    alignment: { vertical: "top", wrapText: true },
    border: _border,
  },
  spacer: {},
};

function _safeSheetName(name) {
  return String(name)
    .replace(/[:\/\?\*\[\]\\]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 31) || "Sheet";
}

var _COLS = ["A", "B", "C", "D"];

function downloadExcel() {
  if (!window.XLSX) {
    alert("SheetJS is still loading — please try again in a moment.");
    return;
  }

  var slugs = loadList();
  if (!slugs.length) {
    alert("Select at least one spec.");
    return;
  }

  var specs = slugs.map(getSpec).filter(Boolean);
  var wb = XLSX.utils.book_new();

  specs.forEach(function (spec) {
    var ws = {};
    var merges = [];
    var rowHeights = [];
    var r = 1;
    var tableBody = spec.table.slice(1);

    _COLS.forEach(function (c) { _setCell(ws, c, r, "", _XLS.title); });
    ws["A" + r].v = spec.title;
    merges.push({ s: { r: r - 1, c: 0 }, e: { r: r - 1, c: 3 } });
    rowHeights.push({ hpt: 26 });
    r++;

    _setCell(ws, "A", r, "Description", _XLS.metaLabel);
    _setCell(ws, "B", r, _stripHtml(spec.description), _XLS.metaValue);
    _setCell(ws, "C", r, "", _XLS.metaValue);
    _setCell(ws, "D", r, "", _XLS.metaValue);
    merges.push({ s: { r: r - 1, c: 1 }, e: { r: r - 1, c: 3 } });
    rowHeights.push({ hpt: 36 });
    r++;

    _setCell(ws, "A", r, "Dimension", _XLS.metaLabel);
    _setCell(ws, "B", r, spec.dimension, _XLS.metaValue);
    _setCell(ws, "C", r, "", _XLS.metaValue);
    _setCell(ws, "D", r, "", _XLS.metaValue);
    merges.push({ s: { r: r - 1, c: 1 }, e: { r: r - 1, c: 3 } });
    rowHeights.push({ hpt: 20 });
    r++;

    var remark = _stripHtml(spec.remark);
    if (remark) {
      _setCell(ws, "A", r, "Remark", _XLS.metaLabel);
      _setCell(ws, "B", r, remark, _XLS.metaValue);
      _setCell(ws, "C", r, "", _XLS.metaValue);
      _setCell(ws, "D", r, "", _XLS.metaValue);
      merges.push({ s: { r: r - 1, c: 1 }, e: { r: r - 1, c: 3 } });
      rowHeights.push({ hpt: 20 });
      r++;
    }

    _setCell(ws, "A", r, "Demo Link", _XLS.metaLabel);
    _setCell(ws, "B", r, spec.link, _XLS.metaValue);
    _setCell(ws, "C", r, "", _XLS.metaValue);
    _setCell(ws, "D", r, "", _XLS.metaValue);
    merges.push({ s: { r: r - 1, c: 1 }, e: { r: r - 1, c: 3 } });
    rowHeights.push({ hpt: 20 });
    r++;

    _COLS.forEach(function (c) { _setCell(ws, c, r, "", _XLS.adSpecLabel); });
    ws["A" + r].v = "Ad Spec";
    merges.push({ s: { r: r - 1, c: 0 }, e: { r: r - 1, c: 3 } });
    rowHeights.push({ hpt: 28 });
    r++;

    spec.table[0].forEach(function (h, i) {
      _setCell(ws, _COLS[i], r, h, _XLS.tableHead);
    });
    rowHeights.push({ hpt: 20 });
    r++;

    tableBody.forEach(function (row, idx) {
      var style = idx % 2 === 0 ? _XLS.tableRowEven : _XLS.tableRowOdd;
      row.forEach(function (cell, i) {
        _setCell(ws, _COLS[i], r, _stripHtml(cell), style);
      });
      rowHeights.push({ hpt: 40 });
      r++;
    });

    ws["!ref"]    = "A1:D" + (r - 1);
    ws["!merges"] = merges;
    ws["!cols"]   = [{ wch: 20 }, { wch: 28 }, { wch: 48 }, { wch: 22 }];
    ws["!rows"]   = rowHeights;

    XLSX.utils.book_append_sheet(wb, ws, _safeSheetName(spec.title));
  });

  XLSX.writeFile(wb, "KULT_Display_AdSpec.xlsx");
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
