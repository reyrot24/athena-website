"use client";
/* import { WorkflowIcon } from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion"; */

import "react-vertical-timeline-component/style.min.css";

type Props = {
  heading: string;
};

export type Blog41Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

/* const item = {
  initial: { opacity: 0, x: -150 },
  whileInView: { opacity: 1, x: 0 },
}; */

const SectionStoria = (props: Blog41Props) => {
  const {
    /* heading */
  } = {
    ...props,
  } as Props;

  return (
    <section className="mb-20 ">
      <h1 className="flex justify-start items-center mb-14 text-2xl font-bold text-text-alternative md:mb-20 md:text-3xl">
        LA NOSTRA STORIA
      </h1>
      <p className="description">
        Siamo un{" "}
        <span className="text-accentYellow">
          team di giovani professionisti
        </span>{" "}
        che, dopo aver acquisito competenze e esperienze significative fuori
        regione, ha scelto di tornare nel proprio paese per contribuire alla{" "}
        <span className="text-accentYellow">crescita dello sport</span> e{" "}
        <span className="text-accentYellow">dell’attività fisica</span>. Il
        nostro <span className="text-accentYellow">obiettivo</span> è quello di
        andare oltre le semplici pratiche sportive, creando un ambiente{" "}
        <span className="text-accentYellow">inclusivo</span> e{" "}
        <span className="text-accentYellow">stimolante</span>. Ci impegniamo a
        promuovere uno stile di vita attivo e sano, valorizzando l’importanza
        dello sport non solo come attività fisica, ma come mezzo per costruire{" "}
        <span className="text-accentYellow">comunità</span>, sviluppare
        competenze e favorire il{" "}
        <span className="text-accentYellow">benessere</span> mentale. Siamo
        aperti a collaborazioni con altre associazioni e istituzioni per
        ampliare la nostra offerta. Puntiamo all’{" "}
        <span className="text-accentYellow">innovazione</span>, utilizzando
        metodologie moderne e approcci personalizzati per coinvolgere e motivare
        i partecipanti. Siamo entusiasti di far crescere il nostro paese
        attraverso lo sport e l’attività fisica, e{" "}
        <span className="text-accentYellow">
          non vediamo l’ora di coinvolgere sempre più persone nel nostro
          progetto!
        </span>
      </p>
      {/* <div className="my-14 md:my-20 container">
        <VerticalTimeline animate={true} lineColor="#f6a14c">
          {array.map((element, i) =>
            i % 2 === 0 ? (
              <motion.div
                variants={item}
                initial="initial"
                whileInView="whileInView"
                transition={{ duration: 0.3, delay: i * 0.3 }}
                viewport={{ once: true }}
                key={i}
                className="mb-8"
              >
                <VerticalTimelineElement
                  key={i}
                  visible={true}
                  intersectionObserverProps={{
                    rootMargin: "100px 0px 100px 0px",
                  }}
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: "#000", color: "#f6a14c" }}
                  contentArrowStyle={{
                    borderRight: "7px solid #f6a14c",
                  }}
                  date={element.date}
                  iconStyle={{
                    background: "#f6a14c",
                    color: "#fff",
                  }}
                  icon={<WorkflowIcon />}
                >
                  <h3 className="text-white">{element.title}</h3>

                  <p className="text-white">{element.description}</p>
                </VerticalTimelineElement>
              </motion.div>
            ) : (
              <motion.div
                variants={item}
                initial="initial"
                whileInView="whileInView"
                transition={{ duration: 0.3, delay: i * 0.3 }}
                viewport={{ once: true }}
                key={i}
                className="mb-8"
              >
                <VerticalTimelineElement
                  key={i}
                  visible={true}
                  intersectionObserverProps={{
                    rootMargin: "100px 0px 100px 0px",
                  }}
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: "#000", color: "#f6a14c" }}
                  contentArrowStyle={{
                    borderRight: "7px solid #f6a14c",
                  }}
                  position="right"
                  date={element.date}
                  iconStyle={{
                    background: "#f6a14c",
                    color: "#fff",
                  }}
                  icon={<WorkflowIcon />}
                >
                  <h3 className="text-white">{element.title}</h3>

                  <p className="text-white">{element.description}</p>
                </VerticalTimelineElement>
              </motion.div>
            )
          )}
        </VerticalTimeline>
      </div> */}
    </section>
  );
};

export default SectionStoria;

/* const array = [
  {
    title: "Creative Director",
    place: "Miami, FL",
    description:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
    date: "2011 - present",
  },
  {
    title: "Creative Director",
    place: "Miami, FL",
    description:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
    date: "2011 - present",
  },
  {
    title: "Creative Director",
    place: "Miami, FL",
    description:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
    date: "2011 - present",
  },
  {
    title: "Creative Director",
    place: "Miami, FL",
    description:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
    date: "2011 - present",
  },
  {
    title: "Creative Director",
    place: "Miami, FL",
    description:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
    date: "2011 - present",
  },
]; */
