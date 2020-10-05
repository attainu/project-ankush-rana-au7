import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
export default function Home() {
  console.log("API IS ", API);
  return <Base title="Home Page" description="Welcome to E-comm Store"></Base>;
}
