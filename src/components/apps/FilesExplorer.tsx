import { useState } from "react";
import { useWindowStore } from "../../store/useWindowStore";
import {useSystemStore} from "../../store/useSystemStore";
import {fileIcons} from "../../data/fileIcons";

// helper function to get the appropriate icon for a file based on its name and type
function getFileIcon(name: string, type: "folder" | "file") {
  if (type === "folder") return fileIcons.folder;

  const lower = name.toLowerCase();

  if (lower.endsWith(".pdf")) return fileIcons.pdf;

  if (lower.endsWith(".png") || lower.endsWith(".jpg"))
    return fileIcons.image;

  return fileIcons.text;
}

type Node = {
  name: string;
  type: "folder" | "file";
  children?: Node[];
};

// useSystemStore.getState().addLog("event");

const structure: Node[] = [
  {
    name: "Projects",
    type: "folder",
    children: [
      {
        name: "URL Shortener",
        type: "folder",
        children: [
          { name: "Overview.txt", type: "file" },
          { name: "Architecture.txt", type: "file" },
          { name: "Tech Stack.txt", type: "file" },
          { name: "Links.txt", type: "file" },
        ],
      },
      {
        name: "ServiceEasy",
        type: "folder",
        children: [
          { name: "Overview.txt", type: "file" },
          { name: "Features.txt", type: "file" },
          { name: "Links.txt", type: "file" },
        ],
      },
      {
        name: "Portfolio OS",
        type: "folder",
        children: [
          { name: "Overview.txt", type: "file" },
          { name: "Tech Stack.txt", type: "file" },
        ],
      },
    ],
  },

  {
    name: "Skills.txt",
    type: "file",
  },

  {
    name: "Experience.txt",
    type: "file",
  },

  {
    name: "Contact.txt",
    type: "file",
  },

  {
    name: "Social Links.txt",
    type: "file",
  },
];

const fileContent: Record<string, string> = {
  "Projects/URL Shortener/Overview":
    "URL Shortener\n\nMicroservices-based URL shortening platform with per-link analytics.\n\nBuilt to handle high throughput with a Redis cache layer and async analytics pipeline.",
  "Projects/URL Shortener/Architecture":
    "Architecture\n\n→ API Gateway\n→ Shortener Service\n→ Analytics Service\n→ MongoDB (persistence)\n→ Redis (cache)\n→ Docker + Kubernetes (orchestration)",
  "Projects/URL Shortener/Tech Stack":
    "Tech Stack\n\nNode.js · TypeScript · MongoDB · Redis · Docker · Kubernetes",
  "Projects/URL Shortener/Links":
    "Links\n\nGitHub: github.com/your-repo\nLive Demo: yourapp.com",
  
    "Projects/ServiceEasy/Overview":
    "ServiceEasy\n\nService booking platform with real-time availability and integrated payments.",
  "Projects/ServiceEasy/Features":
    "Features\n\n· Service listings with filters\n· Real-time slot booking\n· Stripe payment integration\n· Email confirmation system",
  "Projects/ServiceEasy/Links":
    "Links\n\nGitHub: github.com/your-repo",
  
    "Projects/Portfolio OS/Overview":
    "Portfolio OS\n\nAn interactive OS-style portfolio. You're looking at it.",
  "Projects/Portfolio OS/Tech Stack":
    "Tech Stack\n\nReact · TypeScript · Tailwind CSS · Framer Motion · Zustand",
  
  "Skills.txt": `
  SKILLS

  Frontend
  ---------
  React
  TypeScript
  Tailwind
  Three.js
  Framer Motion

  Backend
  --------
  Node.js
  Express
  MongoDB
  PostgreSQL

  DevOps
  -------
  Docker
  Kubernetes
  GitHub Actions
  `,

  "Experience.txt": `
  EXPERIENCE

  Software Developer

  • Built scalable web applications

  • Designed REST APIs

  • Containerized applications with Docker

  • Kubernetes deployments

  • CI/CD automation
  `,

  "Contact.txt": `
  CONTACT

  Email:
  piyushkataktalware@gmail.com

  Phone:
  +1 302-390-3862
  `,

  "Social Links.txt": `
  SOCIALS

  GitHub:
  https://github.com/PiyushK-T
  
  LinkedIn:
  https://linkedin.com/in/piyush-kataktalware
  `,
};

