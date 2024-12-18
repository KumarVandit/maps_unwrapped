import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const travelComments = {
  0: "Time to start your journey!",
  5: "Getting your feet wet with exploring!",
  10: "You're becoming quite the traveler!",
  20: "Adventure is clearly in your blood!",
  50: "You're a certified globe trotter!",
  100: "Is there any place you haven't been?",
  200: "You must have wheels instead of feet!",
};

function TravelSummary({ statistics }: WrappedSlideProps) {
  const { 
    total_trips, 
    total_distance,
    most_active_month,
    monthly_summary
  } = statistics.user_contributions.travel_summary_2024;

  // Sort by distance to find the actual most active and second most active months
  const sortedMonths = [...monthly_summary]
    .sort((a, b) => (b.distance || 0) - (a.distance || 0));
  
  const mostActiveData = sortedMonths[0];
  const secondMostActiveData = sortedMonths[1];

  return (
    <WrappedContainer bg="bg-emerald-900" text="text-emerald-100">
      <InfoText className="!text-emerald-200">
        This year, you embarked on
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={total_trips} duration={2} />
        <br />
        adventures
      </FatHeading>

      <InfoText className="!text-emerald-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
        covering an impressive{" "}
        <span className="font-bold">
          <CountUp end={total_distance} duration={2} decimals={1} /> km
        </span>
      </InfoText>

      <HideForTime time={500}>
        <InfoText className="!text-emerald-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-1000">
          {mostActiveData && (
            <>
              Your most active month was{" "}
              <strong className="text-2xl text-emerald-50">{mostActiveData.month}</strong>
              <br />
              <span className="text-emerald-300">
                with <strong className="text-emerald-50">{(mostActiveData.distance || 0).toFixed(1)} km</strong> covered
              </span>
              {secondMostActiveData && (
                <>
                  <br />
                  <span className="text-emerald-300 mt-2 block">
                    Followed closely by {secondMostActiveData.month} with{" "}
                    <strong className="text-emerald-50">{(secondMostActiveData.distance || 0).toFixed(1)} km</strong>
                  </span>
                </>
              )}
              <span className="text-emerald-300 font-semibold mt-2 block">
                {lookup(total_trips, travelComments)}
              </span>
            </>
          )}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default TravelSummary;
