import { z } from "zod";




export const InstagramTimedEntrySchema = z.object({
  href: z.string(),
  value: z.string(), // username
  timestamp: z.number(),
});

export const InstagramAccountConnectionsSchema = z.object({
  followers: z.array(InstagramTimedEntrySchema).optional(),
  following: z.array(InstagramTimedEntrySchema).optional(),
  recentlyUnfollowed: z.array(InstagramTimedEntrySchema).optional(),
  recentFollowRequests: z.array(InstagramTimedEntrySchema).optional(),
});

export const InstagramRecentSearchesSchema = z.object({
  accounts: z.array(InstagramTimedEntrySchema).optional(),
  wordOrPhrase: z.array(InstagramTimedEntrySchema).optional(),
});

export const InstagramProfileChangeSchema = z.object({
  changed: z
    .enum([
      "Profile Bio Text",
      "Username",
      "Profile Photo",
      "Switched to Public",
      "Switched to Private",
    ])
    .or(z.string()),
  timestamp: z.number(),
});

export const InstagramAccountInformationSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  changes: z.array(InstagramProfileChangeSchema).optional(),
});

export const InstagramDirectMessageSchema = z.object({
  content: z.string(),
  timestamp: z.number(),
  sender: z.string(),

  isUserSender: z.boolean(),
  isReelShare: z.boolean(),
  isPostShare: z.boolean(),
  isTikTokShare: z.boolean(),
});

export const InstagramActivitySchema = z.object({
  comments: z.array(InstagramTimedEntrySchema).optional(),
  likedComments: z.array(InstagramTimedEntrySchema).optional(),
  likedPosts: z.array(InstagramTimedEntrySchema).optional(),
  recentSearches: InstagramRecentSearchesSchema.optional(),
  participatedPolls: z.array(InstagramTimedEntrySchema).optional(),
  storyLikes: z.array(InstagramTimedEntrySchema).optional(),
  stories: z.array(InstagramTimedEntrySchema).optional(),
  profilePhotos: z.array(InstagramTimedEntrySchema).optional(),
});

export const InstagramExternalTrackedPage = z.object({
  name: z.string(),
  eventAmount: z.number(),
});

export const InstagramUserDataSchema = z.object({
  accountConnections: InstagramAccountConnectionsSchema,
  accountInformation: InstagramAccountInformationSchema,
  directMessages: z.array(InstagramDirectMessageSchema),
  activity: InstagramActivitySchema,
  externalTrackedPages: z.array(InstagramExternalTrackedPage),
});

export const ShareImageDataSchema = z.object({
  name: z.string(),
  storiesPosted: z.number(),
  dmReceived: z.number(),
  reelsShared: z.number(),
  unfollowedAccounts: z.number(),
  postsLiked: z.number(),
  commentsWritten: z.number(),
  externalTracking: z.number(),
});

export type InstagramUserData = z.infer<typeof InstagramUserDataSchema>;
export type ShareImageData = z.infer<typeof ShareImageDataSchema>;

export type InstagramTimedEntry = z.infer<typeof InstagramTimedEntrySchema>;
export type InstagramAccountConnections = z.infer<
  typeof InstagramAccountConnectionsSchema
>;
export type InstagramRecentSearches = z.infer<
  typeof InstagramRecentSearchesSchema
>;
export type InstagramProfileChange = z.infer<
  typeof InstagramProfileChangeSchema
>;
export type InstagramAccountInformation = z.infer<
  typeof InstagramAccountInformationSchema
>;
export type InstagramDirectMessage = z.infer<
  typeof InstagramDirectMessageSchema
>;
export type InstagramActivity = z.infer<typeof InstagramActivitySchema>;
export type InstagramExternalTrackedPage = z.infer<
  typeof InstagramExternalTrackedPage
>;



// ----------------------------------------------------------------------------------------------
//starts from here

export const MonthlyTravelSummarySchema = z.object({
  month: z.string(),
  trips: z.number().optional(),
  distance: z.number().optional(),
  transport: z.string(),
  route_highlights: z.array(z.string()).optional(),
  main_locations: z.array(z.string())
});

