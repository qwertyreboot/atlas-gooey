import { useState } from "react";
import new1 from "../images/new1.avif";

export default function ResultCard() {
  const [resultImage, setResultImage] = useState("");

  const handleDownload = () => {
    if (resultImage) {
      const anchor = document.createElement("a");

      anchor.href = resultImage;

      anchor.download = "result_image.jpg";

      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-[1192px] mx-auto mt-10 border-2 border-gray-300 rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <label className="mb-2">Original</label>
              <img src={new1} alt="new1" className="mb-2" />
            </div>
            <div className="flex flex-col items-center ml-8">
              <label className="mb-2">Result</label>

              <img src={resultImage || new1} alt="result" className="mb-2" />
            </div>
          </div>
          <div className="lg:w-3/12 sm:w-4/12 w-full flex items-center px-2">
            <div className="w-full text-center">
              <button
                // onClick={handleDownload}
                className="w-full mb-2 py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white flex justify-center rounded"
              >
                Free Download
                <svg
                  className="h-5 w-5 ml-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <p className="mb-1 text-sm font-medium text-slate-500">
                Preview image 612*915
              </p>
              <p className="mb-2 text-sm font-medium text-slate-500">
                Full image 612*915
              </p>
              <div className="relative flex flex-col items-center gap-y-4">
                <textarea
                  ref={promptText}
                  placeholder="Write Your Prompt..."
                  className="w-full lg:h-36 sm:h-32 h-24 py-2 px-4 text-base text-gray-700 border border-slate-200 rounded resize-none"
                ></textarea>
                <button
                  onClick={submitPrompt}
                  className="w-full py-2 px-4 text-white rounded bg-black hover:bg-slate-800 duration-150"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
