import axios from "axios";

const API_URL = "/api/message";

const postMessage = async (messageData: any) => {
    const response = await axios.post(API_URL, messageData);
    return response.data;
};

export const messageService = {
    postMessage,
};
