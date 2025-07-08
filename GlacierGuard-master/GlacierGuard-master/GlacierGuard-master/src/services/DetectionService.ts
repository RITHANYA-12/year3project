import axios from 'axios';

const API_URL = 'http://localhost:8080/api/detections';

export interface Detection {
    id: number;
    timestamp: string;
    detectionType: string;
    confidence: number;
    coordinates: string;
}

export const DetectionService = {
    async getAllDetections(): Promise<Detection[]> {
        const response = await axios.get(API_URL);
        return response.data;
    },

    async saveDetection(detection: Omit<Detection, 'id' | 'timestamp'>): Promise<Detection> {
        const response = await axios.post(API_URL, detection);
        return response.data;
    }
}; 