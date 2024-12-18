// global.d.ts
import React from "react";

declare module "react" {
  interface InputHTMLAttributes<T> extends React.HTMLProps<T> {
    webkitdirectory?: boolean; // Add this line
  }
}