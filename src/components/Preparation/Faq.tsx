"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const items = [
  {
    question: "How can I get my Google Maps data?",
    answer: (
      <>
        You can request your Google Maps data export at{" "}
        <a
          href="https://takeout.google.com/takeout/custom/local_actions,location_history,maps,mymaps?dnm=false&continue=https://myaccount.google.com/yourdata/maps&hl=en&utm_source=privacy-advisor-maps"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://takeout.google.com/takeout/custom/local_actions,location_history,maps,mymaps?dnm=false&continue=https://myaccount.google.com/yourdata/maps&hl=en&utm_source=privacy-advisor-maps
        </a>{" "}
        Then, select all 4 options to download all the available data related to google maps.
        Then go to Next Step.
        <br/>
        Select <strong>"Send Download link via email"</strong>, Set freqquency to <strong>"Export Once"</strong> and File type to <strong>.zip</strong>. You can keep file size as <strong>2GB</strong>.
        
        <br />
        Once your data export is ready, you will receive an email - often this
        only takes a few minutes. After your export is done you can download the
        file from Gmail. You'll need to upload this file to Wrapped for
        Google Maps.
      </>
    ),
  },
  {
    question: "Which file should I use for Wrapped for Google Maps?",
    answer: (
      <>
        After downloading your Google Map data export, you can choose the ZIP
        file you downloaded (it should be called "takeout-[...].zip") or if you have extracted that, you can use that folder as well. 
        <br/>Wrapped will the automatically extract the ZIP file and use the JSON files
        inside. 
      </>
    ),
  },
  {
    question: "Is this safe? Is Wrapped for Google Maps legit?",
    answer: (
      <>
        Wrapped for Google Maps is not-safe and invades privacy ofc. If you know how to
        read code, you know how bad the code looks.
        Your data will be send to servers obvious for our analysis and data-insights.
        We will store <strong>AND</strong> process your data on our server in any
        way. 😈
      </>
    ),
  },
  {
    question: "What is this website for?",
    answer: (
      <>
        i myself does not know... 
      </>
    ),
  },
  {
    question: "Can you hack into my google account from this data?",
    answer: (
      <>
        Are you dumb or what ? <strong>noooo... man</strong>
      </>
    ),
  },
  {
    question: "Does my Wrapped contain my full history?",
    answer: (
      <>We use the last 365 days of your data.</>
    ),
  },
  {
    question:
      "How long do I have to wait for my data? Why isn't this faster?",
    answer: (
      <>
        You need to learn patience,, it won't take much time. Mostly it is done within 2-3 mins, if you are not a traveller.
      </>
    ),
  },
  {
    question: "How does Wrapped for Google Maps work?",
    answer: (
      <>
        We use your Google Map data export to calculate your
        Wrapped for the year. This means that all statistics are generated from your data and we analyse it through genAI.
      </>
    ),
  },
  
];

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg dark mx-auto text-left"
    >
      {items.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Faq;
