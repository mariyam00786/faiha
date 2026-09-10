export type CategoryProject = {
  title: string;
  description: string;
  images: string[];
};

export type ContentCategory = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  projects?: CategoryProject[];
};

export const contentsData: ContentCategory[] = [
  {
    id: "01",
    slug: "courtyard",
    title: "COURTYARD",
    description: "Outdoor living & transitional spaces",
    image: "/contents/01.jpg.png",
    gallery: [],
    projects: [
      {
        title: "Style 1: Modern Zen",
        description: "Write your description about the creation of this modern zen courtyard here. Discuss the materials used, the feeling you wanted to evoke, and how the space transitions into the home.",
        images: [
          "/gallery/courtyard/design 1 (1).png",
          "/gallery/courtyard/design 1 (2).png",
          "/gallery/courtyard/design 1 (3).png"
        ]
      },
      {
        title: "Style 2: Tropical Retreat",
        description: "Write your description about the creation of this tropical retreat courtyard here. Mention the lush greenery choices, the lighting setup, and the structural elements that make it unique.",
        images: [
          "/gallery/courtyard/design 2 (1).png",
          "/gallery/courtyard/design 2 (2).png"
        ]
      },
      {
        title: "Style 3: Minimalist Concrete",
        description: "Write your description about the minimalist concrete courtyard here. Focus on the raw textures, the architectural lines, and how simplicity was achieved in the final build.",
        images: [
          "/gallery/courtyard/design 3 (1).png",
          "/gallery/courtyard/design 3 (2).png",
          "/gallery/courtyard/design 3 (3).png",
          "/gallery/courtyard/design 3 (4).png",
          "/gallery/courtyard/design 3 (5).png"
        ]
      }
    ]
  },
  {
    id: "02",
    slug: "exterior",
    title: "EXTERIOR",
    description: "Facades, landscaping & entryways",
    image: "/contents/02.jpg.png",
    gallery: [],
    projects: [
      {
        title: "Modern Exterior Design",
        description: "A comprehensive look at a stunning modern exterior design featuring contemporary materials and elegant landscaping.",
        images: [
          "/gallery/EXTERIOR/1 (3).png",
          "/gallery/EXTERIOR/2 (3).png",
          "/gallery/EXTERIOR/3 (2).png",
          "/gallery/EXTERIOR/4 (1).png",
          "/gallery/EXTERIOR/5 (1).png"
        ]
      }
    ]
  },
  {
    id: "03",
    slug: "kitchen",
    title: "KITCHEN",
    description: "Culinary spaces, modular & open-plan",
    image: "/contents/03.jpg.png",
    gallery: [],
    projects: [
      {
        title: "Kitchen Design 1",
        description: "Nordic minimalist kitchen featuring clean white cabinetry, warm oak accents, quartz countertops, and an open breakfast island.",
        images: [
          "/gallery/kitchen/design 1 (1).png",
          "/gallery/kitchen/design 1 (2).png",
          "/gallery/kitchen/design 1 (3).png"
        ]
      },
      {
        title: "Kitchen Design 2",
        description: "Modern monolithic island kitchen with dramatic waterfall quartz surfaces, fluted smoked oak joinery, and concealed appliances.",
        images: [
          "/gallery/kitchen/design 2 (1).png",
          "/gallery/kitchen/design 2 (2).png",
          "/gallery/kitchen/design 2 (3).png",
          "/gallery/kitchen/design 2 (4).png"
        ]
      },
      {
        title: "Kitchen Design 3",
        description: "Contemporary parallel kitchen layout designed for culinary efficiency with dedicated prep zones and ambient LED task lighting.",
        images: [
          "/gallery/kitchen/design 3 (1).png",
          "/gallery/kitchen/design 3 (2).png",
          "/gallery/kitchen/design 3 (3).png"
        ]
      },
      {
        title: "Kitchen Design 4",
        description: "High-performance compact modular kitchen optimizing vertical storage with Blum Aventos bi-fold hardware and seamless ergonomics.",
        images: [
          "/gallery/kitchen/design 4 (1).png",
          "/gallery/kitchen/design 4 (2).png",
          "/gallery/kitchen/design 4 (3).png",
          "/gallery/kitchen/design 4 (4).png"
        ]
      }
    ]
  },
  {
    id: "04",
    slug: "living",
    title: "LIVING",
    description: "Lounge, family & gathering spaces",
    image: "/contents/04.jpg.png",
    gallery: [],
    projects: [
      {
        title: "Living Design 1",
        description: "Double-height formal living lounge featuring warm fluted oak paneling, integrated media joinery, and circadian cove illumination.",
        images: [
          "/gallery/living/1 (1).png",
          "/gallery/living/1 (2).png",
          "/gallery/living/1 (3).png"
        ]
      },
      {
        title: "Living Design 2",
        description: "Intimate family living retreat centered around acoustic wood battens, bespoke low-profile media credenza, and tactile linen upholstery.",
        images: [
          "/gallery/living/2 (1).png",
          "/gallery/living/2 (2).png",
          "/gallery/living/2 (3).png"
        ]
      },
      {
        title: "Living Design 3",
        description: "Contemporary open-plan lounge connecting with adjacent dining zones, featuring curated display shelving and ambient directional sconces.",
        images: [
          "/gallery/living/3 (1).png",
          "/gallery/living/3 (2).png",
          "/gallery/living/3 (3).png",
          "/gallery/living/3 (4).png"
        ]
      }
    ]
  },
  {
    id: "05",
    slug: "dining",
    title: "DINING",
    description: "Dining & entertaining spaces",
    image: "/contents/05.jpg.png",
    gallery: [
      "/gallery/DINING/1 (11).png",
      "/gallery/DINING/2 (11).png",
      "/gallery/DINING/3 (9).png"
    ]
  },
  {
    id: "06",
    slug: "washroom",
    title: "WASHROOM",
    description: "Bath, powder & wellness spaces",
    image: "/contents/06.jpg.png",
    gallery: [
      "/gallery/WASHROOM/1 (12).png",
      "/gallery/WASHROOM/2 (12).png",
      "/gallery/WASHROOM/3 (10).png",
      "/gallery/WASHROOM/b1.png",
      "/gallery/WASHROOM/b2.png",
      "/gallery/WASHROOM/b3.png"
    ]
  },
  {
    id: "07",
    slug: "bedroom",
    title: "BEDROOM",
    description: "Private, rest & personal spaces",
    image: "/contents/07.jpg.png",
    gallery: [],
    projects: [
      {
        title: "Bedroom Suite — Contemporary Luxury (Design 01)",
        description: "Expansive luxury master bedroom suite featuring a bespoke timber and woven cane headboard, acoustic wall relief art, private window lounge, and dedicated dressing room corridor.",
        images: [
          "/gallery/BEDROOM/design 1 (3).jpeg",
          "/gallery/BEDROOM/design 1 (2).jpeg",
          "/gallery/BEDROOM/design 1 (1).jpeg"
        ]
      },
      {
        title: "Bedroom Design — View 01",
        description: "Minimalist warm-toned bedroom sanctuary featuring balanced natural lighting, integrated wall accents, and calming symmetry.",
        images: [
          "/gallery/BEDROOM/view 1 (1).png",
          "/gallery/BEDROOM/view 1 (2).png",
          "/gallery/BEDROOM/view 1 (3).png"
        ]
      },
      {
        title: "Bedroom Suite — View 02 (Master Sanctuary)",
        description: "A serene master bedroom suite featuring integrated headboard wall paneling, soft ambient illumination, and custom full-height wardrobe joinery.",
        images: [
          "/gallery/BEDROOM/view 2 (1).png",
          "/gallery/BEDROOM/view 2 (2).png",
          "/gallery/BEDROOM/view 2 (3).png",
          "/gallery/BEDROOM/view 2 (4).png",
          "/gallery/BEDROOM/view 2 (5).png"
        ]
      },
      {
        title: "Bedroom Design — View 03",
        description: "Warm earth-toned bedroom composition with acoustic wood battens, soft tactile fabrics, and circadian nightstand lighting.",
        images: [
          "/gallery/BEDROOM/view 3 (1).png",
          "/gallery/BEDROOM/view 3 (2).png",
          "/gallery/BEDROOM/view 3 (3).png"
        ]
      },
      {
        title: "Bedroom Design — View 04",
        description: "Contemporary bedroom composition highlighting custom millwork, soft textures, and restful neutral palettes.",
        images: [
          "/gallery/BEDROOM/view 4 (1).png",
          "/gallery/BEDROOM/view 4 (2).png"
        ]
      },
      {
        title: "Bedroom Design — View 05",
        description: "Space-efficient built-in wardrobe cabinetry, bespoke vanity desk station, and modern ergonomic zoning.",
        images: [
          "/gallery/BEDROOM/view 5 (1).png",
          "/gallery/BEDROOM/view 5 (2).png"
        ]
      }
    ]
  },
  {
    id: "08",
    slug: "conference-hall",
    title: "CONFERENCE HALL",
    description: "Corporate workspace, acoustic joinery & executive boardrooms",
    image: "/gallery/conference hall/ChatGPT Image Aug 12, 2026, 11_47_06 AM (1).png",
    gallery: [
      "/gallery/conference hall/ChatGPT Image Aug 12, 2026, 11_47_06 AM (1).png"
    ],
    projects: [
      {
        title: "Executive Conference Hall & Boardroom",
        description: "A prestigious corporate boardroom featuring a monolithic marble conference table with integrated AV microphones, acoustic wood millwork shelving, and refined perimeter lighting.",
        images: [
          "/gallery/conference hall/ChatGPT Image Aug 12, 2026, 11_47_06 AM (1).png"
        ]
      }
    ]
  }
];
