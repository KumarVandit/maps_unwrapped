import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

const starEmojis = ["", "⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
const reviewerLevels = {
  0: "Time to start reviewing! 📝",
  5: "Aspiring Critic 🎯",
  10: "Local Guide 🗺️",
  20: "Expert Reviewer 🏆",
  50: "Review Legend 👑"
};

function ReviewStats({ statistics }: WrappedSlideProps) {
  const { 
    total_count,
    rating_distribution,
    locations_reviewed
  } = statistics.user_contributions.reviews;

  // Find best and worst rated places
  const bestPlace = locations_reviewed.reduce((best, loc) => 
    loc.rating > (best?.rating || 0) ? loc : best, locations_reviewed[0]);
  
  const worstPlace = locations_reviewed.reduce((worst, loc) => 
    loc.rating < (worst?.rating || 5) ? loc : worst, locations_reviewed[0]);

  // Get reviewer level
  const reviewerLevel = Object.entries(reviewerLevels)
    .reverse()
    .find(([threshold]) => total_count >= Number(threshold))?.[1];

  return (
    <WrappedContainer bg="bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900" text="text-yellow-50">
      <InfoText className="!text-yellow-100 text-xl font-medium animate-in slide-in-from-bottom fade-in duration-1000">
        Your reviews tell a story...
      </InfoText>

      <HideForTime time={500}>
        <div className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          <div className="text-3xl font-bold text-white bg-white/10 rounded-lg px-6 py-3 backdrop-blur-sm inline-block">
            {reviewerLevel}
          </div>
          <FatHeading className="mt-4">
            <CountUp end={total_count} duration={2} />
          </FatHeading>
          <InfoText className="!text-yellow-200 text-lg">
            places reviewed
          </InfoText>
        </div>
      </HideForTime>

      <HideForTime time={1500}>
        <div className="grid grid-cols-5 gap-2 mt-6 bg-black/20 rounded-lg p-4 backdrop-blur-sm">
          {[5, 4, 3, 2, 1].map(stars => (
            <div key={stars} className="text-center">
              <div className="text-sm text-yellow-200 mb-1">
                {starEmojis[stars]}
              </div>
              <div className="text-2xl font-bold text-white">
                <CountUp 
                  end={rating_distribution[`${stars}_star` as keyof typeof rating_distribution]} 
                  duration={2} 
                />
              </div>
            </div>
          ))}
        </div>
      </HideForTime>

      {bestPlace && worstPlace && (
        <HideForTime time={2500}>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-900/30 rounded-lg p-4 backdrop-blur-sm">
              <InfoText className="!text-green-200">Best Experience</InfoText>
              <div className="text-xl font-bold text-white mt-2">
                {bestPlace.name}
              </div>
              <div className="text-green-200 mt-1">
                {starEmojis[bestPlace.rating]}
              </div>
            </div>
            <div className="bg-red-900/30 rounded-lg p-4 backdrop-blur-sm">
              <InfoText className="!text-red-200">Needs Improvement</InfoText>
              <div className="text-xl font-bold text-white mt-2">
                {worstPlace.name}
              </div>
              <div className="text-red-200 mt-1">
                {starEmojis[worstPlace.rating]}
              </div>
            </div>
          </div>
        </HideForTime>
      )}
    </WrappedContainer>
  );
}

export default ReviewStats; 