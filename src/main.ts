import { AdSpec, SPECS } from "./data";
import { getSelected, getSelectedSpecs, isSelected, onStateChange, remove, clear, toggle } from "./state";
import { downloadPdf } from "./exportPdf";
import { downloadExcel } from "./exportExcel";

const MAX = 5;

function stripDesc(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function toast(msg: string, type: "info" | "error" = "info"): void {
  const el = document.getElementById("toast")!;
  el.textContent = msg;
  el.className = `toast toast--${type} toast--show`;
  clearTimeout((el as any)._timer);
  (el as any)._timer = setTimeout(() => {
    el.className = "toast";
  }, 2600);
}

function setLoading(on: boolean, label = "Generating…"): void {
  const overlay = document.getElementById("loading-overlay")!;
  const lbl = overlay.querySelector<HTMLElement>(".loading-label")!;
  lbl.textContent = label;
  overlay.classList.toggle("loading-overlay--show", on);
}

function renderCard(spec: AdSpec): HTMLElement {
  const card = document.createElement("div");
  card.className = `spec-card${isSelected(spec.slug) ? " spec-card--selected" : ""}`;
  card.dataset.slug = spec.slug;

  card.innerHTML = `
    <div class="spec-card__header">
      <h3 class="spec-card__title">${spec.title}</h3>
      <button class="spec-card__toggle" data-slug="${spec.slug}" aria-label="Toggle ${spec.title}">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="4,6 8,10 12,6"/>
        </svg>
      </button>
    </div>
    <p class="spec-card__desc">${stripDesc(spec.description)}</p>
    <div class="spec-card__dim">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="1"/><line x1="2" y1="6" x2="14" y2="6"/><line x1="6" y1="2" x2="6" y2="14"/></svg>
      <span>${spec.dimension}</span>
    </div>
    <div class="spec-card__footer">
      <span class="spec-card__count">${spec.table.length} asset${spec.table.length !== 1 ? "s" : ""}</span>
      <button class="add-btn" data-slug="${spec.slug}">
        ${isSelected(spec.slug) ? "✓ Added" : "+ Add"}
      </button>
    </div>
  `;

  const addBtn = card.querySelector<HTMLButtonElement>(".add-btn")!;
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    handleToggle(spec.slug);
  });

  card.addEventListener("click", () => handleToggle(spec.slug));

  return card;
}

function handleToggle(slug: string): void {
  const result = toggle(slug);
  if (!result.ok) {
    toast(result.message || "Max reached.", "error");
  }
}

function renderGrid(specs: AdSpec[]): void {
  const grid = document.getElementById("spec-grid")!;
  grid.innerHTML = "";
  const meta = document.getElementById("results-meta")!;

  if (!specs.length) {
    grid.innerHTML = `<div class="no-results">No ad formats match your search.</div>`;
    meta.textContent = "0 results";
    return;
  }

  meta.textContent = `${specs.length} format${specs.length !== 1 ? "s" : ""}`;
  specs.forEach((spec) => grid.appendChild(renderCard(spec)));
}

function updateCards(): void {
  document.querySelectorAll<HTMLElement>(".spec-card").forEach((card) => {
    const slug = card.dataset.slug!;
    const selected = isSelected(slug);
    card.classList.toggle("spec-card--selected", selected);
    const btn = card.querySelector<HTMLButtonElement>(".add-btn")!;
    btn.textContent = selected ? "✓ Added" : "+ Add";
  });
}

function renderSidebar(): void {
  const slugs = getSelected();
  const specs = getSelectedSpecs(SPECS);
  const listEl = document.getElementById("queue-list")!;
  const countEl = document.getElementById("queue-count")!;
  const emptyEl = document.getElementById("queue-empty")!;
  const actionsEl = document.getElementById("queue-actions")!;
  const dotEl = document.getElementById("queue-dot")!;

  countEl.textContent = `${slugs.length} / ${MAX} selected`;
  dotEl.style.display = slugs.length ? "flex" : "none";
  dotEl.textContent = String(slugs.length);

  if (!slugs.length) {
    emptyEl.style.display = "block";
    listEl.style.display = "none";
    actionsEl.style.display = "none";
    return;
  }

  emptyEl.style.display = "none";
  listEl.style.display = "block";
  actionsEl.style.display = "flex";

  listEl.innerHTML = specs
    .map(
      (s) => `
    <div class="queue-item">
      <span class="queue-item__title">${s.title}</span>
      <button class="queue-item__remove" data-slug="${s.slug}" aria-label="Remove ${s.title}">×</button>
    </div>
  `
    )
    .join("");

  listEl.querySelectorAll<HTMLButtonElement>(".queue-item__remove").forEach((btn) => {
    btn.addEventListener("click", () => remove(btn.dataset.slug!));
  });
}

function filterSpecs(query: string, tag: string): AdSpec[] {
  return SPECS.filter((s) => {
    const matchQuery =
      !query ||
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase());
    const matchTag =
      tag === "all" ||
      (tag === "interactive" && ["quiz-ad", "spin-wheel", "chatbot", "hotspot"].includes(s.slug)) ||
      (tag === "video" && ["video-teaser-ad"].includes(s.slug)) ||
      (tag === "display" && ["carousel-ad", "interstitial", "skinner", "countdown"].includes(s.slug)) ||
      (tag === "leadgen" && ["data-capture"].includes(s.slug));
    return matchQuery && matchTag;
  });
}

function init(): void {
  let activeTag = "all";
  let searchQuery = "";

  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const chips = document.querySelectorAll<HTMLElement>(".chip");
  const pdfBtn = document.getElementById("btn-pdf")!;
  const xlsBtn = document.getElementById("btn-xls")!;
  const clearBtn = document.getElementById("btn-clear")!;

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    renderGrid(filterSpecs(searchQuery, activeTag));
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("chip--active"));
      chip.classList.add("chip--active");
      activeTag = chip.dataset.tag!;
      renderGrid(filterSpecs(searchQuery, activeTag));
    });
  });

  pdfBtn.addEventListener("click", async () => {
    const specs = getSelectedSpecs(SPECS);
    if (!specs.length) { toast("Select at least one ad format.", "error"); return; }
    setLoading(true, "Building PDF…");
    try {
      await downloadPdf(specs);
    } catch (e) {
      toast("PDF generation failed.", "error");
    } finally {
      setLoading(false);
    }
  });

  xlsBtn.addEventListener("click", () => {
    const specs = getSelectedSpecs(SPECS);
    if (!specs.length) { toast("Select at least one ad format.", "error"); return; }
    setLoading(true, "Building Excel…");
    try {
      downloadExcel(specs);
      toast("Excel downloaded.");
    } catch (e) {
      toast("Excel generation failed.", "error");
    } finally {
      setLoading(false);
    }
  });

  clearBtn.addEventListener("click", () => {
    clear();
    toast("Selection cleared.");
  });

  document.getElementById("fab-download")!.addEventListener("click", () => {
    document.getElementById("sidebar")!.classList.toggle("sidebar--open");
  });

  document.getElementById("sidebar-close")!.addEventListener("click", () => {
    document.getElementById("sidebar")!.classList.remove("sidebar--open");
  });

  onStateChange(() => {
    updateCards();
    renderSidebar();
  });

  renderGrid(SPECS);
  renderSidebar();
}

document.addEventListener("DOMContentLoaded", init);
