module.exports = {
  personal: {
    name: 'Garje Rohan Dayanand',
    title: 'Final Year Information Technology Eng. Student',
    subtitles: [
      'Software Developer',
      'Full Stack Developer',
      'AI & Machine Learning Enthusiast'
    ],
    greeting: 'Hello, I\'m',
    photo: '/images/rohan_photo.jpg', 
    bio: 'I am a motivated final-year Information Technology Engineering student seeking an entry-level opportunity in the IT industry. Eager to learn, apply my technical knowledge, enhance my skills, and contribute to software development.',
    objective: 'Motivated final-year Information Technology Engineering student seeking an entry-level opportunity in the IT industry. Eager to learn, apply my technical knowledge, enhance my skills, and contribute to software development.',
    mission: 'To create secure, intuitive, and high-performance digital tools that solve real-world problems and optimize user experiences.',
    goals: [
      'Contribute to open-source products that serve large scales',
      'Deepen specialized knowledge in machine learning applications',
      'Master cloud-native architecture patterns (AWS/Docker/K8s)'
    ],
    resumeUrl: '/pdf/Rohan_Garje_Resume.pdf',
    email: 'rohangarje95@gmail.com',
    phone: '8698420138',
    location: 'Rautkheda, Kandhar, Nanded, Maharashtra, India',
    github: 'https://github.com/rohangarje',
    linkedin: 'https://linkedin.com/in/rohan-garje-58a6b5337',
    leetcode: 'https://leetcode.com/rohangarje',
    hackerrank: 'https://hackerrank.com/rohangarje',
    codechef: 'https://codechef.com/users/rohangarje',
    geeksforgeeks: 'https://geeksforgeeks.org/user/rohangarje'
  },
  education: [
    {
      degree: 'Bachelor of Engineering in Information Technology (BE)',
      institution: 'Amrutvahini College of Engineering, Sangamner (SPPU, Pune)',
      timeline: '2024 - 2027',
      scoreType: 'Pursuing Status',
      score: 'TE CGPA: 8.57 | SE CGPA: 7.63',
      achievements: 'Currently pursuing final year (2026-27). Scored 8.57 CGPA (TE Distinction class) and 7.63 CGPA (SE First Class class).'
    },
    {
      degree: 'Diploma in Information Technology',
      institution: 'Government Polytechnic College Ambad, Jalna (MSBTE)',
      timeline: '2022 - 2024',
      scoreType: 'Percentage',
      score: '83.94%',
      achievements: 'Awarded Distinction class under MSBTE curriculum.'
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Shri Shivaji College Barul, Tal. Kandhar (Pune Board)',
      timeline: '2019 - 2021',
      scoreType: 'Percentage',
      score: '86.17%',
      achievements: 'Awarded Distinction class.'
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Kai. G.P.M.V. Rautkheda (Pune Board)',
      timeline: '2018 - 2019',
      scoreType: 'Percentage',
      score: '74.20%',
      achievements: 'Awarded First Class class.'
    }
  ],
  skills: {
    programming: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'C++', level: 80 }
    ],
    frontend: [
      { name: 'HTML & CSS3', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'React.js', level: 80 }
    ],
    backend: [
      { name: 'Django', level: 75 },
      { name: 'SQL & Database Design', level: 85 }
    ],
    database: [
      { name: 'MySQL', level: 88 }
    ],
    concepts: [
      { name: 'Data Structures & Algorithms (DSA)', level: 85 },
      { name: 'Machine Learning', level: 80 },
      { name: 'Power BI', level: 75 }
    ],
    tools: [
      { name: 'Visual Studio Code', level: 90 },
      { name: 'IntelliJ IDEA & Eclipse', level: 82 },
      { name: 'Git & GitHub', level: 88 },
      { name: 'MySQL Workbench', level: 85 },
      { name: 'Postman', level: 84 },
      { name: 'Jupyter & Google Colab', level: 80 },
      { name: 'Android Studio', level: 83 }
    ]
  },
  projects: [
    {
      id: 'online-interview-cheating-detection',
      title: 'Online Interview Cheating Detection System',
      description: 'An AI-powered web application to monitor candidates during online interviews and detect suspicious activities in real time.',
      technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'OpenCV'],
      features: [
        'Tab-switching detection: Monitors examinee tab changes in browser logs',
        'Multiple-face detection: Alerts when secondary helpers appear',
        'Camera-off detection: Identifies video feed loss or camera block cases',
        'Head & eye movement detection: Tracks rotations and pupil gaze vectors',
        'Violation tracking: Triggers real-time security warning logs'
      ],
      image: '/images/project1.jpg',
      github: 'https://github.com/rohangarje/online-interview-cheating-detection',
      live: '#'
    },
    {
      id: 'car-buying-selling-system',
      title: 'E-Car Buying and Selling System',
      description: 'A responsive PHP and MySQL based car dealership and consumer platform providing seller dashboards, dynamic listing filters, secured user messaging, and detail-rich media galleries.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      features: [
        'Dedicated dashboards: Dynamic seller inventory inputs and consumer saved-watchlist lists',
        'Search & Filtration: Query systems sorted by model, make, fuel, pricing curves, and location',
        'User authentication: Salted hashes for logging sessions securely',
        'Media galleries: Sliding vehicle snapshots showing engine and cabin profiles',
        'Direct link: Contact forms sending vehicle inquiries directly to sellers via mailers'
      ],
      image: '/images/project2.jpg',
      github: 'https://github.com/rohangarje/car-buying-selling-system',
      live: '#'
    }
  ],
  internships: [
    {
      role: 'Web Development & AI Trainee',
      company: 'Edunet Foundation, EY & AICTE Hyderabad',
      timeline: '1 Jan 2026 - 31 Jan 2026',
      outcomes: [
        'Completed hands-on training in HTML, CSS, JavaScript, Python, Django, and AI tools.',
        'Developed practical web development solutions and problem-solving skills.'
      ]
    },
    {
      role: 'Android Application Developer Trainee',
      company: 'MountReach Solutions Pvt. Ltd., Nashik',
      timeline: '1 Jun 2023 - 15 July 2023',
      outcomes: [
        'Completed hands-on industrial training in Android application development using Java.',
        'Designed mobile application UI structures and integrated SQLite database caches.'
      ]
    }
  ],
  certifications: [
    { name: 'Cummins Scholar 2025 (Laptop Award)', authority: 'Cummins India Foundation', id: 'Nurturing Brilliance AY 2025-26', image: '/images/cert_cummins.png' },
    { name: 'Full Stack Web Development with AI Tools', authority: 'Edunet Foundation, EY & AICTE', id: 'NG26_55508', image: '/images/cert_edunet.png' },
    { name: 'AI Skills Passport', authority: 'EY and Microsoft', id: 'EYMS-AI-PASSPORT', image: '/images/cert_ey_microsoft.png' },
    { name: 'Checkmarx Codebashing .NET', authority: 'Checkmarx', id: 'd9efd346186a1c60fd552d88f52bb8efacc70b7e', image: '/images/cert_checkmarx.png' },
    { name: 'AI & Innovation Sprints: Rapid Prototyping', authority: 'Amrutvahini College of Engineering', id: 'AVCOE-E&TC-SPRINT-2026', image: '/images/cert_amrutvahini.png' },
    { name: 'Android Development Training', authority: 'MountReach Solutions Pvt. Ltd.', id: 'JJMS45182', image: '/images/cert_android.png' },
    { name: 'MATLAB Onramp', authority: 'MathWorks', id: 'MAT-ON-110' },
    { name: 'Machine Learning Onramp', authority: 'MathWorks', id: 'MAT-ML-334' }
  ],
  achievements: [
    { title: 'Cummins Scholar Award', desc: 'Received stipend support + laptop award by the Cummins India Foundation for academic excellence and outstanding performance.' }
  ],
  research: {
    title: 'AI Based Student Action Classification',
    desc: 'Research study focusing on real-time head rotations and eye tracking under low illumination conditions. Developing lightweight CNN classifiers to run locally inside web browsers.',
    interests: ['Deep Learning', 'Computer Vision Mesh Detection', 'WebAssembly execution models']
  },
  leadership: [
    { role: 'Capstone Project Leader', desc: 'Supervised development team in creating OpenCV Interview monitor module.' }
  ],
  testimonials: [
    { quote: 'Rohan is a self-driven engineer who designs both sleek interfaces and clean backends. Outstanding technical capacity.', author: 'Prof. K. R. Patil, HOD-IT Department' }
  ],
  blogs: [
    {
      id: 'gaze-detection-webs',
      title: 'Real-Time Gaze Estimation in the Web browser',
      summary: 'Learn how to implement lightweight vision models using tensorflow.js to monitor pupil shifts without server round-trips.',
      date: 'June 18, 2026',
      reads: '5 min read'
    },
    {
      id: 'express-mongodb-fallbacks',
      title: 'Building Fail-Safe Databases in Node.js Applications',
      summary: 'Architecting dynamic controllers that automatically transition to JSON memory caches when core database providers drop off.',
      date: 'May 04, 2026',
      reads: '7 min read'
    }
  ],
  codingProfiles: {
    githubStats: { publicRepos: 18, totalStars: 42, contributions: 650 },
    leetcodeStats: { solved: 215, rating: '1620' }
  },
  gallery: [
    {
      image: '/images/cummins_scholar_award.png',
      title: 'Scholarship Award Ceremony',
      desc: 'Laptop prize presentation ceremony by Cummins India Foundation.'
    },
    {
      image: '/images/cummins_presentation.png',
      title: 'Cummins Induction Keynote',
      desc: 'Sharing project presentation at the Nurturing Brilliance Induction Program (Ahilyanagar Plant).'
    },
    {
      image: '/images/cummins_laptop.png',
      title: 'Scholarship Notebook Award',
      desc: 'Acer Aspire 3 merit award laptop distributed by Cummins team.'
    },
    {
      image: '/images/rohan_photo.jpg',
      title: 'Candidate Profile Photo',
      desc: 'Official candidate portrait frame of Garje Rohan Dayanand.'
    }
  ]
};
