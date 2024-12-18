/**
 * Schema Type:
 * {
 *   total_trips: number,
 *   total_distance: number,
 *   most_active_month: string,
 *   monthly_summary: Array<{
 *     month: string,
 *     trips: number,
 *     distance: number,
 *     transport: string,
 *     route_highlights: string[],
 *     main_locations: string[]
 *   }>,
 *   transport_summary: Record<string, number>,
 *   top_locations: Array<{
 *     name: string,
 *     visits: number
 *   }>
 * }
 * 
 * Potential Insights:
 * 1. Travel patterns and peak travel months
 * 2. Most frequently used transport modes
 * 3. Carbon footprint based on transport modes and distances
 * 4. Favorite destinations and frequency of visits
 * 5. Average trip distance and duration trends
 * 6. Travel radius and exploration patterns
 * 7. Weekday vs weekend travel patterns
 * 
 * Gemini AI Integration Possibilities:
 * 1. Generate personalized travel insights based on patterns
 * 2. Suggest optimal routes based on historical travel data
 * 3. Predict future travel patterns and recommend new places
 * 4. Analyze travel behavior changes over seasons
 * 5. Generate natural language summaries of travel patterns
 */

import { TravelSummary } from "../types";
import Statistic from "./Statistic";
import Wrapped from "../Wrapped";

export type TravelSummaryStatisticResult = TravelSummary & {
  insights: {
    overall_summary: {
      total_trips: number;
      total_distance: number;
    };
    monthly_highlights: {
      most_active: {
        month: string;
        distance: number;
        trips: number;
        message: string;
      };
      runner_up: {
        month: string;
        distance: number;
        trips: number;
        message: string;
      };
    };
  }
};

export default class TravelSummaryStatistic extends Statistic<TravelSummaryStatisticResult> {
  constructor(wrapped: Wrapped) {
    super(wrapped);
  }

  private getMonthlyMessage(trips: number, distance: number, isTop: boolean): string {
    if (trips === 0) return "No trips this month";
    
    const prefix = isTop ? "Your most active month" : "Your second most active month";
    return `${prefix} with ${trips} trip${trips > 1 ? 's' : ''} covering ${distance} km!`;
  }

  private getTopTwoMonths(monthlySummary: TravelSummary['monthly_summary']) {
    // Sort by distance in descending order
    const sortedMonths = [...monthlySummary].sort((a, b) => 
      (b.distance || 0) - (a.distance || 0)
    );

    const mostActive = sortedMonths[0] || {
      month: "",
      trips: 0,
      distance: 0
    };

    const runnerUp = sortedMonths[1] || {
      month: "",
      trips: 0,
      distance: 0
    };

    return {
      mostActive,
      runnerUp
    };
  }

  public calculateResult(): TravelSummaryStatisticResult {
    const data = this.wrapped.googleMapUserData?.user_contributions.travel_summary_2024;
    if (!data) {
      return this.getDefaultValue();
    }

    const { mostActive, runnerUp } = this.getTopTwoMonths(data.monthly_summary);

    return {
      ...data,
      insights: {
        overall_summary: {
          total_trips: data.total_trips,
          total_distance: data.total_distance
        },
        monthly_highlights: {
          most_active: {
            month: mostActive.month,
            distance: mostActive.distance || 0,
            trips: mostActive.trips || 0,
            message: this.getMonthlyMessage(mostActive.trips || 0, mostActive.distance || 0, true)
          },
          runner_up: {
            month: runnerUp.month,
            distance: runnerUp.distance || 0,
            trips: runnerUp.trips || 0,
            message: this.getMonthlyMessage(runnerUp.trips || 0, runnerUp.distance || 0, false)
          }
        }
      }
    };
  }

  public getDefaultValue(): TravelSummaryStatisticResult {
    return {
      total_trips: 0,
      total_distance: 0,
      most_active_month: "",
      monthly_summary: [],
      transport_summary: {},
      top_locations: [],
      insights: {
        overall_summary: {
          total_trips: 0,
          total_distance: 0
        },
        monthly_highlights: {
          most_active: {
            month: "",
            distance: 0,
            trips: 0,
            message: "Start your travel journey!"
          },
          runner_up: {
            month: "",
            distance: 0,
            trips: 0,
            message: "No trips yet"
          }
        }
      }
    };
  }
}

/* Gemini AI Integration Example (Commented Out)
private async analyzeWithGemini(data: TravelSummary) {
  const prompt = `
    Analyze this Google Maps travel data:
    - Total trips: ${data.total_trips}
    - Total distance: ${data.total_distance} km
    - Most active month: ${this.getTopTwoMonths(data.monthly_summary).mostActive.month}
      (${this.getTopTwoMonths(data.monthly_summary).mostActive.trips} trips, 
       ${this.getTopTwoMonths(data.monthly_summary).mostActive.distance} km)

    Generate a brief, engaging insight about their travel patterns and achievements.
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