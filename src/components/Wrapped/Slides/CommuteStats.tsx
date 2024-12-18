import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

const contributionEmojis = {
  reviews: "⭐",
  photos: "📸",
  answers: "💭",
  routes: "🗺️"
};

const contributionColors = {
  reviews: "text-yellow-300",
  photos: "text-sky-300",
  answers: "text-fuchsia-300",
  routes: "text-emerald-300"
};

function CommuteStats({ statistics }: WrappedSlideProps) {
  const { 
    total_contributions,
    contribution_breakdown,
    most_active_month
  } = statistics.user_contributions.statistics;

  return (
    <WrappedContainer bg="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900" text="text-indigo-50">
      <InfoText className="!text-indigo-200 animate-in slide-in-from-bottom fade-in duration-1000">
        This year, you've made an incredible
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={total_contributions} duration={2} />
        <br />
        contributions
      </FatHeading>

      <div className="flex flex-col gap-3 mt-4">
        {Object.entries(contribution_breakdown).map(([type, count], index) => (
          <HideForTime key={type} time={500 + index * 200}>
            <div className={`animate-in slide-in-from-bottom fade-in duration-1000 delay-${500 + index * 200}`}>
              <InfoText 
                className={`
                  ${contributionColors[type as keyof typeof contributionColors]} 
                  font-semibold backdrop-blur-sm
                  ${type === 'routes' ? 'bg-white/10 px-4 py-2 rounded-lg text-emerald-200 text-lg' : ''}
                `}
              >
                {contributionEmojis[type as keyof typeof contributionEmojis]}{" "}
                <CountUp end={count} duration={2} /> {type}
              </InfoText>
            </div>
          </HideForTime>
        ))}
      </div>

      <HideForTime time={1500}>
        <InfoText className="!text-indigo-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-1500 mt-4">
          Your most active month was{" "}
          <span className="font-bold text-white">
            {most_active_month.month}
          </span>{" "}
          with{" "}
          <span className="font-bold text-white">
            {most_active_month.contribution_count}
          </span>{" "}
          contributions!
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default CommuteStats; 