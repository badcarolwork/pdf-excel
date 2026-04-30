// ---------------- DATA (slug-based) ----------------
// IMPORTANT: slug is your selection key, e.g. "quiz-ad"
const SPECS = [
  {
    slug: "space-invader",
    title: "Space Invader",
    description: "Playable Game Ad is designed to boost brand recall and user intent through interactive, arcade-style gameplay.",
    dimension: "300×600, 320×480",
    link: "https://kult.my/space-invader/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>",
   table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Object Image", "1 - 5", "100x100, < 10kb", "JPG, PNG, SVG"],
      ["Product/ Character Image", "1", "100x100, < 10kb", "JPG, PNG, SVG"],
      ["CTA Image", "1", "240x80, < 30kb", "JPG, PNG / HEX Code"],
      ["Logo", "1", "300x300, < 30kb", "JPG, PNG, SVG"],
      ["Background Color", "1", "-", "HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "spin-wheel",
    title: "Spin Wheel",
    description:"Spin-to-win, built directly into your ad. This drives excitement, repeat engagement and data capture for promos, loyalty pushes and campaigns that need a little bit of 'game show' energy.",
    dimension: "300x250, 300x300, 300×600, 320×480, 800x600, 970x250",
    link: "https://kult.my/spin-wheel/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Supported up to 4 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["KV Image", "3 - 4", "MREC: 600x500, < 30kb <br/>Half page: 600x1200, < 30kb <br/>Mobile STO: 640x960, < 30kb <br/>PC STO: 800x600, < 30kb <br/>PC Masthead: 970x250, < 30kb <br/>Mobile Masthead: 300x300, < 30kb <br/>","JPG, PNG, SVG"],
      ["Wheel Image", "1", "600x600, < 20kb", "JPG, PNG, SVG"],
      ["Background Color", "1", "-", "HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "reservation-booking-ad",
    title: "Reservation/ Booking Ad",
    description: "This ad combines rich visuals with a built-in booking call-to-action, ideal for industries that want to close the loop quickly.",
    dimension: "300x250, 300x300, 300×600, 320×480, 800x600, 970x250",
    link: "https://kult.my/reservation-booking-ad/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Video/ Carousel feature is optional",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image", "1", "300x80​", "JPG, PNG, SVG"],
      ["KV Image", "1", "PC: 600x600, < 20kb <br/> Mobile: 600x340​, < 20kb​", "JPG, PNG, SVG"],
      ["Carousel Image <i>(optional)</i>", "1~5", "PC: 600x600, < 20kb <br/>Mobile: 600x340​, < 20kb​", "JPG, PNG, SVG"],
      ["Video <i>(optional)</i>", "1", "1920x1080, < 2.2mb , < 30 seconds​", "MP4 (H264/ AAC)"],
      ["CTA Image​ / Color", "1", "300x100, < 20kb", "TEXT, PNG​, HEX Code​(e.g.:  #ffffff)​"],
      ["Background Color", "1", "-", "JPG, PNG​, HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "ballon-ad",
    title: "Balloon Ad",
    description:
      "A floating balloon teaser that opens into a full-screen experience.<br/>Balloon Ad helps you qualify leads, collect preferences and guide users towards samples, sign-ups or offers in a conversational way.",
    dimension: "1920x1080 (fullscreen expandable)",
    link: "https://kult.my/ballon-ad/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image", "1", "300x130, < 20kb​", "PNG, SVG"],
      ["Ballon Ad", "1", "400x400, < 20kb​", "JPG, PNG, SVG"],
      ["Key Visual​", "1", "PC: 800x650, < 40kb​ <br/>Mobile: 450x600 < 40kb​", "JPG, PNG, PSD, AI​"],
      ["Background Color", "1", "-", "JPG, PNG​, HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "movement-flip",
    title: "Movement Flip",
    description:
      "An animated unit where panels “flip” on interaction to reveal more content, offers or variants.<br/>It is ideal when you want to tell a layered story in a compact space and reward users for exploring.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/movement-flip/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Supported up to 5 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image", "1", "300x 130​", "PNG, SVG"],
      ["Key Visual​", "2 - 5", "MREC: 600x500, < 30kb <br/>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600, 30kb <br/>PC Masthead: 970x250, <30kb <br/>Mobile Masthead: 300x300, <30kb ​​", "JPG, PNG, SVG​"],
      ["Background Color", "1", "-", "JPG, PNG​, HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "shop-with-video",
    title: "Shop with video",
    description:"Turn your video into a shoppable storefront.</br>It lets users watch your film while tapping on tagged products to view details and click straight through to purchase or learn more.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/shop-with-video/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Supported up to 5 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Products Image", "Max. 5", "400x400, < 20kb​​", "JPG, PNG, SVG"],
      ["Product Title &​ short description", "Max 20 characters", "-​", "TEXT"],
      ["Navigation Arrow​ <i>(optional)</i>​", "1", "50x50, < 10kb​​", "JPG, PNG, SVG​"],
      ["Logo Image​", "1", "300x300, < 20kb​​", "JPG, PNG, SVG​"],
      ["CTA Image​", "1", "240x80, < 20kb​​", "JPG, PNG, SVG​"],
      ["Video", "1", "1920x1080​, 16:9 <br/>< 2.2mb ​​ <br/>< 5 seconds​​​", "mp4 (H264/ AAC​)​"],
    ],
  },
  {
    slug: "video-teaser-ad",
    title: "Video Teaser Ad",
    description:"A short, thumb-stopping video that teases your full story, launch or offer.<br/>This ad asset is designed to spark curiosity and drive users to click through to the main film, landing page or campaign hub.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/video-teaser-ad/",
    remark: "Photoshop and Illustrator work files are acceptable. </br> Supported up to 5 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Products Image", "1 - 5", "640x960, < 30kb​​​", "JPG, PNG, SVG"],
      ["Logo Image​", "1", "300x300, < 20kb​​", "JPG, PNG, SVG​"],
      ["CTA Image​", "1", "240x80, < 20kb​​", "JPG, PNG, SVG​"],
      ["Video", "1 - 5", "1920x1080​, 16:9 <br/>< 2.2mb ​​ <br/>< 5 seconds​​​", "mp4 (H264/ AAC​)​"],      
      ["Navigation Arrow​ <i>(optional)</i>​", "1", "50x50, < 10kb​​", "JPG, PNG, SVG​"],
    ],
  },
  {
    slug: "chatbot",
    title: "Chatbot",
    description:"A conversational ad unit that opens into a guided chat experience.<br/>Chatbot helps you answer questions, qualify leads and recommend products in real time, then drives users to sign up, book or buy with tailored prompts.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/chatbot/",
    remark: "Photoshop and Illustrator work files are acceptable. </br> ",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image​", "1", "300x300, < 20kb​​", "JPG, PNG, SVG​"],
      ["CTA Image​", "1", "240x80, < 20kb​​", "JPG, PNG, SVG​"],
      ["Key Visual​", "1", "MREC: 600x500, < 30kb <br/>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600, < 30kb <br/>PC Masthead: 970x250, < 30kb <br/>Mobile Masthead: 300x300, < 30kb ​​", "JPG, PNG, SVG​"],
      ["Conversation Flow​​", "1", "-​", "TEXT​"]
    ],
  },
  {
    slug: "tap-explore-gallery",
    title: "Tap & Explore Gallery",
    description:"A visual-led unit that opens into an image or content gallery when users tap.<br/>This ad is perfect for product ranges, lookbooks, menus and collections where people want to browse through multiple options before clicking out.",
    dimension: "300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/tap-explore-gallery/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Supported up to 5 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image​", "1", "300x300, < 20kb​​", "JPG, PNG, SVG​"],
      ["Background / Key Visual Image", "1", "Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600, < 30kb <br/>PC Masthead: 970x250, < 30kb​​", "JPG, PNG, SVG​"],
      ["Product Carousel Image​", "Max. 5 ", "600x400, < 20kb​​", "JPG, PNG, SVG​"],
      ["Hotspot Dot​", "Max. 5 ", "50x50, < 20kb​​", "JPG, PNG, SVG​"]
    ],
  },
  {
    slug: "sticky-note",
    title: "Sticky Note",
    description:"A small but unmissable “note” that stays pinned on-screen as users scroll.<br/>Sticky Note is ideal for highlighting promo codes, reminders, key messages or CTAs that you want visible at all times without taking over the page.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/sticky-note/",
    remark: "Photoshop and Illustrator work files are acceptable. </br> ",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Front & Back Image", "1", "MREC: 600x500, < 30kb <br/>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600, < 30kb <br/>PC Masthead: 970x250, < 30kb <br/>Mobile Masthead: 300x300, < 30kb ​​", "JPG, PNG, SVG​"],
      ["Video <i>(optional)</i>", "1", "1920x1080​, 16:9 <br/> < 2.2mb ​​ <br/> < 5 seconds​​​", "mp4 (H264/ AAC​)​"],    
      ["CTA Image​", "1", "240x80, < 20kb​​", "JPG, PNG, SVG​"],
      ["Arrow Image <i>(optional)</i>​", "1", "50x50, < 10kb​​", "JPG, PNG, SVG​"],
    ],
  },
  {
    slug: "flip-book",
    title: "Flip Book",
    description:"An interactive flip-through experience that behaves like a mini digital brochure.<br/>This is great for catalogues, menus, guides and campaign lookbooks where users can turn pages, discover more and click through when something catches their eye.",
    dimension: "300×600, 320×480, 800x600",
    link: "https://kult.my/flip-book/",
    remark: "Photoshop and Illustrator work files are acceptable. </br> ",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Front Top Image", "1", "Half page: 600x600, < 20kb<br/>Mobile STO: 640x480, < 30kb<br/>PC STO: 800x600, < 30kb​​", "JPG, PNG, SVG​"],
      ["Back top & Bottom Image", "2", "Half page: 600x600, < 20kb<br/>Mobile STO: 640x480, < 30kb<br/>PC STO: 800x600, < 30kb​​", "JPG, PNG, SVG​"],
      ["Logo Image​", "1", "300x300, < 20kb​​", "JPG, PNG, SVG​"],
      ["Video <i>(optional)</i>", "1", "1920x1080​, 16:9 <br/>< 2.2mb ​​ <br/>< 5 seconds​​​", "mp4 (H264/ AAC​)​"],    
      ["CTA Image​", "1", "240x80, < 20kb​​", "JPG, PNG, SVG​"]
    ],
  },
  {
    slug: "tilt-pop-carousel",
    title: "Tilt-Pop Carousel",
    description:"A carousel where each card subtly tilts and “pops” on interaction.<br/>This Carousel gives your products or visuals extra depth and movement, making it ideal for line-ups, curated edits and hero ranges that need to stand out.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/tilt-pop-carousel/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Supported up to 5 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Product Image", "2 - 5", "MREC: 540x440, < 30kb<br/>Half page: 540x1100, < 30kb<br/>Mobile STO: 560x900, < 30kb<br/>PC STO: 670x510, < 30kb<br/>PC Masthead: 880x190, < 30kb <br/>Mobile Masthead: 540x440,< 30kb​​", "JPG, PNG, SVG​"],
      ["Logo Image​", "1", "300x300, <20kb​​", "JPG, PNG, SVG​"],
      ["CTA Image​", "1", "240x100, <20kb​​", "JPG, PNG, SVG​"]
    ],
  },
  {
    slug: "3d-float-flip",
    title: "3D Float-flip",
    description:"A 3D-style unit where cards or objects float above the background and flip to reveal more detail on interaction.<br/>3D Float-flip is built for premium, visually-driven campaigns that want to showcase features or variants in a modern, high-impact way.",
    dimension: "300×250, 300×600, 320×480, 800x600",
    link: "https://kult.my/3d-float-flip/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Supported up to 2 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Product Image", "1 - 2", "MREC: <br/>Half page: 540x1100, < 30kb<br/>Mobile STO: 560x900, < 30kb<br/>PC STO: 670x510, < 30kb <br/>​​", "JPG, PNG, SVG​"],
      ["Logo Image​", "1", "300x300, <20kb​​", "JPG, PNG, SVG​"],
      ["CTA Image​", "1", "240x100, <20kb​​", "JPG, PNG, SVG​"]
    ],
  },
  {
    slug: "storytelling",
    title: "Storytelling",
    description:"A single-track audio experience that plays as users engage, delivering your message through voice, mood and sound. Storytelling is ideal when you want to create an immersive moment—one clear narrative brought to life with tone and pacing—perfect for brand tales, product intros or emotional hooks that resonate in just a few seconds.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/storytelling/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>Kindly provide the story/ script.",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image​", "1", "300x250, < 20kb​​", "JPG, PNG, SVG​"],
      ["Background Image​", "1", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Story/ Script/ voice-over file​", "1", "Duration​: Max. 30 sec , < 1mb​​", "mp3/ mp4 (AAC​)​"]
    ],
  },
  {
    slug: "skinner",
    title: "Skinner",
    description: "Wrap the site in your brand while still keeping content visible. Skinner gives you a full-page presence with space to feature multiple products, promos or brand messages in a premium layout.",
    dimension: "1920x1080",
    link: "https://kult.my/skinner/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Top Image", "1", "970x250 < 30kb", "JPG, PNG, SVG"],
      ["Side Panel Image", "2", "260x700 < 30kb", "JPG, PNG"],
      ["Bottom Image", "2", "970x250 < 30kb", "JPG, PNG"],
      ["Background Color", "1", "-", "HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "wave-cards",
    title: "Wave Cards",
    description:"A stack of product cards that animate into view as users interact. Wave Cards is great for multi-SKU campaigns, curated sets or line-ups where each item needs its own visual and click-through.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/wave-cards/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Product Image​", "1 - 5", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Arrow Image​ <i>(optional)</i>​", "1", "50x50, < 20kb​​", "JPG, PNG, SVG​"],
    ],
  },
  {
    slug: "quiz-ad",
    title: "Quiz Ad",
    description:"An interactive unit that guides users through quick, tap-through questions to reveal a tailored result or recommendation.<br/>Quiz is ideal for engagement-led campaigns, helping users explore products or messages in a fun, conversational flow while keeping the experience light, personalised and highly clickable.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/quiz-ad/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>Must provide the quiz question & answer set.",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image​​", "1", "300x250, < 20kb​​​​", "JPG, PNG, SVG​"],
      ["Background Image​", "1", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Quiz Question & Answer​", "1 - 3", "-​", "TEXT​"],
    ],
  },
  {
    slug: "shape-drop",
    title: "Shape Drop",
    description:"An animated rich media unit where branded shapes and elements “drop” into place to reveal your key message, product or offer. Great for playful, visually-led campaigns, especially when you want to spotlight multiple variants or features that feels dynamic and fun.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/shape-drop/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>Must provide the formula/ question & answer set.",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Product/ Shape Image​​", "Max. 3", "50x50, < 20kb​​​​", "JPG, PNG, SVG​"],
      ["Logo Image​​", "1", "300x250, < 20kb​​​​​​​", "JPG, PNG, SVG​"],
      ["Background Image​", "1", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Title/ Tagline Text​", "1", "-​", "TEXT​"],
    ],
  },
  {
    slug: "reveal-mystery-box",
    title: "Reveal Mystery Box",
    description:"An animated rich media unit where branded shapes and elements “drop” into place to reveal your key message, product or offer. Great for playful, visually-led campaigns, especially when you want to spotlight multiple variants or features that feels dynamic and fun.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/reveal-mystery-box/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Product Image​", "2 (frame 1 & 2)", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Close Button <i>(optional)</i>​", "1", "50x50, < 20kb​", "JPG, PNG, SVG"],
    ],
  },
  {
    slug: "multi-tab",
    title: "Multi-tab",
    description:"One ad, multiple tabs.<br/>Multi Tab lets users switch between different products, plans or messages within a single unit, keeping your campaign tidy while still telling the full story.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800×600, 970×250",
    link: "https://kult.my/multi-tab/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Product Image​", "2 - 4", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Logo Image​​", "1", "300x250, < 20kb​​​​​​​", "JPG, PNG, SVG​"],
      ["Tab Color/ Image", "2 - 4", "64x44, < 20kb​​​​​​​", "JPG, PNG/ HEX Code (e.g.: #ffffff)​"],
      ["CTA Image​", "1", "240x100, <20kb​​", "JPG, PNG, SVG​"]
    ],
  },
  {
    slug: "puzzle-ad",
    title: "Puzzle Ad",
    description:"A simple jigsaw-style interaction where your brand visual is revealed as users complete the puzzle.<br/>This ad boosts time spent and memorability for awareness campaigns that want a playful twist.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800×600, 970×250",
    link: "https://kult.my/puzzle-ad/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Puzzle  Image​​", "1", "520x520, < 30kb", "JPG, PNG, SVG​"],   
      ["Background Image​", "1", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Logo Image​​", "1", "300x250, < 20kb​​​​​​​", "JPG, PNG, SVG​"],      
      ["CTA Image​", "1", "240x100, < 20kb​​", "JPG, PNG, SVG​"],
      ["Background Color", "1", "-​", "JPG, PNG/ HEX Code (e.g.: #ffffff)​"],
    ],
  },
  {
    slug: "countdown",
    title: "Countdown Ad",
    description: "Embed a live countdown timer into your creative to build urgency.<br/>Countdown Ad is made for sales, events and limited-time offers where every hour to deadline matters.",
    dimension: "300×250, 300,300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/countdown/",
    remark: "Photoshop and Illustrator work files are acceptable.<br/>",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image​​", "1", "300x250, < 20kb​​​​​​​", "JPG, PNG, SVG​"],      
      ["Background Image​", "1", "MREC: 600x500, < 30kb</br>Half page: 600x1200, < 30kb<br/>Mobile STO: 640x960, < 30kb<br/>PC STO: 800x600,< 30kb <br/>PC Masthead: 970x250, PC Masthead:600x600,< 30kb <br/>​", "JPG, PNG, SVG​"],
      ["Event Date", "1", "-", "TEXT"],
      ["CTA Image", "1", "240x80, < 30kb", "JPG, PNG"],
    ],
  },
  {
    slug: "hotspot",
    title: "Hotspot Interactive",
    description: "Let users tap hotspots on your visual to unlock extra content, features or offers.<br/>Perfect for complex products, hero visuals and campaigns that reward curiosity.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/tilt-pop-carousel/",
    remark: "Photoshop and Illustrator work files are acceptable. </br> Supported up to 5 landing URL",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Product Image", "1", "MREC: 600x500, < 30kb<br/>Half page: 600x1200, < 60kb<br/>Mobile STO:640x480, < 40kb<br/>PC STO: 800x600, < 40kb<br/>PC Masthead: 950x250,< 40kb<br/>Mobile Masthead: 600x600, < 30kb", "JPG, PNG, SVG"],
      ["CTA Image", "1", "240x80, < 30kb", "JPG, PNG"],
      ["Option Image", "2 - 5", "400x240, < 20kb", "JPG, PNG"],
      ["Logo", "1", "300x200, < 30kb", "JPG, PNG, SVG"],
    ],
  },
  {
    slug: "3d-social-video",
    title: "3D Social Video",
    description: "A social-style video unit with depth and motion that feels native to the feed.<br/>Ideal for extending your existing social content into premium media without losing that “thumb-stopping” feel.",
    dimension: "300x600, 320x480, 1080x1920",
    link: "https://kult.my/3d-social-video/",
    remark: "Photoshop and Illustrator work files are acceptable. </br>Transparent background video needed.</br>",
   table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo", "1", "100x100, < 30kb", "JPG, PNG, SVG"],
      ["Background Image", "1", "Half page: 600x1200, < 30kb<br/> Mobile STO:640x480, < 30kb", "JPG, PNG, SVG"],
      ["Video​​", "1", "1080x1920, < 2.2mb​​​​​​​", "mp4 (AAC​)"],
      ["Caption Text", "1", "-", "TEXT"]
    ],
  },
  {
    slug: "social-display-ad",
    title: "Social Display Ad",
    description: "Turn your best-performing social posts into high-performing display.<br/>This ad repurposes your social creative and cues into standard display units, helping you scale what already works.",
    dimension: "300×600, 320×480",
    link: "https://kult.my/social-display-ad/",
    remark: "A social media post link must be provided. </br> ",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Video​ <i>(optional)</i>​", "1", "1080x1920, < 2.2mb​​​​​​​", "mp4 (AAC​)"],
      ["Background Color", "1", "-", "HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "data-capture",
    title: "Data Capture",
    description: "A lead-gen unit with a built-in form so users can sign up without leaving the page.<br/>This is ideal for newsletters, samples, trials, contest entries and CRM growth.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/data-capture/",
    remark: "Photoshop and Illustrator work files are acceptable.​</br>Kindly provide the questions set.",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image​​", "Max. 3", "300x250, < 20kb​​​​​​​", "JPG, PNG, SVG​"],      
      ["Product Image", "1", "MREC: 600x500, < 30kb<br/>Half page: 600x1200, < 60kb<br/>Mobile STO:640x480, < 40kb<br/>PC STO: 800x600, < 40kb<br/>PC Masthead: 950x250,< 40kb<br/>Mobile Masthead: 600x600, < 30kb", "JPG, PNG, SVG"],
      ["Event Date", "1", "-", "TEXT"],
      ["CTA Image", "1", "240x80, < 30kb", "JPG, PNG"],
      ["Form Question", "1", "-", "-"]
    ],
  },
  {
    slug: "calculator-ad",
    title: "Calculator Ad",
    description: "Let users key in their own numbers within their own budget and see instant, personalised results inside the ad.<br/>This is built for categories like finance, telco, automotive, insurance, property where comparison drives conversion.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/calculator-ad/",
    remark: "Photoshop and Illustrator work files are acceptable.​</br>Loan formula must be provided",
    table: [
      ["Component", "Quantity", "Size", "Format"],
      ["Logo Image​​", "Max. 3", "300x250, < 20kb​​​​​​​", "JPG, PNG, SVG​"],      
      ["Background Image", "1", "MREC: 600x500, < 30kb<br/>Half page: 600x1200, < 60kb<br/>Mobile STO:640x480, < 40kb<br/>PC STO: 800x600, < 40kb<br/>PC Masthead: 950x250,< 40kb<br/>Mobile Masthead: 600x600, < 30kb", "JPG, PNG, SVG"],
      ["Caption Text", "1", "-", "TEXT"],
      ["CTA Image", "1", "240x80, < 30kb", "JPG, PNG"],
    ],
  },
  {
    slug: "merryview",
    title: "MerryView",
    description: "A 3D-style product gallery that users can scroll or swipe through.<br/>This gives your range a premium, editorial feel: ideal for launches, seasonal collections and curated edits.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/merryview/",
    remark: "Photoshop and Illustrator work files are acceptable.​</br>",
    table: [
      ["Component", "Quantity", "Size", "Format"],    
      ["Product Image", "1 - 5", "MREC: 600x500, < 30kb<br/>Half page: 600x1200, < 60kb<br/>Mobile STO:640x480, < 40kb<br/>PC STO: 800x600, < 40kb<br/>PC Masthead: 950x250,< 40kb<br/>Mobile Masthead: 600x600, < 30kb", "JPG, PNG, SVG"],
      ["Shadow Color <i>(optional)</i>", "1", "-", "HEX Code​ (e.g.: #ffffff)"],
      ["Navigation Arrow​ <i>(optional)</i>​", "1", "50x50, < 10kb​​", "JPG, PNG, SVG​"],
    ],
  },
  {
    slug: "cubevibe",
    title: "CubeVibe",
    description: "A rotating 3D cube that showcases up to four clickable faces.<br/>This is great for highlighting different variants or hero products in one eye-catching interactive unit.",
    dimension: "300×250, 300x300, 300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/cubevibe/",
    remark: "Photoshop and Illustrator work files are acceptable.​</br>",
    table: [
      ["Component", "Quantity", "Size", "Format"],    
      ["Product Image", "4", "MREC: 600x500, < 30kb<br/>Half page: 600x1200, < 60kb<br/>Mobile STO:640x480, < 40kb<br/>PC STO: 600x600, < 40kb<br/>PC Masthead: 950x250,< 40kb<br/>Mobile Masthead: 600x600, < 30kb", "JPG, PNG, SVG"],
      ["Shadow color <i>(optional)</i>", "1", "-", "HEX Code​ (e.g.: #ffffff)"],
    ],
  },
  {
    slug: "interstitial",
    title: "Interstitial",
    description: "A high-impact full-screen placement that appears between content, putting your brand moment as the focus on desktop and mobile.<br/>Ideal for launches, promos and key visuals where you want users’ undivided attention before they scroll away.",
    dimension: "320×480, 800x600",
    link: "https://kult.my/interstitial/",
    remark: "Photoshop and Illustrator work files are acceptable.​</br>",
    table: [
      ["Component", "Quantity", "Size", "Format"],    
      ["Product Image", "1", "Mobile STO:640x480, < 40kb<br/>PC STO: 800x600, < 40kb", "JPG, PNG, SVG"],
      ["CTA Image", "1", "240x80, < 30kb", "JPG, PNG / HEX Code"],
    ],
  },
  {
    slug: "product-collector",
    title: "Product Collector",
    description: "A fun game where users “collect” your products as they play.<br/>Designed to build affinity and familiarity with your range, ending with a clear path to hit the objective.",
    dimension: "300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/product-collector/",
    remark: "Photoshop and Illustrator work files are acceptable.​</br>",
    table: [
      ["Component", "Quantity", "Size", "Format"],    
      ["Key Visual image", "1", "Half page: 600x1200, < 60kb<br/>Mobile STO:640x480, < 40kb<br/>PC STO: 800x600, < 40kb</br> Masthead: 970x250, < 40kb", "JPG, PNG, SVG"],
      ["Product Image", "1", "50x50, < 20kb", "JPG, PNG, SVG"],
    ],
  },
  {
    slug: "mini-game",
    title: "Mini Game",
    description: "Turn your campaign into a quick, snackable game that lives inside the ad.<br/>This boosts interaction and time spent with your brand, then closes with a strong call-to-action or brand recall.",
    dimension: "300×600, 320×480, 800x600, 970×250",
    link: "https://kult.my/mini-game/",
    remark: "Photoshop and Illustrator work files are acceptable.​</br>",
    table: [
      ["Component", "Quantity", "Size", "Format"],    
      ["Key Visual image", "1", "Half page: 600x1200, < 60kb<br/>Mobile STO:640x480, < 40kb<br/>PC STO: 800x600,  < 40kb</br> Masthead: 970x250, < 40kb", "JPG, PNG, SVG"],
      ["Product Image", "1", "50x50, < 20kb", "JPG, PNG, SVG"],
    ],
  },
];

