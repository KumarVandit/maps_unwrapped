import React from "react";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import HideForTime from "../HideForTime";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";

function Intro({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        {statistics.user_name}, right? 👋
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          Let's take a look at your activity on Google Maps, shall we?
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default Intro;
