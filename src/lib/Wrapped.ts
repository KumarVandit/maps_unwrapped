import SpotifyFramePlayer from "./Spotify/FramePlayer";
import Statistic from "./Statistics/Statistic";
import { UserContributions } from "./types";
import * as Sentry from "@sentry/nextjs";
import TravelSummaryStatistic from "./Statistics/TravelSummaryStatistic";
import ReviewsStatistic from "./Statistics/ReviewsStatistic";
import PhotosStatistic from "./Statistics/PhotosStatistic";
import AutomatedAnswersStatistic from "./Statistics/AutomatedAnswersStatistic";
import CommuteRoutesStatistic from "./Statistics/CommuteRoutesStatistic";
import ContributionStatistic from "./Statistics/ContributionStatistic";

export const VIVEK_MAPS_STATISTICS: UserContributions = {
  user_name: "Vivek Shirke",
  user_contributions: {
    travel_summary_2024: {
      total_trips: 7,
      total_distance: 6230,
      most_active_month: "July",
      monthly_summary: [
        {
          month: "December",
          trips: 1,
          distance: 4908,
          transport: "Subway",
          route_highlights: ["Guru Dronacharya", "Sikanderpur", "MG Road", "Iffco Chowk"],
          main_locations: ["Huda City Centre Metro"]
        },
        {
          month: "October",
          trips: 1,
          distance: 1322,
          transport: "Passenger Vehicle",
          main_locations: ["Dhokaney Waterfall"]
        },
        {
          month: "July",
          trips: 3,
          transport: "Passenger Vehicle",
          main_locations: []
        },
        {
          month: "June",
          trips: 2,
          transport: "Motorcycling",
          main_locations: ["Home"]
        }
      ],
      transport_summary: {
        "Subway": 1,
        "Passenger Vehicle": 4,
        "Motorcycling": 2
      },
      top_locations: [
        { name: "Home", visits: 1 },
        { name: "Dhokaney Waterfall", visits: 1 },
        { name: "Huda City Centre Metro", visits: 1 }
      ]
    },
    reviews: {
      total_count: 17,
      rating_distribution: {
        "5_star": 14,
        "4_star": 1,
        "3_star": 0,
        "2_star": 0,
        "1_star": 1,
        "no_rating": 1
      },
      locations_reviewed: [
        {
          name: "Ethnix by Raymond",
          coordinates: {
            latitude: 18.5047807,
            longitude: 73.8540595
          },
          rating: 5,
          review_text: "Nice ambience and supportive staff…Overall good experience",
          date: "2024-07-04T13:38:21.423548Z",
          address: "Shop no.5, Abhinav Kala Mahavidyalaya Chowk, Pune"
        },
        {
          name: "XCLUSIVE INTERIORS PVT LTD",
          coordinates: {
            latitude: 18.5935887,
            longitude: 73.7926916
          },
          rating: 1,
          review_text: "Useless people.\nNew door without handle.\nNew chairs Rs 25,000/- each worst quality.",
          date: "2022-07-11T04:56:11.022578Z",
          additional_details: {
            service_type: "Interior design",
            negative_aspects: ["Quality"],
            business_used: "Yes"
          }
        },
        {
          name: "Café Peter - Wakad",
          coordinates: {
            latitude: 18.5954161,
            longitude: 73.7679942
          },
          rating: 5,
          date: "2022-07-13T03:11:05.601150Z",
          additional_details: {
            price_range: "₹200–400",
            service_type: "Dine in",
            meal_type: "Other"
          }
        }
      ]
    },
    photos: {
      total_count: 4,
      total_views: 1912,
      contributions: [
        {
          title: "2022-07-10.jpg",
          views: 743,
          date_taken: "2022-07-11T04:39:51Z",
          location: {
            latitude: 18.634820916666666,
            longitude: 73.74765775,
            altitude: 497.0
          }
        },
        {
          title: "2022-07-10.jpg(2)",
          views: 624,
          date_taken: "2022-07-11T04:39:36Z",
          location: {
            latitude: 18.634820916666666,
            longitude: 73.74765775,
            altitude: 497.0
          }
        }
      ]
    },
    automated_answers: {
      total_responses: 15,
      categories: {
        "accessibility": [
          {
            question: "Is there a wheelchair accessible entrance here?",
            answer: "Not sure",
            location_url: "https://google.com/maps/?cid=0x3bc2ba2008a8c4b3:0x7b51e3a813d8dfb",
            date: "2022-07-13"
          },
          {
            question: "Is there wheelchair accessible parking?",
            answer: "Not sure",
            location_url: "https://google.com/maps/?cid=0x3bc2ba2008a8c4b3:0x7b51e3a813d8dfb",
            date: "2022-07-13"
          }
        ],
        "business_info": [
          {
            question: "Is this place located inside another business?",
            answer: "No",
            location_url: "https://google.com/maps/?cid=0x3bc2b91f867bd9b5:0x6c48b7445ec9db72",
            date: "2022-07-13"
          },
          {
            question: "Does this place have multiple businesses on site?",
            answer: "No",
            location_url: "https://google.com/maps/?cid=0x3bc2b91f867bd9b5:0x6c48b7445ec9db72",
            date: "2022-07-13"
          }
        ]
      }
    },
    commute_routes: {
      total_routes: 6,
      travel_modes: {
        DRIVE: 5,
        TWO_WHEELER: 1
      },
      routes: [
        {
          id: "470FBF37E0703F8D",
          travel_mode: "DRIVE",
          destination: {
            latitude: 18.587915199999998,
            longitude: 73.77986969999999,
            semantic_type: "TYPE_UNKNOWN"
          }
        },
        {
          id: "47A9644736B40721",
          travel_mode: "TWO_WHEELER",
          destination: {
            latitude: 18.579342999999998,
            longitude: 73.9089168,
            semantic_type: "TYPE_UNKNOWN"
          }
        }
      ]
    },
    statistics: {
      total_contributions: 42,
      contribution_breakdown: {
        reviews: 17,
        photos: 4,
        answers: 15,
        routes: 6
      },
      most_active_month: {
        month: "July",
        year: 2022,
        contribution_count: 15
      },
      top_locations: [
        {
          name: "Pune International Airport",
          contribution_count: 3,
          type: "Transportation"
        },
        {
          name: "Nexus Westend Mall",
          contribution_count: 2,
          type: "Shopping"
        },
        {
          name: "New Poona Bakery",
          contribution_count: 2,
          type: "Food"
        }
      ]
    }
  }
};

