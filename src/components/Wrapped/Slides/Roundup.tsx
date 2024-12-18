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
    <WrappedContainer bg="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800" text="text-gray-100">
      <div className="md:p-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-white animate-in slide-in-from-bottom fade-in duration-1000 pb-16 text-center">
          Your 2024 Maps Journey
        </h1>

        <div className="w-full text-left px-4">
          <Table className="w-full border-separate border-spacing-y-4">
            <TableBody className="divide-y-2 divide-gray-800">
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell colSpan={2} className="text-gray-100 py-6">
                  <strong className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Travel Summary</strong>
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Total Trips</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {travel_summary_2024.total_trips.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Distance Covered</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {travel_summary_2024.total_distance.toLocaleString()} km
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Most Active Month</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {travel_summary_2024.most_active_month}
                </TableCell>
              </TableRow>

              <TableRow className="group transition-all">
                <TableCell colSpan={2} className="text-gray-100 py-6">
                  <strong className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Transport Modes</strong>
                </TableCell>
              </TableRow>
              {Object.entries(commute_routes.travel_modes).map(([mode, count]) => (
                <TableRow key={mode} className="group transition-all hover:bg-gray-800/30">
                  <TableCell className="text-gray-300 text-lg py-4">
                    {mode.toLowerCase().replace("_", " ")}
                  </TableCell>
                  <TableCell className="text-white text-lg font-semibold">{count} trips</TableCell>
                </TableRow>
              ))}

              <TableRow className="group transition-all">
                <TableCell colSpan={2} className="text-gray-100 py-6">
                  <strong className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Photography</strong>
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Total Photos</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {photos.total_count.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Total Views</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {photos.total_views.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow className="group transition-all">
                <TableCell colSpan={2} className="text-gray-100 py-6">
                  <strong className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Reviews</strong>
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-should be 4">Total Reviews</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {reviews.total_count.toLocaleString()}
                </TableCell>
              </TableRow>
              {Object.entries(reviews.rating_distribution)
                .filter(([key]) => key !== "no_rating")
                .sort(([a], [b]) => Number(b.charAt(0)) - Number(a.charAt(0)))
                .map(([stars, count]) => (
                  <TableRow key={stars} className="group transition-all hover:bg-gray-800/30">
                    <TableCell className="text-gray-300 text-lg py-4">
                      {stars.replace("_star", "")} Star Reviews
                    </TableCell>
                    <TableCell className="text-white text-lg font-semibold">{count}</TableCell>
                  </TableRow>
              ))}

              <TableRow className="group transition-all">
                <TableCell colSpan={2} className="text-gray-100 py-6">
                  <strong className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Q&A Contributions</strong>
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Questions Answered</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {automated_answers.total_responses.toLocaleString()}
                </TableCell>
              </TableRow>
              {Object.entries(automated_answers.categories).map(([category, answers]) => (
                <TableRow key={category} className="group transition-all hover:bg-gray-800/30">
                  <TableCell className="text-gray-300 text-lg py-4">
                    {category.replace("_", " ")}
                  </TableCell>
                  <TableCell className="text-white text-lg font-semibold">{answers.length} answers</TableCell>
                </TableRow>
              ))}

              <TableRow className="group transition-all">
                <TableCell colSpan={2} className="text-gray-100 py-6">
                  <strong className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">Overall Impact</strong>
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Total Contributions</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {stats.total_contributions.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow className="group transition-all hover:bg-gray-800/30">
                <TableCell className="text-gray-300 text-lg py-4">Most Active Month</TableCell>
                <TableCell className="text-white text-lg font-semibold">
                  {stats.most_active_month.month} {stats.most_active_month.year} ({stats.most_active_month.contribution_count} contributions)
                </TableCell>
              </TableRow>
              {stats.top_locations.slice(0, 3).map((location, index) => (
                <TableRow key={location.name} className="group transition-all hover:bg-gray-800/30">
                  <TableCell className="text-gray-300 text-lg py-4">
                    Top Location #{index + 1}
                  </TableCell>
                  <TableCell className="text-white text-lg font-semibold">
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
            className="mt-16 w-full bg-gray-800 hover:bg-gray-700 text-white text-lg py-6 rounded-xl font-semibold"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Share2 className="inline-block mr-3" size={24} />
                Share Your Maps Journey
              </>
            )}
          </Button>

          <div className="mt-12 text-center text-gray-400 text-base">
            Thanks for exploring with Google Maps in 2024! 🌍
          </div>
        </div>
      </div>
    </WrappedContainer>
  );
}

export default MapsRoundup;