export const TravelSummarySchema = z.object({
  total_trips: z.number(),
  total_distance: z.number(),
  most_active_month: z.string(),
  monthly_summary: z.array(MonthlyTravelSummarySchema),
  transport_summary: z.record(z.number()),
  top_locations: z.array(z.object({
    name: z.string(),
    visits: z.number()
  }))
});

export const ReviewLocationSchema = z.object({
  name: z.string(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  }),
  rating: z.number(),
  review_text: z.string().optional(),
  date: z.string(),
  address: z.string().optional(),
  additional_details: z.object({
    service_type: z.string().optional(),
    negative_aspects: z.array(z.string()).optional(),
    business_used: z.string().optional(),
    price_range: z.string().optional(),
    meal_type: z.string().optional()
  }).optional()
});

export const ReviewsSchema = z.object({
  total_count: z.number(),
  rating_distribution: z.object({
    "5_star": z.number(),
    "4_star": z.number(),
    "3_star": z.number(),
    "2_star": z.number(),
    "1_star": z.number(),
    "no_rating": z.number()
  }),
  locations_reviewed: z.array(ReviewLocationSchema)
});

export const PhotoContributionSchema = z.object({
  title: z.string(),
  views: z.number(),
  date_taken: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    altitude: z.number()
  })
});

export const PhotosSchema = z.object({
  total_count: z.number(),
  total_views: z.number(),
  contributions: z.array(PhotoContributionSchema)
});

export const AutomatedAnswerSchema = z.object({
  question: z.string(),
  answer: z.string(),
  location_url: z.string(),
  date: z.string()
});

export const AutomatedAnswersSchema = z.object({
  total_responses: z.number(),
  categories: z.record(z.array(AutomatedAnswerSchema))
});

export const CommuteRouteSchema = z.object({
  id: z.string(),
  travel_mode: z.string(),
  destination: z.object({
    latitude: z.number(),
    longitude: z.number(),
    semantic_type: z.string()
  })
});

export const CommuteRoutesSchema = z.object({
  total_routes: z.number(),
  travel_modes: z.object({
    DRIVE: z.number(),
    TWO_WHEELER: z.number()
  }),
  routes: z.array(CommuteRouteSchema)
});

export const StatisticsSchema = z.object({
  total_contributions: z.number(),
  contribution_breakdown: z.object({
    reviews: z.number(),
    photos: z.number(),
    answers: z.number(),
    routes: z.number()
  }),
  most_active_month: z.object({
    month: z.string(),
    year: z.number(),
    contribution_count: z.number()
  }),
  top_locations: z.array(z.object({
    name: z.string(),
    contribution_count: z.number(),
    type: z.string()
  }))
});

export const UserContributionsSchema = z.object({
  user_name: z.string(),
  user_contributions: z.object({
    travel_summary_2024: TravelSummarySchema,
    reviews: ReviewsSchema,
    photos: PhotosSchema,
    automated_answers: AutomatedAnswersSchema,
    commute_routes: CommuteRoutesSchema,
    statistics: StatisticsSchema
  })
});

export type MonthlyTravelSummary = z.infer<typeof MonthlyTravelSummarySchema>;
export type TravelSummary = z.infer<typeof TravelSummarySchema>;
export type ReviewLocation = z.infer<typeof ReviewLocationSchema>;
export type Reviews = z.infer<typeof ReviewsSchema>;
export type PhotoContribution = z.infer<typeof PhotoContributionSchema>;
export type Photos = z.infer<typeof PhotosSchema>;
export type AutomatedAnswer = z.infer<typeof AutomatedAnswerSchema>;
export type AutomatedAnswers = z.infer<typeof AutomatedAnswersSchema>;
export type CommuteRoute = z.infer<typeof CommuteRouteSchema>;
export type CommuteRoutes = z.infer<typeof CommuteRoutesSchema>;
export type Statistics = z.infer<typeof StatisticsSchema>;
export type UserContributions = z.infer<typeof UserContributionsSchema>;