export const SAMPLE_MAPS_STATISTICS: UserContributions = {
  user_name: "John Smith",
  user_contributions: {
    travel_summary_2024: {
      total_trips: 156,
      total_distance: 2845,
      most_active_month: "March",
      monthly_summary: [
        {
          month: "March",
          trips: 45,
          distance: 850,
          transport: "Subway",
          route_highlights: ["Central Station", "Downtown", "University"],
          main_locations: ["Work Office", "University Campus"]
        },
        {
          month: "February",
          trips: 38,
          distance: 720,
          transport: "Car",
          main_locations: ["Shopping Mall", "Gym"]
        },
        {
          month: "January",
          trips: 73,
          distance: 1275,
          transport: "Mixed",
          route_highlights: ["Airport", "Beach Road", "City Center"],
          main_locations: ["Airport", "Beach", "Downtown"]
        }
      ],
      transport_summary: {
        "Car": 85,
        "Subway": 45,
        "Bus": 15,
        "Walking": 11
      },
      top_locations: [
        { name: "Work Office", visits: 98 },
        { name: "Gym", visits: 45 },
        { name: "Shopping Mall", visits: 32 }
      ]
    },
    reviews: {
      total_count: 24,
      rating_distribution: {
        "5_star": 12,
        "4_star": 8,
        "3_star": 2,
        "2_star": 1,
        "1_star": 1,
        "no_rating": 0
      },
      locations_reviewed: [
        {
          name: "Central Coffee Shop",
          coordinates: {
            latitude: 40.7128,
            longitude: -74.0060
          },
          rating: 5,
          review_text: "Best coffee in town! Great atmosphere and friendly staff.",
          date: "2024-03-15T09:30:00Z",
          address: "123 Main St, New York, NY",
          additional_details: {
            service_type: "Dine in",
            price_range: "$10-20",
            meal_type: "Breakfast"
          }
        },
        {
          name: "City Gym",
          coordinates: {
            latitude: 40.7142,
            longitude: -74.0064
          },
          rating: 4,
          review_text: "Modern equipment and clean facilities.",
          date: "2024-02-28T18:15:00Z",
          additional_details: {
            service_type: "Fitness",
            business_used: "Yes"
          }
        }
      ]
    },
    photos: {
      total_count: 35,
      total_views: 2750,
      contributions: [
        {
          title: "Central Park Spring",
          views: 856,
          date_taken: "2024-03-20T14:30:00Z",
          location: {
            latitude: 40.7829,
            longitude: -73.9654,
            altitude: 25.0
          }
        },
        {
          title: "Sunset at Brooklyn Bridge",
          views: 1234,
          date_taken: "2024-02-15T17:45:00Z",
          location: {
            latitude: 40.7061,
            longitude: -73.9969,
            altitude: 30.0
          }
        }
      ]
    },
    automated_answers: {
      total_responses: 42,
      categories: {
        "Accessibility": [
          {
            question: "Is this location wheelchair accessible?",
            answer: "Yes",
            location_url: "https://maps.google.com/location1",
            date: "2024-03-18"
          }
        ],
        "Business Information": [
          {
            question: "Does this place accept credit cards?",
            answer: "Yes",
            location_url: "https://maps.google.com/location2",
            date: "2024-03-15"
          }
        ]
      }
    },
    commute_routes: {
      total_routes: 8,
      travel_modes: {
        DRIVE: 6,
        TWO_WHEELER: 2
      },
      routes: [
        {
          id: "RT001",
          travel_mode: "DRIVE",
          destination: {
            latitude: 40.7484,
            longitude: -73.9857,
            semantic_type: "WORK"
          }
        },
        {
          id: "RT002",
          travel_mode: "TWO_WHEELER",
          destination: {
            latitude: 40.7527,
            longitude: -73.9772,
            semantic_type: "GYM"
          }
        }
      ]
    },
    statistics: {
      total_contributions: 109,
      contribution_breakdown: {
        reviews: 24,
        photos: 35,
        answers: 42,
        routes: 8
      },
      most_active_month: {
        month: "March",
        year: 2024,
        contribution_count: 45
      },
      top_locations: [
        {
          name: "Central Park",
          contribution_count: 15,
          type: "Park"
        },
        {
          name: "Times Square",
          contribution_count: 12,
          type: "Tourist Attraction"
        },
        {
          name: "Brooklyn Bridge",
          contribution_count: 8,
          type: "Landmark"
        }
      ]
    }
  }
};

