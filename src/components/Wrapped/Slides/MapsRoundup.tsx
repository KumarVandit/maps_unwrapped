import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Share2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import getShareUrl from "@/lib/utils/getShareUrl";
import shareImage from "@/lib/utils/shareImage";

function MapsRoundup({ statistics }: WrappedSlideProps) {
  const [isLoadingShareImage, setIsLoadingShareImage] = React.useState(false);
  const { travel_summary_2024, reviews, photos, automated_answers, commute_routes, statistics: stats } = statistics.user_contributions;

  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" text="text-white">
      <div className="md:p-12">
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200 animate-in slide-in-from-bottom fade-in duration-1000 pb-12">
          Your 2024 Maps Journey...
        </h1>

        <div className="w-4xl text-left">
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="text-indigo-400">
                  <strong className="text-purple-200 text-lg">Travel Summary</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Total Trips</TableCell>
                <TableCell className="text-white">
                  {travel_summary_2024.total_trips.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Distance Covered</TableCell>
                <TableCell className="text-white">
                  {travel_summary_2024.total_distance.toLocaleString()} km
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Most Active Month</TableCell>
                <TableCell className="text-white">
                  {travel_summary_2024.most_active_month}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-indigo-400">
                  <strong className="text-purple-200 text-lg">Transport Modes</strong>
                </TableCell>
              </TableRow>
              {Object.entries(commute_routes.travel_modes).map(([mode, count]) => (
                <TableRow key={mode}>
                  <TableCell className="text-indigo-300">
                    {mode.toLowerCase().replace("_", " ")}
                  </TableCell>
                  <TableCell className="text-white">{count} trips</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell className="text-indigo-400">
                  <strong className="text-purple-200 text-lg">Photography</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Total Photos</TableCell>
                <TableCell className="text-white">
                  {photos.total_count.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Total Views</TableCell>
                <TableCell className="text-white">
                  {photos.total_views.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-indigo-400">
                  <strong className="text-purple-200 text-lg">Reviews</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Total Reviews</TableCell>
                <TableCell className="text-white">
                  {reviews.total_count.toLocaleString()}
                </TableCell>
              </TableRow>
              {Object.entries(reviews.rating_distribution)
                .filter(([key]) => key !== "no_rating")
                .sort(([a], [b]) => Number(b.charAt(0)) - Number(a.charAt(0)))
                .map(([stars, count]) => (
                  <TableRow key={stars}>
                    <TableCell className="text-indigo-300">
                      {stars.replace("_star", "")} Star Reviews
                    </TableCell>
                    <TableCell className="text-white">{count}</TableCell>
                  </TableRow>
              ))}

              <TableRow>
                <TableCell className="text-indigo-400">
                  <strong className="text-purple-200 text-lg">Q&A Contributions</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Questions Answered</TableCell>
                <TableCell className="text-white">
                  {automated_answers.total_responses.toLocaleString()}
                </TableCell>
              </TableRow>
              {Object.entries(automated_answers.categories).map(([category, answers]) => (
                <TableRow key={category}>
                  <TableCell className="text-indigo-300">
                    {category.replace("_", " ")}
                  </TableCell>
                  <TableCell className="text-white">{answers.length} answers</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell className="text-indigo-400">
                  <strong className="text-purple-200 text-lg">Overall Impact</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Total Contributions</TableCell>
                <TableCell className="text-white">
                  {stats.total_contributions.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-indigo-300">Most Active Month</TableCell>
                <TableCell className="text-white">
                  {stats.most_active_month.month} {stats.most_active_month.year} ({stats.most_active_month.contribution_count} contributions)
                </TableCell>
              </TableRow>
              {stats.top_locations.slice(0, 3).map((location, index) => (
                <TableRow key={location.name}>
                  <TableCell className="text-indigo-300">
                    Top Location #{index + 1}
                  </TableCell>
                  <TableCell className="text-white">
                    {location.name} ({location.contribution_count} contributions)
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            onClick={async () => {
              setIsLoadingShareImage(true);
              const url = getShareUrl(statistics);
              await shareImage(url);
              trackEvent("share_image");
              setTimeout(() => {
                setIsLoadingShareImage(false);
              }, 1000);
            }}
            className="mt-12 w-full bg-indigo-700 hover:bg-indigo-600 text-white"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Share2 className="inline-block mr-2" size={16} />
                Share Your Maps Journey
              </>
            )}
          </Button>

          <div className="mt-8 text-center text-indigo-300 text-sm">
            Thanks for exploring with Google Maps in 2024! 🌍
          </div>
        </div>
      </div>
    </WrappedContainer>
  );
}

export default MapsRoundup; 