import { useEffect, useRef, useState } from "react";
import { Subject_ShowModal$ } from "../../subjects/modal.behavior-subject";
import { Subject_ImageUploaded$, Subject_EditInmageByPrompt$, Subject_ImageEditedByPrompt$ } from "../../subjects/image.behavior-subject";
import Modal from "./modal.component";
import "./result-card.component.css";
import direction from "../images/direction.png";
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';
import { SERVER_URL } from "../../constants/common.constant";
export default function ResultCard() {
    const dummyImage1 = "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/f68feb16-5925-11ed-83cc-02420a0000c8/Image3.jpg";
    const dummyImage2 = "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/fda030fa-f8fc-11ee-9505-02420a00015d/gooey.ai%20-%20colorful%20background%20studio%20ghibli%20ponyo%20anime%20excited%20anime%20saturated%20colors%20color..png";
    const noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
    const promptText = useRef(null);
    const input1ImageOldValue = useRef(dummyImage1);
    const [leftAndRightImageURL, setLeftAndRightImageURL] = useState({
        image1: dummyImage1,
        image2: dummyImage2
    });
    const submitPrompt = () => {
        Subject_ShowModal$.next(true);
        Subject_EditInmageByPrompt$.next(leftAndRightImageURL.image1);
    }
    useEffect(() => {
        promptText.current.value = "A beautiful anime drawing of a smiling character full of joy, with colorful background, studio ghibli, ponyo, anime, excited, anime, saturated colors";
        Subject_ImageUploaded$.asObservable().subscribe((imageURL) => {
                imageURL && typeof imageURL.mediaSource == "string" && (()=>{  
                    setLeftAndRightImageURL({
                    image1: imageURL.mediaSource,
                    image2: noImage
                })
                input1ImageOldValue.current = imageURL.mediaSource;
                promptText.current.value = "";
            })()
            
        });
        Subject_EditInmageByPrompt$.asObservable().subscribe((imageURL) => {
            imageURL && (() => {
                Subject_ShowModal$.next(true);
                const ajaxObservable = ajax({
                    url: `${SERVER_URL}/image`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "input_image": imageURL,
                        "text_prompt": promptText.current.value
                    }

                }).pipe(
                    map(response => response.response),
                    catchError(error => of(error))
                );

                ajaxObservable.subscribe({
                    next: value => Subject_ImageEditedByPrompt$.next(value),
                    error: err => console.log(err)
                });
            })();
        });
        Subject_ImageEditedByPrompt$.asObservable().subscribe((editedImageData) => {
            editedImageData && (() => {
                const image2 = editedImageData.data.output.output_images[0];
                console.log({leftAndRightImageURL});
                setLeftAndRightImageURL({ 
                    image1: input1ImageOldValue.current,
                    image2
                 });
                Subject_ShowModal$.next(false);
            })()
        });
    }, []);
    // const handleDownload = () => {

    //     if (resultImage) {

    //         const anchor = document.createElement("a");

    //         anchor.href = resultImage;

    //         anchor.download = "result_image.jpg";

    //         document.body.appendChild(anchor);

    //         anchor.click();

    //         document.body.removeChild(anchor);
    //     }
    // };

    return (
        <>
            <Modal show={true}></Modal>
            <section className="lg:pb-20 pb-10 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-[1192px] mx-auto lg:mt-10">
                        <div className="flex flex-wrap -mx-2">
                            <div className="lg:w-9/12 sm:w-8/12 w-full flex items-center px-2 relative">
                                <div className="flex -mx-2">
                                    <div className="px-2 text-center">
                                        <label className="block mb-2 text-xl font-medium">Original</label>
                                        <img src={leftAndRightImageURL.image1} alt="new1" className="mb-2 image h-auto rounded-lg" />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center">
                                        <img src={direction} alt="direction" className="w-2/4 mx-auto" />
                                    </div>
                                    <div className="px-2 text-center">
                                        <label className="block mb-2 text-xl font-medium">Result</label>
                                        <img src={leftAndRightImageURL.image2} alt="result" className="mb-2 image h-auto rounded-lg" />
                                    </div>
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
                                    <p className="mb-1 text-sm font-medium text-slate-500">Preview image 612*915</p>
                                    <p className="mb-2 text-sm font-medium text-slate-500">Full image 612*915</p>
                                    <div className="relative flex flex-col items-center gap-y-4">
                                        <textarea
                                            ref={promptText}
                                            placeholder="Write Your Prompt..."
                                            className="w-full lg:h-36 sm:h-32 h-24 py-2 px-4 text-base text-gray-700 border border-slate-200 rounded resize-none"
                                        ></textarea>
                                        <button onClick={submitPrompt} className="w-full py-2 px-4 text-white rounded bg-black hover:bg-slate-800 duration-150">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}