function getNodesAtPath(nodes: Node[], path: string[]): Node[] {
  let current = nodes;
  for (const p of path) {
    const next = current.find((n) => n.name === p);
    if (next?.children) current = next.children;
    else return [];
  }
  return current;
}

function SidebarTree({
  nodes, path, currentPath, onNavigate, depth = 0,
}: {
  nodes: Node[];
  path: string[];
  currentPath: string[];
  onNavigate: (p: string[]) => void;
  depth?: number;
}) {
  return (
    <div>
      {nodes.filter((n) => n.type === "folder").map((node) => {
        const nodePath = [...path, node.name];
        const isActive = currentPath.join("/").startsWith(nodePath.join("/"));
        return (
          <div key={node.name}>
            <div
              onClick={() => onNavigate(nodePath)}
              className={`flex items-center gap-1 cursor-pointer py-0.5 text-xs hover:bg-[#00ff66]/10 ${
                isActive ? "bg-[#00ff66]/20 text-[#00ff66]" : "opacity-70"
              }`}
              style={{ paddingLeft: `${(depth + 1) * 14}px` }}
            >
              <span className="text-[10px]">{isActive ? "▼" : "▶"}</span>
              <span></span>
              <span className="truncate">{node.name}</span>
            </div>
            {isActive && node.children && (
              <SidebarTree
                nodes={node.children}
                path={nodePath}
                currentPath={currentPath}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

type Props = {
  startPath?: string[];
};

export default function FilesExplorer({ startPath = [] }: Props) {
  const [path, setPath] = useState<string[]>(startPath);
  const [selected, setSelected] = useState<string | null>(null);
  const { openWindow } = useWindowStore();

  const nodes = getNodesAtPath(structure, path);
  const fullPath = "/home/piyush/files" + (path.length ? "/" + path.join("/") : "");

  const handleClick = (node: Node) => {
    
    if (node.type === "folder") {
      setPath([...path, node.name]);
      setSelected(null);
    } else {
      setSelected(node.name);
      const filePath = [...path, node.name].join("/");
      const content = fileContent[filePath] || "No content available.";
      useSystemStore.getState().addLog(`File opened: ${node.name}`);
      openWindow("textfile", node.name, content);
    }
  };

  return (
    <div className="flex flex-col h-full text-[#00ff66]" style={{ fontFamily: '"HomeVideo", monospace' }}>
      {/* Path bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#00ff66]/30 text-xs shrink-0">
        {path.length > 0 && (
          <span
            onClick={() => { setPath(path.slice(0, -1)); setSelected(null); }}
            className="cursor-pointer opacity-60 hover:opacity-100 mr-1"
          >
            ←
          </span>
        )}
        <span className="opacity-50 truncate">{fullPath}</span>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[180px] border-r border-[#00ff66]/30 overflow-y-auto shrink-0 py-2">
          <div className="px-3 py-0.5 text-[9px] opacity-30 uppercase tracking-widest mb-1">
            {/* Navigation */}
          </div>
          <SidebarTree
            nodes={structure}
            path={[]}
            currentPath={path}
            onNavigate={(p) => { setPath(p); setSelected(null); }}
          />
        </div>

        {/* Icon grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          {nodes.length === 0 ? (
            <div className="opacity-30 text-xs">Empty folder</div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {nodes.map((node) => (
                <div
                  key={node.name}
                  onClick={() => handleClick(node)}
                  className={`flex flex-col items-center gap-2 p-3 cursor-pointer border transition-colors
                    hover:bg-[#00ff66]/10 hover:border-[#00ff66]/40
                    ${selected === node.name
                      ? "bg-[#00ff66]/20 border-[#00ff66]/60"
                      : "border-transparent"
                    }`}
                >
                  <img
                    src={getFileIcon(node.name, node.type)}
                    alt={node.name}
                    className="w-12 h-12 pixel-icon object-contain pointer-events-none"
                  />

                  <span className="text-center text-[10px] leading-tight break-words w-full text-center opacity-90">
                    {node.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="border-t border-[#00ff66]/30 px-3 py-1 text-[10px] opacity-40 shrink-0">
        {nodes.length} item{nodes.length !== 1 ? "s" : ""}
        {selected ? `  ·  ${selected} selected` : ""}
      </div>
    </div>
  );
}