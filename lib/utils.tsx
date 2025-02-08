import GiderimLogo from "@/components/blocks/giderim-logo";
import IconGithub from "@/components/icons/github";
import { IconSmashing } from "@/components/icons/smashing";
import { IconWorld } from "@tabler/icons-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
export const formattedDateTimeline = (
  date: string,
  formatOpts?: Intl.DateTimeFormatOptions | undefined
) =>
  new Date(date).toLocaleDateString(
    "en-US",
    formatOpts
      ? formatOpts
      : {
        year: "numeric",
      }
  );

export const navItems = [
  { href: "/", label: "Readme" },
  // { href: "/changelog", label: "Changelog" },
  // { href: "/notes", label: "Notes" }, // disabled for now
  // { href: "/projects", label: "Projects" },
  // { href: "/stack", label: "Stack" },
];

export const careerItems = [
  {
    from: 2020,
    to: null,
    title: "Sr. Lead Frontend Developer",
    company: { name: "Hipporello", url: "https://hipporello.com" },
    location: "Remote",
    description: "Leading the development of Hipporello Apps, a cutting-edge No-Code Trello Power-Up builder using React, and spearheading the development of Hipporello Service Desk, a standalone business management system that's revolutionizing how teams work.",
    subRoles: []
  },
  {
    from: 2019,
    to: 2020,
    title: "Frontend Developer",
    company: { name: "Bigdata Teknoloji A.Ş.", url: null },
    location: "Istanbul, Turkey",
    description: "Designed and developed user interface structure of an AI-powered frontend application using React. Also developed IToken, a blockchain-based mobile application, and similar mobile apps using Ionic framework.",
    subRoles: []
  },
  {
    from: 2018,
    to: 2019,
    title: "Frontend Developer",
    company: { name: "Akinon", url: "https://akinon.com/https://akinon.com" },
    location: "Istanbul, Turkey",
    description: "Developed and maintained frontend for multiple high-profile e-commerce brands.",
    subRoles: []
  },
  {
    from: 2017,
    to: 2018,
    title: "Frontend Developer",
    company: { name: "taze", url: "https://tazebt.com" },
    location: "Istanbul, Turkey",
    description: "Turkish Airlines, Pegasus, Gratis, Gratis IK, Vakıfbank, QNB Finansbank, Garanti, Koç Üniversitesi, KoçKariyerim, Özdilekteyim, Koçfinans, WWF, Sabancı Üniversitesi, YGA İnovasyon, Avansas, Cam Ocağı(16.Altın Örümcek: Eğitim Dalında En iyi Web Sitesi)",
    subRoles: []
  },
];

const dateFormat = {
  day: {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  },
  month: {
    year: "numeric" as const,
    month: "long" as const,
  },
  year: {
    year: "numeric" as const,
  },
};

const changelogItems: Array<{
  date: string;
  event: string;
  title: string;
  description?: string;
  icon?: string;
  dateFormatOptions?: (typeof dateFormat)[keyof typeof dateFormat];
  photos?: Array<{ src: string; variant: "1x1" | "4x3" | "4x5" }>;
}> = [
    {
      date: "2024-01-01",
      event: "Example Event",
      title: "Example Title",
      description: "This is an example description to show all possible properties.",
      icon: "🎯",
      dateFormatOptions: dateFormat.day,
      photos: [
        {
          src: "/example/photo1.png",
          variant: "1x1"
        },
        {
          src: "/example/photo2.png",
          variant: "4x3"
        },
        {
          src: "/example/photo3.png",
          variant: "4x5"
        }
      ]
    }
  ];

export const changelog = changelogItems.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const projects = [
  {
    name: "Example Project",
    githubSlug: "username/example-project",
    released: "2024-01-01",
    description: "Example project description to show all possible properties.",
    logo: <IconWorld className="size-10" />,
    links: [
      {
        href: "https://example.com",
        label: "Website",
        icon: IconWorld,
      },
      {
        href: "https://github.com/username/example-project",
        label: "GitHub",
        icon: IconGithub,
      }
    ],
    metrics: [
      {
        label: "Example Metric",
        value: 100
      }
    ],
    featured: true,
    deprecated: false
  }
];
