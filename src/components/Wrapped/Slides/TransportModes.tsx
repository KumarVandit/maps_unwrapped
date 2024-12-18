import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

const transportEmojis: Record<string, string> = {
  DRIVE: "🚗",
  TWO_WHEELER: "🏍️",
  NONE: "🚶"
};

function TransportModes({ statistics }: WrappedSlideProps) {
  const { 
    travel_modes,
    total_routes
  } = statistics.user_contributions.commute_routes;

  // Calculate preferred mode
  const totalTrips = total_routes;
  const [preferredMode, preferredModeTrips] = Object.entries(travel_modes)
    .reduce((max, [mode, trips]) => trips > max[1] ? [mode, trips] : max, ["NONE", 0]);
  const percentage = totalTrips > 0 ? Math.round((preferredModeTrips / totalTrips) * 100) : 0;

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-zinc-100">
      <InfoText className="!text-zinc-300">
        Your favorite way to travel
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        {transportEmojis[preferredMode] || "🚗"}{" "}
        {preferredMode.toLowerCase().replace("_", " ")}
      </FatHeading>

      <InfoText className="!text-zinc-300 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
        <span className="font-bold text-2xl text-zinc-50">
          <CountUp end={percentage} duration={2} />%
        </span>{" "}
        of your trips
      </InfoText>

      <HideForTime time={500}>
        <InfoText className="!text-zinc-300 animate-in slide-in-from-bottom fade-in duration-1000 delay-1000">
          You made{" "}
          <strong className="text-zinc-50">
            <CountUp end={totalTrips} duration={2} /> trips
          </strong>{" "}
          this year
          <br />
          <span className="text-zinc-400 mt-4 block">
            {preferredModeTrips > 0 
              ? `You prefer ${preferredMode.toLowerCase().replace("_", " ")} for your adventures!`
              : "Start your journey and record your first trip!"}
          </span>
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default TransportModes; 