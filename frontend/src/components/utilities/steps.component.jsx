import React, { useState } from "react";
import image2 from "../images/image2.png";
import Frame from "../images/Frame.svg";
import UploadImage from "../images/upload-image.svg";
import AI from "../images/ai.svg";
import PreviewResult from "../images/preview-result.svg";
import DownloadImage from "../images/download-image.svg";

export default function Steps() {
  return (
    <section className="py-20 bg-gray-200">
      <div className="max-w-[1640px] mx-auto px-5">
          <div className="max-w-[640px] mx-auto text-center">
            <h3 className="lg:mb-20 mb-10 lg:text-[45px] text-3xl leading-tight font-bold">How to enhance image quality</h3>            
          </div>
          <div className="flex flex-wrap 2xl:-mx-10 -mx-5 gap-y-10">
            <div className="lg:w-3/12 sm:w-6/12 w-full 2xl:px-10 px-5">
              <div className="text-center">
                <h4 className="mb-5 text-lg font-bold leading-normal">Step 01</h4>
                <figure>
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gray-300 flex justify-center items-center">
                    <img src={UploadImage} width={36} />
                  </div>
                  <figcaption>
                    <h3 className="mb-3 text-lg font-bold leading-normal">Upload your photo</h3>
                    <p className="text-lg text-gray-700">Select an image from your library that you’d like to enhance.</p>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="lg:w-3/12 sm:w-6/12 w-full 2xl:px-10 px-5">
              <div className="text-center">
                <h4 className="mb-5 text-lg font-bold leading-normal">Step 02</h4>
                <figure>
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gray-300 flex justify-center items-center">
                  <img src={AI} width={36} />
                  </div>
                  <figcaption>
                    <h3 className="mb-3 text-lg font-bold leading-normal">Click on AI Enhance</h3>
                    <p className="text-lg font-400 text-gray-500">In the Photo editor interface, click AI Enhance and see AI’s magic in action.</p>
                  </figcaption>
                </figure>
              </div>
            </div>

            <div className="lg:w-3/12 sm:w-6/12 w-full 2xl:px-10 px-5">
              <div className="text-center">
                <h4 className="mb-5 text-lg font-bold leading-normal">Step 03</h4>
                <figure>
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gray-300 flex justify-center items-center">
                    <img src={PreviewResult} width={36} />
                  </div>
                  <figcaption>
                    <h3 className="mb-3 text-lg font-bold leading-normal">Preview the result</h3>
                    <p className="text-lg font-400 text-gray-500">Get a preview of the enhanced version. If you want, you can make further edits with our editing tools.</p>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="lg:w-3/12 sm:w-6/12 w-full 2xl:px-10 px-5">
              <div className="text-center">
                <h4 className="mb-5 text-lg font-bold leading-normal">Step 04</h4>
                <figure>
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gray-300 flex justify-center items-center">
                    <img src={DownloadImage} width={36} />
                  </div>
                  <figcaption>
                    <h3 className="mb-3 text-lg font-bold leading-normal">Download</h3>
                    <p className="text-lg font-400 text-gray-500">Once you're done with the edits, click Export and then
                    Download to save the new version.</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
