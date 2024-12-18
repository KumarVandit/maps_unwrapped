import { UserContributions } from "../types";

export default function getShareUrl(statistics: UserContributions) {
  const data = {
    name: statistics.user_name,
    total_trips: statistics.user_contributions.travel_summary_2024.total_trips,
    total_distance: statistics.user_contributions.travel_summary_2024.total_distance,
    total_reviews: statistics.user_contributions.reviews.total_count,
    total_photos: statistics.user_contributions.photos.total_count,
    total_answers: statistics.user_contributions.automated_answers.total_responses,
    total_routes: statistics.user_contributions.commute_routes.total_routes,
    total_contributions: statistics.user_contributions.statistics.total_contributions
  };

  const url = new URL("/api/image", window.location.href);
  url.searchParams.set("data", JSON.stringify(data));

  return url.toString();
}
