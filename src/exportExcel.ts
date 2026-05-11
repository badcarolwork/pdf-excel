import { AdSpec } from "./data";

declare const XLSX: any;

type CellStyle = Record<string, unknown>;

const BORDER: CellStyle = {
  top: { style: "thin", color: { rgb: "E5E2DB" } },
  bottom: { style: "thin", color: { rgb: "E5E2DB" } },
  left: { style: "thin", color: { rgb: "E5E2DB" } },
  right: { style: "thin", color: { rgb: "E5E2DB" } },
};

const STYLES = {
  header: {
    font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
    fill: { patternType: "solid", fgColor: { rgb: "0D0D0D" } },
    alignment: { vertical: "center", horizontal: "left", wrapText: true },
    border: BORDER,
  } as CellStyle,
  subheader: {
    font: { bold: true, sz: 10, color: { rgb: "0D0D0D" } },
    fill: { patternType: "solid", fgColor: { rgb: "F5F3EE" } },
    alignment: { vertical: "center", horizontal: "left", wrapText: true },
    border: BORDER,
  } as CellStyle,
  cell: {
    font: { sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: BORDER,
  } as CellStyle,
  cellAlt: {
    font: { sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "FAFAF8" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: BORDER,
  } as CellStyle,
  meta: {
    font: { italic: true, sz: 9, color: { rgb: "999999" } },
    fill: { patternType: "solid", fgColor: { rgb: "FFFFFF" } },
    alignment: { vertical: "top", horizontal: "left", wrapText: true },
    border: BORDER,
  } as CellStyle,
};

function colLetter(idx: number): string {
  let letters = "";
  let i = idx + 1;
  while (i > 0) {
    const rem = (i - 1) % 26;
    letters = String.fromCharCode(65 + rem) + letters;
    i = Math.floor((i - 1) / 26);
  }
  return letters;
}

function setCell(ws: Record<string, unknown>, col: number, row: number, value: string, style: CellStyle): void {
  ws[`${colLetter(col)}${row}`] = { v: value, t: "s", s: style };
}

function mergeRange(
  merges: { s: { r: number; c: number }; e: { r: number; c: number } }[],
  sc: number, sr: number, ec: number, er: number
): void {
  merges.push({ s: { r: sr - 1, c: sc }, e: { r: er - 1, c: ec } });
}

function safeSheetName(name: string): string {
  return name.replace(/[\/\\?*[\]]/g, "").substring(0, 31) || "Sheet";
}

function buildSheet(spec: AdSpec): Record<string, unknown> {
  const ws: Record<string, unknown> = {};
  const merges: { s: { r: number; c: number }; e: { r: number; c: number } }[] = [];

  let row = 1;

  for (let c = 0; c < 4; c++) {
    setCell(ws, c, row, c === 0 ? spec.title : "", STYLES.header);
  }
  mergeRange(merges, 0, row, 3, row);
  row++;

  for (let c = 0; c < 4; c++) {
    setCell(ws, c, row, c === 0 ? `Dimension: ${spec.dimension}` : "", STYLES.meta);
  }
  mergeRange(merges, 0, row, 3, row);
  row++;

  if (spec.remark) {
    for (let c = 0; c < 4; c++) {
      setCell(ws, c, row, c === 0 ? `Remark: ${spec.remark}` : "", STYLES.meta);
    }
    mergeRange(merges, 0, row, 3, row);
    row++;
  }

  const headers = ["Component", "Quantity", "Size", "Format"];
  for (let c = 0; c < 4; c++) {
    setCell(ws, c, row, headers[c], STYLES.subheader);
  }
  row++;

  spec.table.forEach((tableRow, i) => {
    const style = i % 2 === 0 ? STYLES.cell : STYLES.cellAlt;
    setCell(ws, 0, row, tableRow.component, style);
    setCell(ws, 1, row, tableRow.quantity, style);
    setCell(ws, 2, row, tableRow.size, style);
    setCell(ws, 3, row, tableRow.format, style);
    row++;
  });

  ws["!ref"] = `A1:D${row - 1}`;
  ws["!merges"] = merges;
  ws["!cols"] = [{ wch: 30 }, { wch: 14 }, { wch: 48 }, { wch: 22 }];
  ws["!rows"] = [{ hpt: 28 }, { hpt: 18 }, { hpt: 36 }, { hpt: 22 }];

  return ws;
}

export function downloadExcel(specs: AdSpec[]): void {
  if (!window.XLSX) {
    alert("SheetJS is still loading — please try again.");
    return;
  }
  if (!specs.length) return;

  const wb = XLSX.utils.book_new();

  specs.forEach((spec) => {
    const ws = buildSheet(spec);
    XLSX.utils.book_append_sheet(wb, ws, safeSheetName(spec.title));
  });

  XLSX.writeFile(wb, "RichMedia_AdSpec_Bundle.xlsx");
}
