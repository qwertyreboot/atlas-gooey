import React, { useState } from "react";
import PrintBravely from "../images/print-bravely.jpg";
import PhotoEnhancer from "../images/photo-enhancer.jpg";
import F2 from "../images/F2.png";
import Dots from "../images/dots-2.svg";
import PlusBlur from "../images/plus-blur.svg";
import IncreasedPhotoIcon from "../images/increased-photo-icon.svg";
import FeathersIcon from "../images/feathers-icon.svg";

export default function Feature() {
  return (
    <section className="md:py-32 py-20">
      <div className="max-w-[1640px] mx-auto px-5">
        <div className="flex flex-col gap-y-20">
          <div className="flex flex-wrap items-center -mx-5 gap-y-10">
            <div className="md:w-6/12 w-full px-5 ms-auto md:order-last">
              <div className="relative h-full px-10">
                <div className="max-w-[620px] mx-auto relative z-[1]">
                  <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[20vw] right-2/4"></div>
                  <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-red-400 blur-[10rem] absolute top-[5%] left-0"></div>
                    <img src={Dots} alt="Dots" className="absolute top-[40%] md:-right-10 opacity-60" />
                    <div class="w-3 h-3 rounded-full bg-red-500 absolute top-[6vh] -left-[4vw] z-[1]"></div>
                    <div class="w-0 h-0 border-l-[6px] border-l-transparent border-b-[12px] border-b-red-500 border-r-[10px] border-r-transparent absolute top-[10vh] -left-[2vw] z-[1] blur-[3px]"></div>
                    <img src={PlusBlur} alt="PlusBlur" className="absolute top-[18%] md:-right-12 opacity-60" />
                    <div className="lg:w-28 lg:h-28 w-20 h-20 flex justify-center items-center lg:rounded-3xl rounded-xl bg-white absolute top-2/4 lg:-translate-x-1/2 shadow-[0px_30px_15px_-5px_rgba(19,15,48,0.25)] z-[1]">
                      <img src={IncreasedPhotoIcon} alt="Increased Photo Icon" />
                    </div>
                    <div className="rounded-2xl border-4 border-solid border-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.25)] overflow-hidden flex justify-center relative">
                      <img src={PrintBravely} alt="img2" />
                    </div>
                  </div>
              </div>
            </div>
            <div className="md:w-5/12 w-full px-5 md:order-first">
              <h3 className="mb-10 lg:text-[45px] text-3xl leading-tight font-bold lg:max-w-[480px]"><span className="text-blue-500">Print bravely</span> with increased photo resolution</h3>
              <p className="text-lg text-gray-700 lg:max-w-[480px]">No need to save money on high-end cameras and scanners anymore. Freely and instantaneously upscale image quality with AI photo enhancer and get high-quality prints with minimal effort. Perfect when you want to print a personal memory for a large-sized frame, print advertisement materials, and so much more.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center -mx-5 gap-y-10">
            <div className="md:w-6/12 w-full px-5 me-auto">
              <div className="relative h-full">
                <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-gray-500 blur-[10rem] absolute top-[20vw] right-2/4"></div>
                <div class="w-[25vw] h-[25vw] rounded-full lg:opacity-40 bg-red-400 blur-[10rem] absolute -top-[5%] right-0"></div>
                <div className="relative px-10">
                  <div className="max-w-[620px] mx-auto relative z-[1]">
                    <img src={Dots} alt="Dots" className="absolute -bottom-8 left-10 opacity-60" />
                    <div class="w-3 h-3 rounded-full bg-red-500 absolute -top-[4vh] right-[4vw] z-[1]"></div>
                    <div class="w-0 h-0 border-l-[6px] border-l-transparent border-b-[12px] border-b-red-500 border-r-[10px] border-r-transparent absolute -top-[1vh] right-[1vw] z-[1] blur-[3px]"></div>
                    <img src={PlusBlur} alt="PlusBlur" className="absolute top-[50%] -left-4 opacity-60" />
                    <div className="lg:w-28 lg:h-28 w-20 h-20 flex justify-center items-center lg:rounded-3xl rounded-xl bg-[#0F113A] absolute top-2/4 right-0 lg:translate-x-1/2 shadow-[0px_30px_15px_-5px_rgba(19,15,48,0.25)] z-[2]">
                      <img src={FeathersIcon} alt="Increased Photo Icon" />
                    </div>
                    <div className="rounded-2xl border-4 border-solid border-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.25)] overflow-hidden flex justify-center relative z-[1]">
                      <img src={PhotoEnhancer} alt="Photo Enhancer" />
                    </div>
                  </div>
                  </div>
              </div>            
            </div>
            <div className="md:w-5/12 w-full px-5">
              <h3 className="mb-10 lg:text-[45px] text-3xl leading-tight font-bold lg:max-w-[480px]">Integrate the photo enhancer into your <span className="text-blue-500">product via API</span></h3>
              <p className="text-lg text-gray-700 lg:max-w-[480px]">Port the image enhancer in all its glory to your product. Set up and
                get it running in no time. The pricing model is simple: you pay for what you use, with no minimums, and you get substantial discounts for high-volume usage. Learn more here.</p>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
}
