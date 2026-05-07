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

(function loadSheetJS() {
  if (window.XLSX) return;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js";
  s.onload = () => console.log("SheetJS ready");
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
  sheetTitle: {
    font: { bold: true, sz: 13, color: { rgb: "FFFFFF" } },
    fill: { patternType: "solid", fgColor: { rgb: "2E6DA4" } },
    alignment: { vertical: "center", horizontal: "center", wrapText: false },
    border: _border,
  },
  rowLabel: {
    font: { bold: true, sz: 10, color: { rgb: "000000" } },
    fill: { patternType: "solid", fgColor: { rgb: "F3F4F6" } },
    alignment: { vertical: "center", horizontal: "left", wrapText: true },
    border: _border,
  },
  titleCell: {
    font: { sz: 10, color: { rgb: "000000" } },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "center", horizontal: "left", wrapText: false },
    border: _border,
  },
  colHeader: {
    font: { bold: true, sz: 10, color: { rgb: "000000" } },
    fill: { patternType: "solid", fgColor: { rgb: "9AF0E2" } },
    alignment: { vertical: "center", horizontal: "center", wrapText: true },
    border: _border,
  },
  dataCell: {
    font: { sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: _border,
  },
  dataCellAlt: {
    font: { sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "F9FAFB" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: _border,
  },
  remarkCell: {
    font: { italic: true, sz: 9, color: { rgb: "666666" } },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
  },
};
function _safeSheetName(name) {
  var result = String(name || 'Sheet');
  result = result.split('/').join('');
  result = result.split(' ').join('_');
  return result.substring(0, 31) || 'Sheet';
}

function _colLetter(idx) {
  var letters = "";
  idx = idx + 1;
  while (idx > 0) {
    var rem = (idx - 1) % 26;
    letters = String.fromCharCode(65 + rem) + letters;
    idx = Math.floor((idx - 1) / 26);
  }
  return letters;
}

function _setCellAt(ws, colIdx, rowIdx, value, style) {
  var ref = _colLetter(colIdx) + rowIdx;
  ws[ref] = { v: value, t: "s", s: style || {} };
}

function _mergeRange(merges, startCol, startRow, endCol, endRow) {
  merges.push({
    s: { r: startRow - 1, c: startCol },
    e: { r: endRow - 1,   c: endCol   },
  });
}

function _buildHorizontalSheet(spec) {
  var ws = {};
  var merges = [];
  var rowHeights = [];
  var colWidths = [];

  var tableRows = spec.table.slice(1);
  var numComponents = tableRows.length;

  // Col A = ad title, Col B = row labels, Col C+ = components
  var COL_TITLE      = 0;
  var COL_LABEL      = 1;
  var COL_FIRST_COMP = 2;

  var ROW_HEADER      = 1;
  var ROW_COMP        = 2;
  var ROW_FILE_FORMAT = 3;
  var ROW_DIMENSION   = 4;
  var ROW_QUANTITY    = 5;
  var ROW_LANDING_URL = 6;
  var ROW_REMARK      = 7;

  var lastDataCol = COL_FIRST_COMP + numComponents - 1;

  // Row 1: "AD TEMPLATE" | "TECHNICAL SPECIFICATIONS/ FORMAT" merged across remaining cols
  _setCellAt(ws, COL_TITLE, ROW_HEADER, "AD TEMPLATE", _XLS.sheetTitle);
  _setCellAt(ws, COL_LABEL, ROW_HEADER, "TECHNICAL SPECIFICATIONS/ FORMAT", _XLS.sheetTitle);
  _mergeRange(merges, COL_LABEL, ROW_HEADER, lastDataCol, ROW_HEADER);
  for (var hi = COL_FIRST_COMP; hi <= lastDataCol; hi++) {
    _setCellAt(ws, hi, ROW_HEADER, "", _XLS.sheetTitle);
  }
  rowHeights[ROW_HEADER - 1] = { hpt: 28 };

  // Col A rows 2–6: spec title merged vertically
  _setCellAt(ws, COL_TITLE, ROW_COMP, spec.title, _XLS.titleCell);
  for (var tr = ROW_FILE_FORMAT; tr <= ROW_LANDING_URL; tr++) {
    _setCellAt(ws, COL_TITLE, tr, "", _XLS.titleCell);
  }
  _mergeRange(merges, COL_TITLE, ROW_COMP, COL_TITLE, ROW_LANDING_URL);

  // Row 2: "Component" | component names
  _setCellAt(ws, COL_LABEL, ROW_COMP, "Component", _XLS.rowLabel);
  tableRows.forEach(function (row, i) {
    _setCellAt(ws, COL_FIRST_COMP + i, ROW_COMP, _stripHtml(row[0]), _XLS.colHeader);
  });
  rowHeights[ROW_COMP - 1] = { hpt: 36 };

  // Row 3: "File Format" | values
  _setCellAt(ws, COL_LABEL, ROW_FILE_FORMAT, "File Format", _XLS.rowLabel);
  tableRows.forEach(function (row, i) {
    var style = i % 2 === 0 ? _XLS.dataCell : _XLS.dataCellAlt;
    _setCellAt(ws, COL_FIRST_COMP + i, ROW_FILE_FORMAT, _stripHtml(row[3]), style);
  });
  rowHeights[ROW_FILE_FORMAT - 1] = { hpt: 20 };

  // Row 4: "Dimension (W x H)" | values
  _setCellAt(ws, COL_LABEL, ROW_DIMENSION, "Dimension (W x H)", _XLS.rowLabel);
  tableRows.forEach(function (row, i) {
    var style = i % 2 === 0 ? _XLS.dataCell : _XLS.dataCellAlt;
    _setCellAt(ws, COL_FIRST_COMP + i, ROW_DIMENSION, _stripHtml(row[2]), style);
  });
  rowHeights[ROW_DIMENSION - 1] = { hpt: 80 };

  // Row 5: "Quantity" | values
  _setCellAt(ws, COL_LABEL, ROW_QUANTITY, "Quantity", _XLS.rowLabel);
  tableRows.forEach(function (row, i) {
    var style = i % 2 === 0 ? _XLS.dataCell : _XLS.dataCellAlt;
    _setCellAt(ws, COL_FIRST_COMP + i, ROW_QUANTITY, _stripHtml(row[1]), style);
  });
  rowHeights[ROW_QUANTITY - 1] = { hpt: 20 };

  // Row 6: "Landing URL" | "1" merged across component cols
  _setCellAt(ws, COL_LABEL, ROW_LANDING_URL, "Landing URL", _XLS.rowLabel);
  _setCellAt(ws, COL_FIRST_COMP, ROW_LANDING_URL, "1", _XLS.dataCell);
  if (numComponents > 1) {
    _mergeRange(merges, COL_FIRST_COMP, ROW_LANDING_URL, lastDataCol, ROW_LANDING_URL);
    for (var li = 1; li < numComponents; li++) {
      _setCellAt(ws, COL_FIRST_COMP + li, ROW_LANDING_URL, "", _XLS.dataCell);
    }
  }
  rowHeights[ROW_LANDING_URL - 1] = { hpt: 20 };

  // Row 7: remark merged across all cols
  var remarkText = _stripHtml(spec.remark);
  for (var rc = COL_TITLE; rc <= lastDataCol; rc++) {
    _setCellAt(ws, rc, ROW_REMARK, rc === COL_TITLE ? remarkText : "", _XLS.remarkCell);
  }
  _mergeRange(merges, COL_TITLE, ROW_REMARK, lastDataCol, ROW_REMARK);
  rowHeights[ROW_REMARK - 1] = { hpt: 40 };

  colWidths[COL_TITLE] = { wch: 18 };
  colWidths[COL_LABEL] = { wch: 22 };
  for (var ci = 0; ci < numComponents; ci++) {
    colWidths[COL_FIRST_COMP + ci] = { wch: 30 };
  }

  ws["!ref"]    = "A1:" + _colLetter(lastDataCol) + ROW_REMARK;
  ws["!merges"] = merges;
  ws["!cols"]   = colWidths;
  ws["!rows"]   = rowHeights;

  return ws;
}

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
    var ws = _buildHorizontalSheet(spec);
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
