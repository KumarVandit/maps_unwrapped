/**
 * Schema Type:
 * {
 *   total_count: number,
 *   rating_distribution: {
 *     "5_star": number,
 *     "4_star": number,
 *     "3_star": number,
 *     "2_star": number,
 *     "1_star": number,
 *     "no_rating": number
 *   },
 *   locations_reviewed: Array<{
 *     name: string,
 *     coordinates: {
 *       latitude: number,
 *       longitude: number
 *     },
 *     rating: number,
 *     review_text: string,
 *     date: string,
 *     address: string,
 *     additional_details: {
 *       service_type: string,
 *       negative_aspects: string[],
 *       business_used: string,
 *       price_range: string,
 *       meal_type: string
 *     }
 *   }>
 * }
 * 
 * Potential Insights:
 * 1. Review sentiment analysis and trends
 * 2. Most reviewed business categories
 * 3. Rating patterns over time
 * 4. Geographic distribution of reviews
 * 5. Price range preferences
 * 6. Common positive/negative feedback themes
 * 7. Most reviewed neighborhoods or areas
 * 
 * Gemini AI Integration Possibilities:
 * 1. Analyze review text for sentiment and key themes
 * 2. Generate personalized review summaries
 * 3. Identify review patterns and user preferences
 * 4. Suggest similar places based on positive reviews
 * 5. Create natural language insights about reviewing behavior
 */

import { Reviews } from "../types";
import Statistic from "./Statistic";
import Wrapped from "../Wrapped";

export type ReviewsStatisticResult = Reviews & {
  insights: {
    best_place: {
      name: string;
      rating: number;
    };
    worst_place: {
      name: string;
      rating: number;
    };
  }
};

export default class ReviewsStatistic extends Statistic<ReviewsStatisticResult> {
  constructor(wrapped: Wrapped) {
    super(wrapped);
  }

  private findBestAndWorstPlaces(locations: Reviews['locations_reviewed']) {
    if (locations.length === 0) {
      return {
        best: { name: "None", rating: 0 },
        worst: { name: "None", rating: 0 }
      };
    }

    return locations.reduce((acc, location) => {
      if (location.rating > acc.best.rating) {
        acc.best = { name: location.name, rating: location.rating };
      }
      if (location.rating < acc.worst.rating || acc.worst.rating === 0) {
        acc.worst = { name: location.name, rating: location.rating };
      }
      return acc;
    }, {
      best: { name: "None", rating: 0 },
      worst: { name: "None", rating: 5 }
    });
  }

  public calculateResult(): ReviewsStatisticResult {
    const data = this.wrapped.googleMapUserData?.user_contributions.reviews;
    if (!data) {
      return this.getDefaultValue();
    }

    const { best, worst } = this.findBestAndWorstPlaces(data.locations_reviewed);

    return {
      ...data,
      insights: {
        best_place: best,
        worst_place: worst
      }
    };
  }

  public getDefaultValue(): ReviewsStatisticResult {
    return {
      total_count: 0,
      rating_distribution: {
        "5_star": 0,
        "4_star": 0,
        "3_star": 0,
        "2_star": 0,
        "1_star": 0,
        "no_rating": 0
      },
      locations_reviewed: [],
      insights: {
        best_place: {
          name: "None",
          rating: 0
        },
        worst_place: {
          name: "None",
          rating: 0
        }
      }
    };
  }
}

/* Gemini AI Integration Example (Commented Out)
private async analyzeWithGemini(data: Reviews) {
  const prompt = `
    Analyze these places from Google Maps reviews:
    Best rated: ${data.insights.best_place.name} (${data.insights.best_place.rating}★)
    Worst rated: ${data.insights.worst_place.name} (${data.insights.worst_place.rating}★)

    Generate a brief insight about their best and worst experiences.
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