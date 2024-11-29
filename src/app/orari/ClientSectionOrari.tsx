"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { oraritypes } from "@/types/orari";

type Props = {
  response: oraritypes[];
};

const ClientSectionOrari = ({ response }: Props) => {
  const [corsoState, setCorsoState] = useState("Acrobatica");

  return (
    <div className="container mb-20">
      <div className="pb-14 gap-4 md:gap-2 text-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
        {response.map((corso, i) => (
          <h1
            key={i}
            className={`${
              corso.corso === corsoState
                ? "border-accentYellow"
                : "border-transparent"
            } text-base md:text-xl flex justify-center items-center border-[1px] hover:border-accentYellow px-4 py-2 w-full  text-center  cursor-pointer`}
            onClick={() => setCorsoState(corso.corso)}
          >
            {corso.corso}
          </h1>
        ))}
      </div>
      <div>
        {response.map(
          (corso, i) =>
            corso.corso === corsoState && (
              <div key={i} className="flex flex-col">
                {/* Lunedì */}
                {corso.lunedi !== null && (
                  <>
                    <div className="border-[0.5px] border-accentYellow" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-xl sm:text-2xl  py-8 flex flex-col items-center gap-8 "
                    >
                      <h1 className="font-bold text-accentYellow ">Lunedì</h1>
                      <div className="flex flex-col items-left md:items-center gap-4">
                        {corso.lunedi.map(
                          (ora, i) =>
                            ora != null && (
                              <h1 key={i} className="px-8">
                                {ora}
                              </h1>
                            )
                        )}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Martedì */}
                {corso.martedi !== null && (
                  <>
                    <div className="border-[0.5px] border-accentYellow" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-xl sm:text-2xl  py-8 flex flex-col items-center gap-8 "
                    >
                      <h1 className="font-bold text-accentYellow ">Martedì</h1>
                      <div className="flex flex-col flex-wrap items-left md:items-center gap-4">
                        {corso.martedi.map((ora, i) => (
                          <h1 key={i} className="px-8">
                            {ora}
                          </h1>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Mercoledì */}
                {corso.mercoledi !== null && (
                  <>
                    <div className="border-[0.5px] border-accentYellow" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-xl sm:text-2xl  py-8 flex flex-col items-center gap-8 "
                    >
                      <h1 className="font-bold text-accentYellow ">
                        Mercoledì
                      </h1>
                      <div className="flex flex-col items-left md:items-center gap-4">
                        {corso.mercoledi.map((ora, i) => (
                          <h1 key={i} className="px-8">
                            {ora}
                          </h1>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Giovedì */}
                {corso.giovedi !== null && (
                  <>
                    <div className="border-[0.5px] border-accentYellow" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-xl sm:text-2xl  py-8 flex flex-col items-center gap-8 "
                    >
                      <h1 className="font-bold text-accentYellow ">Giovedì</h1>

                      <div className="flex flex-col items-left md:items-center gap-4">
                        {corso.giovedi.map((ora, i) => (
                          <h1 key={i} className="px-8">
                            {ora}
                          </h1>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Venerdì */}
                {corso.venerdi !== null && (
                  <>
                    <div className="border-[0.5px] border-accentYellow" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-xl sm:text-2xl  py-8 flex flex-col items-center gap-8 "
                    >
                      <h1 className="font-bold text-accentYellow ">Venerdì</h1>
                      <div className="flex flex-col items-left md:items-center gap-4">
                        {corso.venerdi.map((ora, i) => (
                          <h1 key={i} className="px-8">
                            {ora}
                          </h1>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Sabato */}
                {corso.sabato !== null && (
                  <>
                    <div className="border-[0.5px] border-accentYellow" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-xl sm:text-2xl  py-8 flex flex-col items-center gap-8 "
                    >
                      <h1 className="font-bold text-accentYellow ">Sabato</h1>
                      <div className="flex flex-col items-left md:items-center gap-4">
                        {corso.sabato.map((ora, i) => (
                          <h1 key={i} className="px-8">
                            {ora}
                          </h1>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Domenica */}
                {corso.domenica !== null && (
                  <>
                    <div className="border-[0.5px] border-accentYellow" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-xl sm:text-2xl  py-8 flex flex-col items-center gap-8 "
                    >
                      <h1 className="font-bold text-accentYellow">Domenica</h1>
                      <div className="flex flex-col items-left md:items-center gap-4">
                        {corso.domenica.map((ora, i) => (
                          <h1 key={i} className="px-8">
                            {ora}
                          </h1>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                <div className="border-[0.5px] border-accentYellow" />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ClientSectionOrari;
