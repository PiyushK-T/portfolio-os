import { 
  useEffect, 
  useLayoutEffect,
  useRef, 
  useState
} from "react";

import { useWindowStore } from "../../store/useWindowStore";

const helpText = `
Available commands:

help
clear
ls
pwd
about
resume
contact
github
linkedin
files
skills
`;

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([
    "PortfolioOS v1.0",
    "Type 'help' for commands.",
  ]);

  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { openWindow } = useWindowStore();

  useEffect(() => {
  if (terminalRef.current) {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }
}, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    const commands: Record<string, () => string> = {
      help: () => helpText,
      clear: () => {
        setHistory([]);
        return "";
      },
      ls: () => 
        "Projects  Skills  Experience  Contact  SocialLinks",

      pwd: () => "/home/piyush",

      about: () =>
        "Full Stack Developer | React | Node.js | Kubernetes",
      
      resume: () => {
        // TODO: Implement resume opening logic
        return "Opening resume...";
      },

      contact: () =>
        "Email: piyushkataktalware@gmail.com",

      github: () => {
        window.open("https://github.com/PiyushK-T","_blank");
        return "Opening GitHub...";
      },

      linkedin: () => {
        window.open("https://www.linkedin.com/in/piyush-kataktalware/","_blank");
        return "Opening LinkedIn...";
      },

      files: () => {
        openWindow("files", "Files");
        return "Opening Files...";
      },

      skills: () => {
        openWindow(
          "textfile",
          "Skills",
          `Frontend
          ---------
          React
          TypeScript
          Tailwind CSS
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
          GitHub Actions`
      );

      return "Opening Skills...";
    },
  };


const handler = commands[command];

if (!handler) {
  setHistory((prev) => [
    ...prev,
    `> ${cmd}`,
    `Command not found: ${cmd}`,
  ]);
  return;
}

const output = handler();

// clear command already handled history clearing, so we don't need to add it again
if (command === "clear") return;

setHistory((prev) => [
      ...prev,
      `> ${cmd}`,
      output,
    ]);
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!input.trim()) return;

    runCommand(input);

    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div
      className="h-full flex flex-col bg-black text-[#00ff66]"
      style={{
        fontFamily: '"HomeVideo", monospace',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 text-xs whitespace-pre-wrap"
      >
        {history.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-[#00ff66]/30 p-3 flex items-center"
      >
        <span className="mr-2">{">"}</span>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          className="flex-1 bg-transparent outline-none text-[#00ff66]"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}