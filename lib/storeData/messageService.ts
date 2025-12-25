import axios from "axios";
import { Message } from "@/types";

const API_URL = "/api/message";

const postMessage = async (messageData: Message) => {
    const response = await axios.post(API_URL, messageData);
    return response.data;
};

export const messageService = {
    postMessage,
};
