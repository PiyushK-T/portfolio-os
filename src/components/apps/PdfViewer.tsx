type Props = {
  file: string;
};

export default function PdfViewer({ file }: Props) {
  return (
    <div className="h-full w-full bg-black">
      <iframe
        src={file}
        className="w-full h-full border-0"
      />
    </div>
  );
}