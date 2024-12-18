import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import HideForTime from "../HideForTime";
import CountUp from "react-countup";

const locationTypeEmojis: Record<string, string> = {
  "Transportation": "🚉",
  "Shopping": "🛍️",
  "Food": "🍽️",
  "Park": "🌳",
  "Tourist Attraction": "🎡",
  "Landmark": "🏛️",
  "Place": "📍"
};

const loveMessages = [
  "You're practically a local here! 🏠",
  "This place must be special! ✨",
  "Your go-to spot! 🎯",
  "Can't stay away, huh? 🌟",
  "Your favorite hangout! 🌈"
];

function TopLocations({ statistics }: WrappedSlideProps) {
  const { top_locations } = statistics.user_contributions.statistics;
  const topLocation = top_locations[0] || { name: "", contribution_count: 0, type: "Place" };
  const loveMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];

  return (
    <WrappedContainer bg="bg-gradient-to-br from-rose-900 via-pink-900 to-fuchsia-900" text="text-white">
      <InfoText className="!text-rose-100 text-xl font-medium animate-in slide-in-from-bottom fade-in duration-1000">
        Looks like you've fallen in love with
      </InfoText>

      <HideForTime time={500}>
        <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500 max-w-xl mx-auto text-white">
          {locationTypeEmojis[topLocation.type] || "📍"}{" "}
          {topLocation.name}
        </FatHeading>
      </HideForTime>

      <HideForTime time={1500}>
        <div className="animate-in slide-in-from-bottom fade-in duration-1000 delay-1500">
          <InfoText className="!text-rose-100 text-lg">
            You've contributed here
          </InfoText>
          <div className="text-4xl font-bold text-white mt-2">
            <CountUp end={topLocation.contribution_count} duration={2} /> times
          </div>
        </div>
      </HideForTime>

      <HideForTime time={2500}>
        <InfoText className="!text-white animate-in slide-in-from-bottom fade-in duration-1000 delay-2500 mt-4 font-semibold">
          {loveMessage}
        </InfoText>
      </HideForTime>

      {top_locations.length > 1 && (
        <HideForTime time={3000}>
          <InfoText className="!text-rose-100 animate-in slide-in-from-bottom fade-in duration-1000 delay-3000 mt-6 text-sm">
            Also showing love to{" "}
            <span className="font-bold text-white">
              {top_locations[1].name}
            </span>{" "}
            and{" "}
            <span className="font-bold text-white">
              {top_locations[2].name}
            </span>
          </InfoText>
        </HideForTime>
      )}
    </WrappedContainer>
  );
}

export default TopLocations; 