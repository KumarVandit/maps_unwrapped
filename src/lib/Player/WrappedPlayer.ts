import { WrappedSlideProps } from "@/components/Wrapped/WrappedContainer";
import EventEmitter from "events";
import Intro from "@/components/Wrapped/Slides/Intro";
import TravelSummary from "@/components/Wrapped/Slides/TravelSummary";

import Roundup from "@/components/Wrapped/Slides/Roundup";

import SpotifyFramePlayer from "../Spotify/FramePlayer";

import { trackEvent } from "../analytics";
import { UserContributions } from "../types"; 

import TransportModes from "@/components/Wrapped/Slides/TransportModes";

import CommuteStats from "@/components/Wrapped/Slides/CommuteStats";
import TopLocations from "@/components/Wrapped/Slides/TopLocations";
import PhotoStats from "@/components/Wrapped/Slides/PhotoStats";
import AutomatedAnswers from "@/components/Wrapped/Slides/AutomatedAnswers";
import ReviewStats from "@/components/Wrapped/Slides/ReviewStats";

export type Slide = {
  name: string;
  component: React.FC<WrappedSlideProps>;
  duration: number;
  spotify?: {
    uri: string;
  };
  skip?: (statistics: UserContributions) => boolean;
};

const SLIDES: Slide[] = [
  {
    name: "Intro",
    component: Intro,
    duration: 6000,
    spotify: {
      uri: "spotify:track:2b6Qg13iooGb1LnBFwrtcH",
    },
  },
  {
    name: "TravelSummary",
    component: TravelSummary,
    duration: 8000,
  },
  {
    name: "TransportModes",
    component: TransportModes,
    duration: 6000,
  },
  {
    name: "CommuteStats",
    component: CommuteStats,
    duration: 6000,
  },
  {
    name: "TopLocations",
    component: TopLocations,
    duration: 8000,
    spotify: {
      uri: "spotify:track:724X0Tdkai2En19Vi1HGUH",
    },
  },
  {
    name: "PhotoStats",
    component: PhotoStats,
    duration: 6000,
  },
  {
    name: "AutomatedAnswers",
    component: AutomatedAnswers,
    duration: 6000,
  },
  {
    name: "ReviewStats",
    component: ReviewStats,
    duration: 6000,
  },
  {
    name: "Roundup",
    component: Roundup,
    duration: 6000,
    spotify: {
      uri: "spotify:track:0I4ViThIJrFKDWvKclQcv5",
    },
  },
];

export default class WrappedPlayer extends EventEmitter {
  public currentSlide: Slide | null = null;

  constructor(public spotifyPlayer: SpotifyFramePlayer | null = null) {
    super();
  }

  public async play(statistics: UserContributions) {
    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];

      if (slide.skip && slide.skip(statistics)) {
        continue;
      }

      this.currentSlide = slide;
      console.log(`Playing slide`, this.currentSlide, this.spotifyPlayer);
      if (this.currentSlide.spotify && this.spotifyPlayer) {
        console.log(`Playing Spotify song`, this.currentSlide.spotify.uri);
        await this.spotifyPlayer.playSong(this.currentSlide.spotify.uri);
        console.log(`Loaded spotify song`);
      }
      trackEvent(`slide-${slide.name}`);

      this.emit("update");
      await this.wait(slide.duration);
    }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
