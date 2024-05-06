import { useRef, useState } from "react";
import "./result-card.component.css";
import { SERVER_URL } from "../../constants/common.constant";
import PropType from "prop-types";
import Button from "./button.component";
import { TbChevronDown } from "react-icons/tb";
import { FaImage } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function Result({ originalImage }) {
  const [resultImage, setResultImage] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadRef = useRef(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", originalImage);

    const imageUploadResponse = await fetch(`${SERVER_URL}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!imageUploadResponse.ok) {
      toast.error("Upload failed. Please try again.");
      return;
    }

    const imageUploadData = await imageUploadResponse.json();
    const imageUrl = imageUploadData?.data?.mediaSource;

    const generateImageResponse = await fetch(`${SERVER_URL}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_image: imageUrl,
        text_prompt: promptText,
      }),
    });
    setIsLoading(false);

    if (!generateImageResponse.ok) {
      toast("Failed to generate image, please try again.");
      return;
    }

    const generateImageData = await generateImageResponse.json();

    if (generateImageData?.data?.detail?.error) {
      toast.error(generateImageData.data.detail.error);
      return;
    }

    setResultImage(generateImageData.data?.output?.output_images?.[0]);
  };

  return (
    <>
      <section className="lg:pb-20 pb-10 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-[1192px] mx-auto lg:mt-10">
            <div className="flex lg:flex-row flex-col max-lg:gap-y-8 justify-center items-center">
              <div className="w-full flex items-end px-2 relative">
                <div className="w-full text-center">
                  <div className="relative flex flex-col items-center gap-y-4">
                    <textarea
                      placeholder="Welcome to Atlaschat please write your prompt here."
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="w-full h-80 py-4 px-4 text-base text-gray-700 border border-slate-200 rounded resize-none"
                    ></textarea>
                    <Button
                      disabled={!promptText}
                      loading={isLoading}
                      onClick={handleSubmit}
                      className="bg-black hover:opacity-80 w-full"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full flex lg:flex-1 items-center justify-center">
                <div className="flex flex-col gap-y-4 px-2 text-center">
                  {resultImage ? (
                    <img
                      src={resultImage}
                      alt="result"
                      className="image rounded-lg bg-gray-500 h-80 w-80"
                    />
                  ) : (
                    <div className="h-80 w-80 bg-gray-100 rounded-lg flex items-center justify-center opacity-70 flex-col">
                      <FaImage size={80} className="text-gray-400" />
                      <p className="text-xs font-semibold">
                        The AI generated result image will be shown here
                      </p>
                    </div>
                  )}
                  <a
                    ref={downloadRef}
                    style={{ display: "none" }}
                    href="/"
                    target="_blank"
                    download
                  ></a>
                  <Button
                    type="button"
                    disabled={!resultImage}
                    loading={isDownloading}
                    onClick={async () => {
                      setIsDownloading(true);
                      const response = await fetch(resultImage);
                      const blob = await response.blob();
                      const downloadUrl = window.URL.createObjectURL(blob);
                      downloadRef.current.href = downloadUrl;
                      downloadRef.current.download =
                        "result." + resultImage.split(".").pop();
                      downloadRef.current.click();
                      setIsDownloading(false);
                    }}
                    className="w-full bg-pink-600 hover:opacity-80"
                  >
                    Free Download
                    <TbChevronDown className="ml-2" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Result.propTypes = {
  originalImage: PropType.object,
};
