"use client"
import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import MutedText from "./MutedText";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink, PlugZap } from "lucide-react";
import Faq from "../Preparation/Faq";
import heroImage from "@/app/gmaps-qrcode.svg";
import Image from "next/image";
import Footer from "../Footer";



function IntroInformation ({
  onContinue,
  onDemo,
}: {
  onContinue: () => void;
  onDemo: () => void;
}) {
  return (
    <WrappedContainer>
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-12 max-w-[100vw]">
        <div className="flex flex-col justify-center gap-6 text-left">
          <FatHeading>Maps Unwrapped.</FatHeading>
          <InfoText>Spotify Wrapped but for Google Maps 🚀</InfoText>

          <div className="max-w-xl">
            <MutedText className="break-words hyphens-auto">
              Wrapped for Google Maps gives you insights on your travel.
              <br />
              To use it, you'll need to export your Google Maps data from here -{" "}
              <a
                href="https://ggl.link/gmaps"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold break-all"
              >
                <br/>
                https://ggl.link/gmaps
              </a>{" "}
              in <strong>.zip</strong>
              <br />
              <br/>
              Your exported data does not include login credentials! 
              <br/>For more
              info, look at the FAQ section
              below.
            </MutedText>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="https://ggl.link/gmaps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="dark w-full">
                Open Google Takeout and request my data export
                <ExternalLink className="ml-2" size={16} />
              </Button>
            </a>
            <Button onClick={onContinue} className="w-full">
              I have my Takeout data export, let's go!
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button className="dark w-full bg-starship-100" onClick={onDemo}>
              Show demo Wrapped
              <PlugZap className="ml-2" size={16} />
            </Button>
          </div>
        </div>

        <div>
          <Image
            src={heroImage}
            alt="Maps Unwrapped Link to download data"
            width={720}
            height={1280}
            style={{
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
        </div>
      </div>
      

      
      {/* <FatHeading className="mt-12 mb-6 text-xl">A quick tutorial</FatHeading>
      <iframe
        width="560"
        height="315"
        src="" //PUT LINK HERE
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="max-w-[80vw]"
      ></iframe> */}

      <FatHeading className="mt-12 mb-6 text-xl">
        Frequently Asked Questions
      </FatHeading>
      <Faq />

      

      

      <Footer />
    </WrappedContainer>
  );
}

export default IntroInformation;
