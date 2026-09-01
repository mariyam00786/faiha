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
        description: "Write about the first kitchen design here.",
        images: [
          "/gallery/kitchen/design 1 (1).png",
          "/gallery/kitchen/design 1 (2).png",
          "/gallery/kitchen/design 1 (3).png"
        ]
      },
      {
        title: "Kitchen Design 2",
        description: "Write about the second kitchen design here.",
        images: [
          "/gallery/kitchen/design 2 (1).png",
          "/gallery/kitchen/design 2 (2).png",
          "/gallery/kitchen/design 2 (3).png",
          "/gallery/kitchen/design 2 (4).png"
        ]
      },
      {
        title: "Kitchen Design 3",
        description: "Write about the third kitchen design here.",
        images: [
          "/gallery/kitchen/design 3 (1).png",
          "/gallery/kitchen/design 3 (2).png",
          "/gallery/kitchen/design 3 (3).png"
        ]
      },
      {
        title: "Kitchen Design 4",
        description: "Write about the fourth kitchen design here.",
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
        description: "Write about the first living room design here.",
        images: [
          "/gallery/living/1 (1).png",
          "/gallery/living/1 (2).png",
          "/gallery/living/1 (3).png"
        ]
      },
      {
        title: "Living Design 2",
        description: "Write about the second living room design here.",
        images: [
          "/gallery/living/2 (1).png",
          "/gallery/living/2 (2).png",
          "/gallery/living/2 (3).png"
        ]
      },
      {
        title: "Living Design 3",
        description: "Write about the third living room design here.",
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
      "/gallery/WASHROOM/3 (10).png"
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
        title: "Modern Bedroom Setup",
        description: "A refined and modern bedroom space, featuring a custom wardrobe design and an integrated wall station.",
        images: [
          "/gallery/BEDROOM/1 (15).png",
          "/gallery/BEDROOM/3 (12).png",
          "/gallery/BEDROOM/wall with kttl.jpg.jpeg",
          "/gallery/BEDROOM/WARDROBE.jpg.jpeg"
        ]
      },
      {
        title: "Bedroom Design 1",
        description: "Write about the first bedroom design here.",
        images: [
          "/gallery/BEDROOM/1 (1).png",
          "/gallery/BEDROOM/1 (2).png",
          "/gallery/BEDROOM/1 (3).png"
        ]
      },
      {
        title: "Bedroom Design 2",
        description: "Write about the second bedroom design here.",
        images: [
          "/gallery/BEDROOM/2 (1).png",
          "/gallery/BEDROOM/2 (2).png"
        ]
      }
    ]
  },
];
