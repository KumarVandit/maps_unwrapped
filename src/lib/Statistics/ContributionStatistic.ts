/**
 * Schema Type:
 * {
 *   total_contributions: number,
 *   contribution_breakdown: {
 *     reviews: number,
 *     photos: number,
 *     answers: number,
 *     routes: number
 *   },
 *   most_active_month: {
 *     month: string,
 *     year: number,
 *     contribution_count: number
 *   },
 *   top_locations: Array<{
 *     name: string,
 *     contribution_count: number,
 *     type: string
 *   }>
 * }
 * 
 * Potential Insights:
 * 1. Overall contribution patterns
 * 2. Most active contribution types
 * 3. Seasonal contribution trends
 * 4. Location type preferences
 * 5. Contribution growth over time
 * 6. Peak activity periods
 * 7. Category-specific engagement
 * 
 * Gemini AI Integration Possibilities:
 * 1. Generate personalized contribution summaries
 * 2. Analyze contribution patterns for insights
 * 3. Suggest new places for contributions
 * 4. Create engagement improvement recommendations
 * 5. Generate natural language achievement highlights
 */

import { Statistics } from "../types";
import Statistic from "./Statistic";
import Wrapped from "../Wrapped";

export type ContributionStatisticResult = Statistics & {
  insights: {
    contribution_summary: {
      total: number;
      breakdown: {
        reviews: number;
        photos: number;
        answers: number;
        routes: number;
      };
    };
    peak_activity: {
      month: string;
      year: number;
      count: number;
      achievement_message: string;
    };
    top_contribution: {
      location: string;
      count: number;
      type: string;
      contribution_message: string;
    };
  }
};

export default class ContributionStatistic extends Statistic<ContributionStatisticResult> {
  constructor(wrapped: Wrapped) {
    super(wrapped);
  }

  private getAchievementMessage(count: number): string {
    if (count === 0) return "Start sharing your experiences!";
    if (count < 5) return "You're beginning to make an impact!";
    if (count < 15) return "You're becoming a regular contributor!";
    return "You're a super contributor this month!";
  }

  private getContributionMessage(count: number, type: string): string {
    if (count === 0) return "Start exploring and sharing!";
    if (count === 1) return `You made your first contribution at this ${type.toLowerCase()}!`;
    if (count < 5) return `You're helping others discover this ${type.toLowerCase()}!`;
    return `You're an expert at this ${type.toLowerCase()}!`;
  }

  public calculateResult(): ContributionStatisticResult {
    const data = this.wrapped.googleMapUserData?.user_contributions.statistics;
    if (!data) {
      return this.getDefaultValue();
    }

    const topLocation = data.top_locations[0] || {
      name: "None",
      contribution_count: 0,
      type: "Place"
    };

    return {
      ...data,
      insights: {
        contribution_summary: {
          total: data.total_contributions,
          breakdown: data.contribution_breakdown
        },
        peak_activity: {
          month: data.most_active_month.month,
          year: data.most_active_month.year,
          count: data.most_active_month.contribution_count,
          achievement_message: this.getAchievementMessage(data.most_active_month.contribution_count)
        },
        top_contribution: {
          location: topLocation.name,
          count: topLocation.contribution_count,
          type: topLocation.type,
          contribution_message: this.getContributionMessage(topLocation.contribution_count, topLocation.type)
        }
      }
    };
  }

  public getDefaultValue(): ContributionStatisticResult {
    return {
      total_contributions: 0,
      contribution_breakdown: {
        reviews: 0,
        photos: 0,
        answers: 0,
        routes: 0
      },
      most_active_month: {
        month: "",
        year: new Date().getFullYear(),
        contribution_count: 0
      },
      top_locations: [],
      insights: {
        contribution_summary: {
          total: 0,
          breakdown: {
            reviews: 0,
            photos: 0,
            answers: 0,
            routes: 0
          }
        },
        peak_activity: {
          month: "",
          year: new Date().getFullYear(),
          count: 0,
          achievement_message: "Start sharing your experiences!"
        },
        top_contribution: {
          location: "None",
          count: 0,
          type: "Place",
          contribution_message: "Start exploring and sharing!"
        }
      }
    };
  }
} 