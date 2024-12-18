/**
 * Schema Type:
 * {
 *   total_count: number,
 *   total_views: number,
 *   contributions: Array<{
 *     title: string,
 *     views: number,
 *     date_taken: string,
 *     location: {
 *       latitude: number,
 *       longitude: number,
 *       altitude: number
 *     }
 *   }>
 * }
 * 
 * Potential Insights:
 * 1. Most photographed locations
 * 2. Popular photo spots by views
 * 3. Seasonal photography patterns
 * 4. Geographic spread of photos
 * 5. Photo contribution frequency over time
 * 6. High-engagement vs low-engagement photos
 * 7. Altitude patterns in photography
 * 
 * Gemini AI Integration Possibilities:
 * 1. Analyze photo locations to suggest similar spots
 * 2. Generate captions or descriptions for locations
 * 3. Identify patterns in high-view photos
 * 4. Create personalized photo location recommendations
 * 5. Generate stories about photo journeys
 */

import { Photos } from "../types";
import Statistic from "./Statistic";
import Wrapped from "../Wrapped";

export type PhotosStatisticResult = Photos & {
  insights: {
    total_photos: number;
    view_milestone: {
      total_views: number;
      milestone_message: string;
    };
  }
};

export default class PhotosStatistic extends Statistic<PhotosStatisticResult> {
  constructor(wrapped: Wrapped) {
    super(wrapped);
  }

  private getViewMilestoneMessage(views: number): string {
    const VIEW_THRESHOLD = 5; // Milestone for views

    if (views === 0) return "Share your first photo to start getting views!";
    if (views < VIEW_THRESHOLD) return `Your photos have been viewed ${views} times!`;
    return `Wow! Your photos have reached ${views} views! 🎉`;
  }

  public calculateResult(): PhotosStatisticResult {
    const data = this.wrapped.googleMapUserData?.user_contributions.photos;
    if (!data) {
      return this.getDefaultValue();
    }

    return {
      ...data,
      insights: {
        total_photos: data.total_count,
        view_milestone: {
          total_views: data.total_views,
          milestone_message: this.getViewMilestoneMessage(data.total_views)
        }
      }
    };
  }

  public getDefaultValue(): PhotosStatisticResult {
    return {
      total_count: 0,
      total_views: 0,
      contributions: [],
      insights: {
        total_photos: 0,
        view_milestone: {
          total_views: 0,
          milestone_message: "Share your first photo to start getting views!"
        }
      }
    };
  }
}

/* Gemini AI Integration Example (Commented Out)
private async analyzeWithGemini(data: Photos) {
  const prompt = `
    Analyze this Google Maps photo contribution data:
    - Total photos: ${data.total_count}
    - Total views: ${data.total_views}

    Generate a brief, engaging insight about their photo contributions and their impact.
  `;

  try {
    const model = genai.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
}
*/ 