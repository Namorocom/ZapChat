import { Injectable } from "@angular/core";
import { GoogleGenAI } from "@google/genai";

@Injectable({ providedIn: "root" })
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  async search(prompt: string) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let groundingUrls: { uri: string; title: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      groundingUrls = chunks
        .map((chunk: { web?: { uri?: string; title?: string } }) => ({
          uri: chunk.web?.uri || "",
          title: chunk.web?.title || "",
        }))
        .filter((u) => u.uri);
    }

    return { text: response.text, groundingUrls };
  }

  async maps(prompt: string, lat: number, lng: number) {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng,
            },
          },
        },
      },
    });

    let groundingUrls: { uri: string; title: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      groundingUrls = chunks
        .map((chunk: { maps?: { uri?: string; title?: string } }) => {
          if (chunk.maps?.uri) {
            return {
              uri: chunk.maps.uri,
              title: chunk.maps.title || "Map Link",
            };
          }
          return null;
        })
        .filter(Boolean) as { uri: string; title: string }[];
    }

    return { text: response.text, groundingUrls };
  }

  async generateVideo(prompt: string, imageBase64: string, mimeType: string) {
    let operation = await this.ai.models.generateVideos({
      model: "veo-3.1-fast-generate-preview",
      prompt: prompt || "Animate this image",
      image: {
        imageBytes: imageBase64,
        mimeType: mimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: "16:9",
      },
    });

    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      operation = await this.ai.operations.getVideosOperation({
        operation: operation,
      });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed");

    const response = await fetch(downloadLink, {
      method: "GET",
      headers: {
        "x-goog-api-key": GEMINI_API_KEY,
      },
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
}
