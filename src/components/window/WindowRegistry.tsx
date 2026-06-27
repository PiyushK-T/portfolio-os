import FilesExplorer from "../apps/FilesExplorer";
import TextFileViewer from "../apps/TextFileViewer";
import Terminal from "../apps/Terminal";
import SystemApp from "../apps/system/SystemApp";
import PdfViewer from "../apps/PdfViewer";

type Props = {
  window: any;
};

export default function WindowRegistry({ window }: Props) {
  switch (window.type) {
    case "files":
      return <FilesExplorer />;

    case "textfile":
      return <TextFileViewer content={window.content ?? ""} />;

    case "terminal":
      return <Terminal />;

    case "system":
      return <SystemApp />;

    case "pdf":
      return (
        <PdfViewer file={window.content || "/assets/resume.pdf"} />
      );

    default:
      return (
        <div className="p-4 text-[#00ff66]">
          Unknown window type
        </div>
      );
  }
}