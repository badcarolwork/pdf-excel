export interface SpecTableRow {
  component: string;
  quantity: string;
  size: string;
  format: string;
}

export interface AdSpec {
  slug: string;
  title: string;
  description: string;
  dimension: string;
  remark: string;
  table: SpecTableRow[];
}

export const SPECS: AdSpec[] = [
 {
  slug: "quiz-a",
  title: "Feature Spotlight Quiz",
  description: "A smartphone rotates as feature icons orbit around it before revealing a call-to-action button.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable. Must provide the quiz question & answer set.",
  table: [
    { component: "Logo Image", quantity: "1", size: "300×250, < 20kb", format: "JPG, PNG, SVG" },
    { component: "Background Image", quantity: "1", size: "MREC: 600×500 / Half page: 600×1200 / Mobile STO: 640×960, < 30kb each", format: "JPG, PNG, SVG" },
    { component: "Quiz Question & Answer", quantity: "1–3", size: "-", format: "TEXT" },
  ],
},
{
  slug: "spin-wheel",
  title: "Waterproof Transformation Wheel",
  description: "A damaged wall transforms into a waterproof surface with water droplets bouncing off.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable. Supported up to 4 landing URLs.",
  table: [
    { component: "KV Image", quantity: "3–4", size: "MREC: 600×500 / Half page: 600×1200 / Mobile STO: 640×960, < 30kb each", format: "JPG, PNG, SVG" },
    { component: "Wheel Image", quantity: "1", size: "600×600, < 20kb", format: "JPG, PNG, SVG" },
    { component: "Background Color", quantity: "1", size: "-", format: "HEX Code" },
  ],
},
{
  slug: "chatbot",
  title: "Interactive Chat Assistant",
  description: "A guided chat experience opens to answer questions and recommend products in real time.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable. Conversation Flow is required.",
  table: [
    { component: "Logo Image", quantity: "1", size: "300×300, < 20kb", format: "JPG, PNG, SVG" },
    { component: "CTA Image", quantity: "1", size: "240×80, < 20kb", format: "JPG, PNG, SVG" },
    { component: "Key Visual", quantity: "1", size: "MREC: 600×500 / Half page: 600×1200 / Mobile STO: 640×960, < 30kb each", format: "JPG, PNG, SVG" },
    { component: "Conversation Flow", quantity: "1", size: "-", format: "TEXT" },
  ],
},
{
  slug: "countdown",
  title: "Urgency Countdown Timer",
  description: "A live countdown timer builds urgency for sales, events and limited-time offers.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable.",
  table: [
    { component: "Logo Image", quantity: "1", size: "300×250, < 20kb", format: "JPG, PNG, SVG" },
    { component: "Background Image", quantity: "1", size: "MREC: 600×500 / Half page: 600×1200 / Mobile STO: 640×960, < 30kb each", format: "JPG, PNG, SVG" },
    { component: "Event Date", quantity: "1", size: "-", format: "TEXT" },
    { component: "CTA Image", quantity: "1", size: "240×80, < 30kb", format: "JPG, PNG" },
  ],
},
{
  slug: "hotspot",
  title: "Interactive Product Hotspots",
  description: "Users tap hotspots on the visual to reveal extra features, content and offers.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable. Supported up to 5 landing URLs.",
  table: [
    { component: "Product Image", quantity: "1", size: "MREC: 600×500 / Half page: 600×1200 / Mobile STO: 640×480, < 30kb each", format: "JPG, PNG, SVG" },
    { component: "CTA Image", quantity: "1", size: "240×80, < 30kb", format: "JPG, PNG" },
    { component: "Option Image", quantity: "2–5", size: "400×240, < 20kb", format: "JPG, PNG" },
    { component: "Logo", quantity: "1", size: "300×200, < 30kb", format: "JPG, PNG, SVG" },
  ],
},
{
  slug: "carousel-ad",
  title: "Swipeable Product Carousel",
  description: "Multiple products and stories slide into view within a swipeable ad experience.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable.",
  table: [
    { component: "Product Image", quantity: "2–5", size: "MREC: 600×500 / Half page: 600×1200 / Mobile STO: 640×480, < 30kb each", format: "JPG, PNG, SVG" },
    { component: "CTA Image", quantity: "1", size: "240×80, < 30kb", format: "JPG, PNG" },
    { component: "Logo Image", quantity: "1", size: "300×250, < 20kb", format: "JPG, PNG, SVG" },
    { component: "Navigation Arrow (optional)", quantity: "1", size: "50×50, < 10kb", format: "JPG, PNG, SVG" },
  ],
},
{
  slug: "data-capture",
  title: "Instant Lead Capture Form",
  description: "A built-in form lets users sign up directly within the banner.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable. Kindly provide the questions set.",
  table: [
    { component: "Logo Image", quantity: "Max 3", size: "300×250, < 20kb", format: "JPG, PNG, SVG" },
    { component: "Product Image", quantity: "1", size: "MREC: 600×500 / Half page: 600×1200 / Mobile STO: 640×480, < 30kb each", format: "JPG, PNG, SVG" },
    { component: "CTA Image", quantity: "1", size: "240×80, < 30kb", format: "JPG, PNG" },
    { component: "Form Question", quantity: "1", size: "-", format: "-" },
  ],
},
{
  slug: "video-teaser-ad",
  title: "Video Teaser Experience",
  description: "A short video teaser sparks curiosity and drives users to watch the full story.",
  dimension: "300×250, 300×300, 300×600, 320×480, 800×600, 970×250",
  remark: "Photoshop and Illustrator work files are acceptable. Supported up to 5 landing URLs.",
  table: [
    { component: "Product Image", quantity: "1–5", size: "640×960, < 30kb", format: "JPG, PNG, SVG" },
    { component: "Logo Image", quantity: "1", size: "300×300, < 20kb", format: "JPG, PNG, SVG" },
    { component: "CTA Image", quantity: "1", size: "240×80, < 20kb", format: "JPG, PNG, SVG" },
    { component: "Video", quantity: "1–5", size: "1920×1080, 16:9, < 2.2mb, < 5 seconds", format: "MP4 (H264/AAC)" },
  ],
},
{
  slug: "interstitial",
  title: "Full-Screen Brand Impact",
  description: "A high-impact full-screen ad captures undivided attention between content.",
  dimension: "320×480, 800×600",
  remark: "Photoshop and Illustrator work files are acceptable.",
  table: [
    { component: "Product Image", quantity: "1", size: "Mobile STO: 640×480 / PC STO: 800×600, < 40kb each", format: "JPG, PNG, SVG" },
    { component: "CTA Image", quantity: "1", size: "240×80, < 30kb", format: "JPG, PNG / HEX Code" },
  ],
},
{
  slug: "skinner",
  title: "Site Skin Brand Wrap",
  description: "The entire page is wrapped with branded visuals while keeping content visible.",
  dimension: "1920×1080",
  remark: "Photoshop and Illustrator work files are acceptable.",
  table: [
    { component: "Top Image", quantity: "1", size: "970×250, < 30kb", format: "JPG, PNG, SVG" },
    { component: "Side Panel Image", quantity: "2", size: "260×700, < 30kb", format: "JPG, PNG" },
    { component: "Bottom Image", quantity: "2", size: "970×250, < 30kb", format: "JPG, PNG" },
    { component: "Background Color", quantity: "1", size: "-", format: "HEX Code" },
  ],
},
];
