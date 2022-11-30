export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

export const CONTACTS: Contact[] = [
  {
    id: "mhevery",
    name: "Miško Hevery",
    avatar: "https://avatars.githubusercontent.com/u/111951?v=4",
    github: "https://github.com/mhevery",
    twitter: "https://twitter.com/mhevery",
    linkedin: "https://www.linkedin.com/in/misko-hevery-3883b1/",
  },
  {
    id: "adamdbradley",
    name: "Adam Bradley",
    avatar: "https://avatars.githubusercontent.com/u/452425?v=4",
    github: "https://github.com/adamdbradley",
    twitter: "https://twitter.com/adamdbradley",
    linkedin: "https://www.linkedin.com/in/adamdbradley/",
  },
  {
    id: "manucorporat",
    name: "Manu Martínez-Almeida",
    avatar: "https://avatars.githubusercontent.com/u/127379?v=4",
    github: "https://github.com/manucorporat",
    twitter: "https://twitter.com/manucorporat",
    linkedin:
      "https://www.linkedin.com/in/manu-mart%C3%ADnez-almeida-5b390539/",
  },
  {
    id: "Steve8708",
    name: "Steve Sewell",
    avatar: "https://avatars.githubusercontent.com/u/844291?v=4",
    github: "https://github.com/Steve8708",
    twitter: "https://twitter.com/Steve8708",
    linkedin: "https://www.linkedin.com/in/ssewell/",
  },
];
