import React from "react";

type Props = {
  content: string;
};

export default function TextFileViewer({
  content,
}: Props) {
  const renderLine = (line: string, index: number) => {
    const urlRegex = /(https?:\/\/[^\s]+)/;

    if (urlRegex.test(line)) {
      const url = line.match(urlRegex)?.[0] ?? "";

      return (
        <div key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            {url}
          </a>
        </div>
      );
    }

    return <div key={index}>{line}</div>;
  };

  return (
    <div
      className="h-full overflow-y-auto whitespace-pre-wrap p-5 text-xs leading-relaxed text-[#00ff66]"
      style={{
        fontFamily: '"HomeVideo", monospace',
      }}
    >
      {content.split("\n").map(renderLine)}
    </div>
  );
}