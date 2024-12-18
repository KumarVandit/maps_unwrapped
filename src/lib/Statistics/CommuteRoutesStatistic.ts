/**
 * Schema Type:
 * {
 *   total_routes: number,
 *   travel_modes: {
 *     DRIVE: number,
 *     TWO_WHEELER: number
 *   },
 *   routes: Array<{
 *     id: string,
 *     travel_mode: string,
 *     destination: {
 *       latitude: number,
 *       longitude: number,
 *       semantic_type: string
 *     }
 *   }>
 * }
 * 
 * Potential Insights:
 * 1. Preferred commute modes
 * 2. Common destinations by type
 * 3. Commute distance patterns
 * 4. Route frequency analysis
 * 5. Time-based commute patterns
 * 6. Geographic commute radius
 * 7. Transport mode efficiency
 * 
 * Gemini AI Integration Possibilities:
 * 1. Generate personalized route recommendations
 * 2. Analyze commute patterns for optimization
 * 3. Predict future commute trends
 * 4. Suggest alternative routes or transport modes
 * 5. Create natural language summaries of commute habits
 */

import { CommuteRoutes } from "../types";
import Statistic from "./Statistic";
import Wrapped from "../Wrapped";

export type CommuteRoutesStatisticResult = CommuteRoutes & {
  insights: {
    total_trips: number;
    preferred_mode: string;
    transport_preference_message: string;
  }
};

export default class CommuteRoutesStatistic extends Statistic<CommuteRoutesStatisticResult> {
  constructor(wrapped: Wrapped) {
    super(wrapped);
  }

  private calculatePreferredMode(modes: { [key: string]: number }): string {
    const MODE_THRESHOLD = 4; // Minimum trips to consider a mode as preferred
    let maxTrips = 0;
    let preferredMode = "None";

    Object.entries(modes).forEach(([mode, trips]) => {
      if (trips > maxTrips && trips >= MODE_THRESHOLD) {
        maxTrips = trips;
        preferredMode = mode;
      }
    });

    return preferredMode;
  }

  private getTransportMessage(modes: { [key: string]: number }, preferredMode: string): string {
    const totalTrips = Object.values(modes).reduce((sum, trips) => sum + trips, 0);
    
    if (totalTrips === 0) {
      return "Start your journey and record your first trip!";
    }

    if (preferredMode === "None") {
      return "You're exploring different ways to travel!";
    }

    const percentage = Math.round((modes[preferredMode] / totalTrips) * 100);
    return `You prefer ${preferredMode.toLowerCase()} for ${percentage}% of your trips!`;
  }

  public calculateResult(): CommuteRoutesStatisticResult {
    const data = this.wrapped.googleMapUserData?.user_contributions.commute_routes;
    if (!data) {
      return this.getDefaultValue();
    }

    const preferredMode = this.calculatePreferredMode(data.travel_modes);
    const transportMessage = this.getTransportMessage(data.travel_modes, preferredMode);

    return {
      ...data,
      insights: {
        total_trips: data.total_routes,
        preferred_mode: preferredMode,
        transport_preference_message: transportMessage
      }
    };
  }

  public getDefaultValue(): CommuteRoutesStatisticResult {
    return {
      total_routes: 0,
      travel_modes: {
        DRIVE: 0,
        TWO_WHEELER: 0
      },
      routes: [],
      insights: {
        total_trips: 0,
        preferred_mode: "None",
        transport_preference_message: "Start your journey and record your first trip!"
      }
    };
  }
}

/* Gemini AI Integration Example (Commented Out)
private async analyzeWithGemini(data: CommuteRoutes) {
  const prompt = `
    Analyze this Google Maps commute data:
    - Total trips: ${data.total_routes}
    - Transport modes: ${Object.entries(data.travel_modes)
      .map(([mode, count]) => `${mode}: ${count} trips`)
      .join(", ")}

    Generate a brief, engaging insight about the user's travel patterns and preferences.
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