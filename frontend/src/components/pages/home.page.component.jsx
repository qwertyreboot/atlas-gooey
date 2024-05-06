import { createRef, useEffect, useState } from "react";
import Upload from "../utilities/file-select.component";
import Result from "../utilities/result.component";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const resultRef = createRef();

  useEffect(() => {
    if (selectedFile) {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedFile, resultRef]);

  return (
    <>
      <Upload onSelect={setSelectedFile} file={selectedFile} />
      {selectedFile && (
        <div ref={resultRef}>
          <Result originalImage={selectedFile} />
        </div>
      )}
    </>
  );
}
