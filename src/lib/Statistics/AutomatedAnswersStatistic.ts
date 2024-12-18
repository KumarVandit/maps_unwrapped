/**
 * Schema Type:
 * {
 *   total_responses: number,
 *   categories: {
 *     [category: string]: Array<{
 *       question: string,
 *       answer: string,
 *       location_url: string,
 *       date: string
 *     }>
 *   }
 * }
 * 
 * Potential Insights:
 * 1. Most answered question categories
 * 2. Response patterns over time
 * 3. Location-specific Q&A trends
 * 4. Common questions by area
 * 5. User expertise in different categories
 * 6. Contribution frequency analysis
 * 7. Impact of answers (locations helped)
 * 
 * Gemini AI Integration Possibilities:
 * 1. Analyze answer patterns to identify user expertise
 * 2. Generate summaries of contribution impact
 * 3. Suggest potential questions to answer
 * 4. Create natural language insights about Q&A behavior
 * 5. Identify knowledge gaps in specific areas
 */

import { AutomatedAnswers } from "../types";
import Statistic from "./Statistic";
import Wrapped from "../Wrapped";

export type AutomatedAnswersStatisticResult = AutomatedAnswers & {
  insights: {
    most_answered_category: string;
    total_locations_helped: number;
    expertise_level: string;
  }
};

export default class AutomatedAnswersStatistic extends Statistic<AutomatedAnswersStatisticResult> {
  constructor(wrapped: Wrapped) {
    super(wrapped);
  }

  private calculateMostAnsweredCategory(categories: Record<string, any[]>): string {
    let maxCount = 0;
    let mostAnsweredCategory = "None";

    Object.entries(categories).forEach(([category, answers]) => {
      if (answers.length > maxCount) {
        maxCount = answers.length;
        mostAnsweredCategory = category;
      }
    });

    return mostAnsweredCategory;
  }

  private calculateTotalLocationsHelped(categories: Record<string, any[]>): number {
    // Get unique location URLs across all categories
    const uniqueLocations = new Set();
    Object.values(categories).flat().forEach(answer => {
      uniqueLocations.add(answer.location_url);
    });
    return uniqueLocations.size;
  }

  private getExpertiseLevel(categories: Record<string, any[]>, totalLocations: number): string {
    if (Object.keys(categories).length === 0) {
      return "Start answering questions to help fellow travelers!";
    }

    const maxAnswersInCategory = Math.max(
      ...Object.values(categories).map(answers => answers.length)
    );

    if (maxAnswersInCategory >= 5) {
      return `You're an expert at answering ${this.calculateMostAnsweredCategory(categories)} questions!`;
    } else if (totalLocations >= 3) {
      return "You're making a real impact helping people discover places!";
    } else {
      return "Keep answering questions to help more travelers!";
    }
  }

  public calculateResult(): AutomatedAnswersStatisticResult {
    const data = this.wrapped.googleMapUserData?.user_contributions.automated_answers;
    if (!data) {
      return this.getDefaultValue();
    }

    const mostAnsweredCategory = this.calculateMostAnsweredCategory(data.categories);
    const totalLocationsHelped = this.calculateTotalLocationsHelped(data.categories);
    const expertiseLevel = this.getExpertiseLevel(data.categories, totalLocationsHelped);

    return {
      ...data,
      insights: {
        most_answered_category: mostAnsweredCategory,
        total_locations_helped: totalLocationsHelped,
        expertise_level: expertiseLevel
      }
    };
  }

  public getDefaultValue(): AutomatedAnswersStatisticResult {
    return {
      total_responses: 0,
      categories: {},
      insights: {
        most_answered_category: "None",
        total_locations_helped: 0,
        expertise_level: "Start answering questions to help fellow travelers!"
      }
    };
  }
}

/* Gemini AI Integration Example (Commented Out)
private async analyzeWithGemini(data: AutomatedAnswers) {
  const prompt = `
    Analyze this Google Maps Q&A contribution data:
    - Total responses: ${data.total_responses}
    - Categories: ${Object.keys(data.categories).join(", ")}
    - Most active category: ${this.calculateMostAnsweredCategory(data.categories)}
    - Locations helped: ${this.calculateTotalLocationsHelped(data.categories)}

    Generate a brief, engaging insight about the user's contribution style and impact.
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