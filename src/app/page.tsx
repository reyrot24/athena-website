import { Header } from "./homeSections/Header";
import { corsi4Img } from "@/constants/corsiImg";
import { buttons } from "@/constants/buttons";
import Gallery from "./homeSections/Gallery";
import { Contact } from "./homeSections/Contact";
import { Corsi } from "./homeSections/Corsi";

export default function Home() {
  return (
    <main>
      <Header button={buttons[2]} />
      <Corsi />
      <Gallery />
      <Contact heading="Contattaci" />
    </main>
  );
}
