type Props = { content: string };

export default function TextFileViewer({ content }: Props) {
  return (
    <div
      className="h-full p-5 text-[#00ff66] text-xs leading-relaxed whitespace-pre-wrap overflow-y-auto opacity-90"
      style={{ fontFamily: '"HomeVideo", monospace' }}
    >
      {content}
    </div>
  );
}