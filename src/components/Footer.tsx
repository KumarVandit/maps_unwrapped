"use client"
import Link from "next/link";
import React from "react";
import MutedText from "./Wrapped/MutedText";

function Footer() {
  return (
    <div>
      <a
        href="https://www.linkedin.com/in/vanditkumar-a893a7205"
        target="_blank"
        rel="noreferrer"
        className="text-zinc-800 font-medium mt-12"
      >
        Made by <span className="underline">vandit</span> and <a
        href="https://www.linkedin.com/in/udita-saini-6998aa278/"
        target="_blank"
        rel="noreferrer"
        className="text-zinc-800 font-medium mt-12"
      ><span className="underline">udita</span></a>
        <br />
        <span className="text-sm">
          with love &lt;3
        </span>
      </a>
      
      
    </div>
  );
}

export default Footer;
