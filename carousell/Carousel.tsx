import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./embla.css";

const OPTIONS: EmblaOptionsType = { align: "start", loop: true };

export function Carousell() {
  return <EmblaCarousel options={OPTIONS} />;
}
