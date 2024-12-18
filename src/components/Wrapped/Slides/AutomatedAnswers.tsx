import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

const responseMessages = {
  0: "Feeling shy? Start helping fellow travelers! 🤫",
  5: "You're becoming a helpful guide! 🌟",
  10: "Look at you, helping the community! 🎯",
  20: "You're a local expert now! 🏆",
  50: "The ultimate travel helper! 👑"
};

const categoryEmojis: Record<string, string> = {
  "accessibility": "♿",
  "business_info": "💼",
  "parking": "🅿️",
  "services": "🛎️",
  "None": "❓"
};

function AutomatedAnswers({ statistics }: WrappedSlideProps) {
  const { 
    total_responses,
    categories
  } = statistics.user_contributions.automated_answers;

  // Calculate insights
  const uniqueLocations = new Set();
  Object.values(categories).flat().forEach(answer => {
    uniqueLocations.add(answer.location_url);
  });
  const total_locations_helped = uniqueLocations.size;

  const [most_answered_category] = Object.entries(categories)
    .reduce(([maxCat, maxCount], [cat, answers]) => 
      answers.length > maxCount ? [cat, answers.length] : [maxCat, maxCount], 
      ["None", 0]);

  // Get appropriate message based on total responses
  const message = Object.entries(responseMessages)
    .reverse()
    .find(([threshold]) => total_responses >= Number(threshold))?.[1];

  // Calculate expertise level
  const getExpertiseLevel = () => {
    if (Object.keys(categories).length === 0) return "Start answering questions to help fellow travelers!";
    const maxAnswers = Math.max(...Object.values(categories).map(a => a.length));
    if (maxAnswers >= 5) return `You're an expert at answering ${most_answered_category.toLowerCase().replace("_", " ")} questions!`;
    if (total_locations_helped >= 3) return "You're making a real impact helping people discover places!";
    return "Keep answering questions to help more travelers!";
  };

  return (
    <WrappedContainer bg="bg-gradient-to-br from-purple-900 via-orange-900 to-red-900" text="text-amber-50">
      <InfoText className="!text-amber-100 text-xl font-medium animate-in slide-in-from-bottom fade-in duration-1000">
        When we asked for your help...
      </InfoText>

      <HideForTime time={500}>
        <div className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          <FatHeading>
            <CountUp end={total_responses} duration={2} />
          </FatHeading>
          <InfoText className="!text-amber-200 text-lg">
            times you answered! {total_responses > 0 ? "🙌" : "😅"}
          </InfoText>
        </div>
      </HideForTime>

      {total_responses > 0 && (
        <HideForTime time={1500}>
          <div className="animate-in slide-in-from-bottom fade-in duration-1000 delay-1500 mt-6">
            <InfoText className="!text-amber-100">
              You helped travelers at
            </InfoText>
            <div className="text-4xl font-bold text-white mt-2">
              <CountUp end={total_locations_helped} duration={2} /> locations
            </div>
            {most_answered_category !== "None" && (
              <InfoText className="!text-amber-200 mt-2">
                Especially with {categoryEmojis[most_answered_category] || "❓"}{" "}
                {most_answered_category.toLowerCase().replace("_", " ")} questions
              </InfoText>
            )}
          </div>
        </HideForTime>
      )}

      <HideForTime time={2500}>
        <InfoText className="!text-white animate-in slide-in-from-bottom fade-in duration-1000 delay-2500 mt-4 font-semibold">
          {message || responseMessages[0]}
          <br />
          <span className="text-amber-200 mt-2 block">
            {getExpertiseLevel()}
          </span>
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default AutomatedAnswers; 