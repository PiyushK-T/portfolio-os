import FilesExplorer from "../apps/FilesExplorer";
import TextFileViewer from "../apps/TextFileViewer";
import ProjectViewer from "../apps/ProjectViewer";
import Terminal from "../apps/Terminal";

type Props = {
  type: string;
  content?: string;
  title: string;
};

export default function WindowRegistry({ type, content, title }: Props) {
  switch (type) {
    case "files":
      return <FilesExplorer />;

    case "textfile":
      return <TextFileViewer content={content || ""} />;

    case "project":
      return <ProjectViewer project={title} />;

    case "terminal":
      return <Terminal />;

    default:
      return (
        <div className="text-[#00ff66] text-xs p-4 opacity-60">
          Unknown window type
        </div>
      );
  }
}