export default class Wrapped {
  public spotifyPlayer: SpotifyFramePlayer | null = null;
  public demoMode = false;
  public possiblyEmptyExport = false;

  constructor(public googleMapUserData?: UserContributions) {
    // Check Google Maps data if provided
    if (googleMapUserData) {
      if (
        !googleMapUserData.user_name ||
        !googleMapUserData.user_contributions ||
        !googleMapUserData.user_contributions.travel_summary_2024 ||
        googleMapUserData.user_contributions.travel_summary_2024.total_trips <= 0 ||
        googleMapUserData.user_contributions.travel_summary_2024.total_distance <= 0 ||
        !googleMapUserData.user_contributions.travel_summary_2024.monthly_summary?.length ||
        !googleMapUserData.user_contributions.statistics?.total_contributions
      ) {
        this.possiblyEmptyExport = true;
      }
    }
  }

  public getStatistics(): UserContributions {
    console.log("Getting statistics", this.googleMapUserData);

    if (this.demoMode) {
      return VIVEK_MAPS_STATISTICS;
    }

    if (!this.googleMapUserData) {
      return SAMPLE_MAPS_STATISTICS;
    }

    return {
      user_name: this.googleMapUserData.user_name ?? "you",
      user_contributions: {
        travel_summary_2024: this.calculateStatistic(TravelSummaryStatistic),
        reviews: this.calculateStatistic(ReviewsStatistic),
        photos: this.calculateStatistic(PhotosStatistic),
        automated_answers: this.calculateStatistic(AutomatedAnswersStatistic),
        commute_routes: this.calculateStatistic(CommuteRoutesStatistic),
        statistics: this.calculateStatistic(ContributionStatistic)
      }
    };
  }

  private calculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      Sentry.captureException(
        new Error(`Failed to calculate statistic ${statistic.name}`),
        {
          extra: {
            originalException: e,
          },
        }
      );
      console.log(`Failed to calculate statistic ${statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }
}
