type Props = {
  project: string;
};

const projects: Record<string, any> = {
  "URL Shortener": {
    desc: "Microservices-based URL shortening platform with analytics.",
    stack: ["Node.js", "TypeScript", "MongoDB", "Docker", "Kubernetes"],
    github: "https://github.com/your-repo",
  },
  "ServiceEasy": {
    desc: "Service booking platform with payment integration.",
    stack: ["Node.js", "Express", "Stripe", "MongoDB"],
    github: "https://github.com/your-repo",
  },
  "Portfolio OS": {
    desc: "This interactive OS-style portfolio.",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/your-repo",
  },
};

export default function ProjectViewer({ project }: Props) {
  const data = projects[project];

  if (!data) return <div>Project not found</div>;

  return (
    <div className="space-y-2">
      <div className="text-[#00ff66] font-bold">
        {project}
      </div>

      <div className="opacity-80">
        {data.desc}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {data.stack.map((s: string) => (
          <span
            key={s}
            className="border border-[#00ff66]/40 px-2 py-1 text-[10px]"
          >
            {s}
          </span>
        ))}
      </div>

      <a
        href={data.github}
        target="_blank"
        className="text-xs underline text-[#00ff66]"
      >
        View GitHub →
      </a>
    </div>
  );
}