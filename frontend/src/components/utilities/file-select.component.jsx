import { useState } from "react";
import Frame from "../images/Frame.svg";
import PropType from "prop-types";
import { toast } from "react-toastify";

export default function FileSelect({ onSelect, file }) {
  const [dragging, setDragging] = useState(false);

  const ALLOWED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

  const handleFileChange = (file) => {
    const isValidFile = ALLOWED_FILE_TYPES.includes(file.type);

    if (isValidFile) {
      onSelect(file);
    } else {
      toast.error("Invalid file type. Please upload a PNG, JPG, or JPEG file.");
    }
  };

  const dragAreaStyle = {
    marginTop: "1.5rem",
    padding: "1.5rem",
    border: `2px solid ${dragging ? "blue" : "black"}`,
    borderRadius: "0.5rem",
    borderColor: dragging ? "blue" : "gray",
    borderStyle: dragging ? "solid" : "dashed",
  };

  return (
    <>
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 right-0">
          <div className="w-screen overflow-hidden">
            <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-0 left-[4vw]"></div>
            <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[20vw] right-2/4"></div>
            <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[-10vw] right-1/4"></div>
            <div className="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-0 right-0"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-[1070px] mx-auto text-center">
            <div className="max-w-[730px] mx-auto text-center">
              <h3 className="lg:text-[45px] text-3xl leading-tight font-semibold">
                AI Photo Enhancer:
                <br />
                Upscale your photo quality for free
              </h3>
            </div>
            <br />
            <p className="text-lg text-gray-700">
              Fix dark, blurry, and oversaturated photos with our free online
              image enhancer. Instantly improve image quality using AI for easy
              download or sharing on social media apps.
            </p>
          </div>

          <div className="max-w-[1192px] mx-auto mt-10">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center sm:p-10 p-5 w-full rounded-lg cursor-pointer bg-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.1)]"
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragging(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  handleFileChange(e.dataTransfer.files[0]);
                }}
                style={dragAreaStyle}
              >
                <div className="w-full p-10 rounded-xl border-4 border-gray-300 border-dashed text-center">
                  {!file && (
                    <div className="mb-5 max-w-48 mx-auto flex justify-center items-center">
                      <img src={Frame} alt="Frame" className="max-w-full" />
                    </div>
                  )}

                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      {file ? "" : "Drag and drop an image or Browse"}
                    </span>
                  </p>

                  <input
                    id="dropzone-file"
                    type="file"
                    accept={ALLOWED_FILE_TYPES.join(", ")}
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                  <div className="flex">
                    <div className="w-full">
                      {file && (
                        <div className="mb-5 max-w-96 mx-auto flex justify-center items-center">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Original Image"
                            className="max-w-full rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    File must be JPEG, JPG, or PNG and up to 40MB
                  </p>
                  <div className="flex justify-center">
                    <input
                      id="file-upload"
                      type="file"
                      accept={ALLOWED_FILE_TYPES.join(", ")}
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                    <div className="flex items-center justify-center w-full gap-x-4 max-sm:flex-col">
                      <label
                        htmlFor="file-upload"
                        className="mt-4 max-w-60 bg-black hover:opacity-80 text-white rounded px-4 py-2 cursor-pointer truncate w-full"
                      >
                        {file ? "Change Image" : "Select an Image"}
                      </label>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

FileSelect.propTypes = {
  file: PropType.object,
  onSelect: PropType.func.isRequired,
};
