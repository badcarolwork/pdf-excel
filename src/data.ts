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
    slug: "quiz-ad",
    title: "Quiz Ad",
    description: "An interactive unit that guides users through quick, tap-through questions to reveal a tailored result or recommendation. Ideal for engagement-led campaigns.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable. Must provide the quiz question & answer set.",
    table: [
      { component: "Logo Image", quantity: "1", size: "300x250, < 20kb", format: "JPG, PNG, SVG" },
      { component: "Background Image", quantity: "1", size: "MREC: 600x500 / Half page: 600x1200 / Mobile STO: 640x960, < 30kb each", format: "JPG, PNG, SVG" },
      { component: "Quiz Question & Answer", quantity: "1-3", size: "-", format: "TEXT" },
    ],
  },
  {
    slug: "spin-wheel",
    title: "Spin Wheel",
    description: "Spin-to-win built directly into your ad. Drives excitement, repeat engagement and data capture for promos, loyalty pushes and campaigns that need game-show energy.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable. Supported up to 4 landing URLs.",
    table: [
      { component: "KV Image", quantity: "3-4", size: "MREC: 600x500 / Half page: 600x1200 / Mobile STO: 640x960, < 30kb each", format: "JPG, PNG, SVG" },
      { component: "Wheel Image", quantity: "1", size: "600x600, < 20kb", format: "JPG, PNG, SVG" },
      { component: "Background Color", quantity: "1", size: "-", format: "HEX Code" },
    ],
  },
  {
    slug: "chatbot",
    title: "Chatbot",
    description: "A conversational ad unit that opens into a guided chat experience. Helps answer questions, qualify leads and recommend products in real time.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable. Conversation Flow is required.",
    table: [
      { component: "Logo Image", quantity: "1", size: "300x300, < 20kb", format: "JPG, PNG, SVG" },
      { component: "CTA Image", quantity: "1", size: "240x80, < 20kb", format: "JPG, PNG, SVG" },
      { component: "Key Visual", quantity: "1", size: "MREC: 600x500 / Half page: 600x1200 / Mobile STO: 640x960, < 30kb each", format: "JPG, PNG, SVG" },
      { component: "Conversation Flow", quantity: "1", size: "-", format: "TEXT" },
    ],
  },
  {
    slug: "countdown",
    title: "Countdown Ad",
    description: "Embed a live countdown timer into your creative to build urgency. Made for sales, events and limited-time offers where every hour to deadline matters.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable.",
    table: [
      { component: "Logo Image", quantity: "1", size: "300x250, < 20kb", format: "JPG, PNG, SVG" },
      { component: "Background Image", quantity: "1", size: "MREC: 600x500 / Half page: 600x1200 / Mobile STO: 640x960, < 30kb each", format: "JPG, PNG, SVG" },
      { component: "Event Date", quantity: "1", size: "-", format: "TEXT" },
      { component: "CTA Image", quantity: "1", size: "240x80, < 30kb", format: "JPG, PNG" },
    ],
  },
  {
    slug: "hotspot",
    title: "Hotspot Interactive",
    description: "Let users tap hotspots on your visual to unlock extra content, features or offers. Perfect for complex products, hero visuals and campaigns that reward curiosity.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable. Supported up to 5 landing URLs.",
    table: [
      { component: "Product Image", quantity: "1", size: "MREC: 600x500 / Half page: 600x1200 / Mobile STO: 640x480, < 30kb each", format: "JPG, PNG, SVG" },
      { component: "CTA Image", quantity: "1", size: "240x80, < 30kb", format: "JPG, PNG" },
      { component: "Option Image", quantity: "2-5", size: "400x240, < 20kb", format: "JPG, PNG" },
      { component: "Logo", quantity: "1", size: "300x200, < 30kb", format: "JPG, PNG, SVG" },
    ],
  },
  {
    slug: "carousel-ad",
    title: "Carousel Ad",
    description: "Showcase multiple products, features or stories in a single swipeable unit. Perfect for ranges, bundles and campaigns that need more than one frame.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable.",
    table: [
      { component: "Product Image", quantity: "2-5", size: "MREC: 600x500 / Half page: 600x1200 / Mobile STO: 640x480, < 30kb each", format: "JPG, PNG, SVG" },
      { component: "CTA Image", quantity: "1", size: "240x80, < 30kb", format: "JPG, PNG" },
      { component: "Logo Image", quantity: "1", size: "300x250, < 20kb", format: "JPG, PNG, SVG" },
      { component: "Navigation Arrow (optional)", quantity: "1", size: "50x50, < 10kb", format: "JPG, PNG, SVG" },
    ],
  },
  {
    slug: "data-capture",
    title: "Data Capture",
    description: "A lead-gen unit with a built-in form so users can sign up without leaving the page. Ideal for newsletters, samples, trials and contest entries.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable. Kindly provide the questions set.",
    table: [
      { component: "Logo Image", quantity: "Max 3", size: "300x250, < 20kb", format: "JPG, PNG, SVG" },
      { component: "Product Image", quantity: "1", size: "MREC: 600x500 / Half page: 600x1200 / Mobile STO: 640x480, < 30kb each", format: "JPG, PNG, SVG" },
      { component: "CTA Image", quantity: "1", size: "240x80, < 30kb", format: "JPG, PNG" },
      { component: "Form Question", quantity: "1", size: "-", format: "-" },
    ],
  },
  {
    slug: "video-teaser-ad",
    title: "Video Teaser Ad",
    description: "A short, thumb-stopping video that teases your full story, launch or offer. Designed to spark curiosity and drive users to click through to the main film.",
    dimension: "300x250, 300x300, 300x600, 320x480, 800x600, 970x250",
    remark: "Photoshop and Illustrator work files are acceptable. Supported up to 5 landing URLs.",
    table: [
      { component: "Product Image", quantity: "1-5", size: "640x960, < 30kb", format: "JPG, PNG, SVG" },
      { component: "Logo Image", quantity: "1", size: "300x300, < 20kb", format: "JPG, PNG, SVG" },
      { component: "CTA Image", quantity: "1", size: "240x80, < 20kb", format: "JPG, PNG, SVG" },
      { component: "Video", quantity: "1-5", size: "1920x1080, 16:9, < 2.2mb, < 5 seconds", format: "MP4 (H264/AAC)" },
    ],
  },
  {
    slug: "interstitial",
    title: "Interstitial",
    description: "A high-impact full-screen placement that appears between content. Ideal for launches, promos and key visuals where you want users' undivided attention.",
    dimension: "320x480, 800x600",
    remark: "Photoshop and Illustrator work files are acceptable.",
    table: [
      { component: "Product Image", quantity: "1", size: "Mobile STO: 640x480 / PC STO: 800x600, < 40kb each", format: "JPG, PNG, SVG" },
      { component: "CTA Image", quantity: "1", size: "240x80, < 30kb", format: "JPG, PNG / HEX Code" },
    ],
  },
  {
    slug: "skinner",
    title: "Skinner",
    description: "Wrap the site in your brand while still keeping content visible. Gives you a full-page presence with space to feature multiple products and brand messages.",
    dimension: "1920x1080",
    remark: "Photoshop and Illustrator work files are acceptable.",
    table: [
      { component: "Top Image", quantity: "1", size: "970x250, < 30kb", format: "JPG, PNG, SVG" },
      { component: "Side Panel Image", quantity: "2", size: "260x700, < 30kb", format: "JPG, PNG" },
      { component: "Bottom Image", quantity: "2", size: "970x250, < 30kb", format: "JPG, PNG" },
      { component: "Background Color", quantity: "1", size: "-", format: "HEX Code" },
    ],
  },
];
