import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import HideForTime from "../HideForTime";
import CountUp from "react-countup";

const viewMilestoneMessages = {
  0: "Time to start capturing memories! 📸",
  100: "Your photos are getting noticed! ⭐",
  500: "You're becoming a local celebrity! 🌟",
  1000: "Your shots are going viral! 🚀",
  2000: "You're a photography sensation! 🎉"
};

const photographerLevels = {
  0: "Rookie Photographer 📱",
  5: "Rising Star 📸",
  10: "Photo Enthusiast 🎞️",
  20: "Local Legend 🏆",
  50: "Master Photographer 👑"
};

function PhotoStats({ statistics }: WrappedSlideProps) {
  const { total_count, total_views, contributions } = statistics.user_contributions.photos;
  
  // Find the most viewed photo
  const mostViewedPhoto = contributions.reduce((max, photo) => 
    photo.views > (max?.views || 0) ? photo : max, contributions[0]);

  // Get appropriate messages based on stats
  const viewMessage = Object.entries(viewMilestoneMessages)
    .reverse()
    .find(([threshold]) => total_views >= Number(threshold))?.[1];

  const photographerLevel = Object.entries(photographerLevels)
    .reverse()
    .find(([threshold]) => total_count >= Number(threshold))?.[1];

  return (
    <WrappedContainer bg="bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900" text="text-cyan-50">
      <InfoText className="!text-cyan-100 text-xl font-medium animate-in slide-in-from-bottom fade-in duration-1000">
        Let's see your photography skills...
      </InfoText>

      <HideForTime time={500}>
        <div className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          <div className="text-3xl font-bold text-white bg-white/10 rounded-lg px-6 py-3 backdrop-blur-sm inline-block">
            {photographerLevel || "Start your photography journey! 📸"}
          </div>
          <FatHeading className="mt-4">
            <CountUp end={total_count} duration={2} />
          </FatHeading>
          <InfoText className="!text-cyan-200 text-lg">
            photos shared this year
          </InfoText>
        </div>
      </HideForTime>

      <HideForTime time={1500}>
        <div className="animate-in slide-in-from-bottom fade-in duration-1000 delay-1500 mt-6">
          <div className="text-4xl font-bold text-white">
            <CountUp end={total_views} duration={2} /> views
          </div>
          <InfoText className="!text-cyan-200 mt-2">
            {viewMessage || "Share your first photo to get started!"}
          </InfoText>
        </div>
      </HideForTime>

      {mostViewedPhoto && (
        <HideForTime time={2500}>
          <div className="animate-in slide-in-from-bottom fade-in duration-1000 delay-2500 mt-6">
            <InfoText className="!text-cyan-100">
              Your most popular shot got
            </InfoText>
            <div className="text-3xl font-bold text-white mt-2">
              <CountUp end={mostViewedPhoto.views} duration={2} /> views
            </div>
            <InfoText className="!text-cyan-200 text-sm mt-1">
              {new Date(mostViewedPhoto.date_taken).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </InfoText>
          </div>
        </HideForTime>
      )}
    </WrappedContainer>
  );
}

export default PhotoStats; 