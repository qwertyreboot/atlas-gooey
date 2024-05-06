import StatusCode from "../constants/status-codes.constant.js";
import fetch from 'node-fetch';
import ImageProcessService from "./image-process.service.js";
class Service {
    static instance = null;
    #imageProcessService = new ImageProcessService();
    constructor() {
        if (Service.instance instanceof Service) {
            return Service.instance
        }
        Service.instance = this;
    }
    async image(payload) {
        if(payload.manualEnhancement) {console.log(Service.instance);
            payload = Service.instance.#imageProcessService.processManualEnhancement(payload);
        }
        try {
            console.log('payload', payload);
            const stream = await fetch(process.env.GOOEY_API_PATH, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + process.env["GOOEY_SECREAT_KEY"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await stream.json()
            console.log('response', result);
            return Promise.resolve({
                status: StatusCode.post.ok,
                data: result
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async imageUpload({ host, file }) {

        try {
            return Promise.resolve({
              status: StatusCode.post.ok,
              data: {
                mediaName: file.filename,
                origMediaName: file.originalname,
                mediaSource: `https://${host}/image/get/${file.filename}`,
              },
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
export default Service;