const KEY = "ad_spec_list_slugs"; // localStorage key (stores slugs)

// ---------------- STORAGE ----------------
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

// ---------------- UI ----------------
function renderSpecs() {
  const el = document.getElementById("addCart");
  el.addEventListener("click", (e) => {
    console.log("click");
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
    btn.innerHTML = added ? `<span class="badge">✓</span> Added` : `<span class="badge">＋</span> Add to download`;
  });
}

// ---------------- PDF HELPERS ----------------
// function placeholderImage(text) {
//   const svg = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="700" height="260">
//       <rect width="100%" height="100%" fill="#f3f4f6"/>
//       <rect x="14" y="14" width="672" height="232" fill="#fff" stroke="#d1d5db" stroke-width="2"/>
//       <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
//         font-family="Arial" font-size="24" fill="#6b7280">${text}</text>
//     </svg>`;
//   return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
// }
function placeholderImage(base64Img, text) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="700" height="260">      
      <!-- background -->
      <rect width="100%" height="100%" fill="#f3f4f6"/>      
      <!-- frame -->
      <rect x="14" y="14" width="672" height="232" fill="#fff" stroke="#d1d5db" stroke-width="2"/>
      <!-- image -->
      <image href="${base64Img}" x="14" y="14" width="672" height="232" preserveAspectRatio="xMidYMid meet"/>
      <!-- fallback text (optional overlay) -->
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
        <h2 style="margin:0;">KULT</h2>
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
        <div style="display:${s.remark ? "block" : "none"}"><p style="font-weight:bold;font-style:italic;color:#434343;font-size:12px;">Remark: </p><span style="font-size:12px;font-style: italic;color:#434343;">${s.remark} </span></div>
        <a href="${s.link}" style="display:inline-block;background:#000;color:#fff;border-radius:10px;padding:10px 20px;text-decoration:none;margin-top:10px;">View Demo</a>
        <h4 style="margin:20px 0 10px 0;">Ad Spec</h4>
        <table class="specDL-table" style="width:100%; table-layout:fixed; border-collapse:collapse;"">
            <thead>
                <tr>
                    ${s.table[0].map((h, i) => `<th style="width:${colthead[i]};text-align:left;">${h}</th>`).join("")}
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
  const pdfDom = buildPdfDom(specs);
  stage.appendChild(pdfDom);
  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 120)));
  await html2pdf()
    .set({ filename: "ad-specs.pdf", margin: 0, html2canvas: { scale: 2, backgroundColor: "#fff" }, jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }, pagebreak: { mode: ["css"] } })
    .from(pdfDom)
    .save();
  stage.innerHTML = "";
}

document.getElementById("specDL-card-close").addEventListener("click", function () {
  document.getElementById("specDL-card").style.display = "none";
});
document.getElementById("specDL-download").addEventListener("click", function () {
  document.getElementById("specDL-card").style.display = "unset";
});
$("#desc-dropdown").click(function () {
  $(".description-container").toggleClass("show visible");
  $("#addCart").toggleClass("show visible");
  $("#desc-dropdown").toggleClass("show visible");
});
function observeWidth2() {
  const target2 = $("body")[0]; // get raw DOM element
  const ro2 = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const width = $(entry.target).width();
      if (width > 1039 && width < 1200) {
        $(".gallery-inner-section").addClass("mid");
        $(".gallery-inner-section").removeClass("small");
      } else if (width < 1040) {
        $(".gallery-inner-section").addClass("mid small");
      } else {
        $(".gallery-inner-section").removeClass("mid");
        $(".gallery-inner-section").removeClass("small");
      }
    }
  });
  ro2.observe(target2);
}

observeWidth2();
//renderList();
// INIT
renderSpecs();
renderList();
syncButtons();
