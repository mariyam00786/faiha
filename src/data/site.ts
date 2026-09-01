export const siteData = {
  personal: {
    name: "Faiha Faisal",
    role: "Junior Interior Designer",
    philosophy: "Thank you for visiting. Each project reflects my belief that thoughtful design can support people, strengthen communities, and bring more care into everyday life. I hope you enjoy exploring my work, and I would love to connect.",
    email: "faihafaisal668@gmail.com",
    phone: "+91 9544466908",
    linkedin: "http://linkedin.com/in/faiha-faisal",
    location: "Kerala, India",
    profileImage: "/images/profile-intro.jpg",
  },
  resumeLink: "/FAIHA_FAISAL_Resume.pdf", 
  about: {
    bio: "My name is Faiha, and I am based in Kerala, India. Moving between different academic disciplines and professional environments has made me especially attentive to how people experience spaces, and it has strengthened my belief that thoughtful design can help people feel welcomed, understood, and connected.\n\nBefore pursuing interior design, I earned a Bachelor's degree in Sociology from Calicut University. Wanting to combine that analytical mindset with my lifelong interest in creativity led me to earn my Diploma in Interior Design from Alagappa University. Professionally, I have worked as an Interior Designer at Theyyampattil Homesoul Interior and currently as a Junior Interior Designer at AlHawaj Architect & Builders in Calicut.\n\nMy work is centered in people and the stories behind the spaces they use. I enjoy every stage of the design process, from research, moodboards, and early concept development to space planning and technical documentation.",
    interests: [
      "Residential Interiors",
      "Space Planning",
      "Concept Development",
      "3D Visualization",
      "FF&E Specification",
      "Site Coordination"
    ],
    awards: [], // None given
    organizations: [], // None given
    skills: [
      "AutoCAD",
      "SketchUp",
      "Revit",
      "3ds Max",
      "D5 Rendering",
      "Lumion",
      "Adobe Photoshop",
      "Microsoft Office"
    ],
    languages: ["English", "Hindi", "Tamil", "Malayalam"],
    education: [
      {
        degree: "Diploma in Interior Design",
        institution: "Alagappa University, Tamil Nadu, India",
        year: "2024-2025",
      },
      {
        degree: "BA Sociology",
        institution: "Calicut University, Calicut, Kerala, India",
        year: "2017-2020",
      },
      {
        degree: "HSE",
        institution: "Iringannur Higher Secondary School, Kerala, India",
        year: "2015-2017",
      },
    ],
    experience: [
      {
        title: "Junior Interior Designer",
        company: "AlHawaj Architect & Builders",
        location: "Calicut, India",
        description: "Coordinating with multidisciplinary teams to deliver functional, aesthetically refined, and cost-effective design solutions.",
      },
      {
        title: "Interior Designer",
        company: "THEYYAMPATTIL HOMESOUL INTERIOR",
        location: "Calicut, India",
        description: "Developed and presented design concepts, mood boards, layout plans, and furniture schemes. Produced detailed 2D and 3D drawings and managed project schedules.",
      },
    ]
  },
  projects: [
    {
      slug: "residential-villa",
      title: "Modern Residential Villa",
      category: "RESIDENTIAL",
      year: "2024",
      heroImage: "/images/projects/residential-villa/exterior-1.jpg",
      shortDescription: "A complete interior design solution for a modern family home, focusing on open spaces and natural light.",
      materials: ["Oak Wood", "Matte Black Finishes", "Linen Textures"],
      rooms: [
        {
          name: "Exterior",
          images: ["/images/projects/residential-villa/exterior-1.jpg"]
        },
        {
          name: "Courtyard",
          images: [
            "/images/projects/residential-villa/courtyard-1.jpg",
            "/images/projects/residential-villa/courtyard-2.jpg",
            "/images/projects/residential-villa/courtyard-3.jpg"
          ]
        },
        {
          name: "Living",
          images: [
            "/images/projects/residential-villa/living-1.jpg",
            "/images/projects/residential-villa/living-2.jpg",
            "/images/projects/residential-villa/living-3.jpg"
          ]
        },
        {
          name: "Dining",
          images: ["/images/projects/residential-villa/dining-1.jpg"]
        },
        {
          name: "Kitchen",
          images: [
            "/images/projects/residential-villa/kitchen-1.jpg",
            "/images/projects/residential-villa/kitchen-2.jpg",
            "/images/projects/residential-villa/kitchen-3.jpg",
            "/images/projects/residential-villa/kitchen-4.jpg"
          ]
        },
        {
          name: "Bedrooms",
          images: [
            "/images/projects/residential-villa/bedroom-1.jpg",
            "/images/projects/residential-villa/bedroom-2.jpg"
          ]
        },
        {
          name: "Washroom",
          images: ["/images/projects/residential-villa/washroom-1.jpg"]
        }
      ]
    }
  ],
  moments: [
    "/images/moments/moment-1.png",
    "/images/moments/moment-2.png",
    "/images/moments/moment-3.png",
    "/images/moments/moment-4.png",
    "/images/moments/moment-5.png"
  ],
  album: [
    "/images/album/photo-1.jpg",
    "/images/album/photo-2.jpg",
    "/images/album/photo-3.jpg",
    "/images/album/photo-4.jpg",
    "/images/album/photo-5.jpg"
  ],
  process: [
    {
      title: "Discovery & Strategy",
      description: "Understanding your vision, requirements, and spatial constraints to form a solid foundation.",
      icon: "MapPin"
    },
    {
      title: "Concept Design",
      description: "Developing mood boards, spatial layouts, and initial 3D concepts to visualize the space.",
      icon: "Layers"
    },
    {
      title: "Detailed Design",
      description: "Refining materials, lighting, and custom furniture with detailed technical drawings.",
      icon: "PenTool"
    },
    {
      title: "Execution & Styling",
      description: "Coordinating with contractors and adding final styling touches to bring the vision to life.",
      icon: "CheckSquare"
    }
  ]
};
