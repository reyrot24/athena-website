import Image from "next/image";

// Eseguito prima che l'overlay venga disegnato: alle visite successive della
// sessione l'intro non compare nemmeno per un frame. Il data-attribute arriva
// dopo che tutte le animazioni d'entrata della hero sono concluse.
const script = `try{var d=document.documentElement;if(sessionStorage.getItem("athena-intro")){d.dataset.intro="seen"}else{sessionStorage.setItem("athena-intro","1");setTimeout(function(){d.dataset.intro="seen"},3600)}}catch(e){document.documentElement.dataset.intro="seen"}`;

export function IntroSplash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div aria-hidden className="intro-splash">
        <div className="flex flex-col items-center">
          <div className="intro-splash__logo relative size-36 sm:size-44">
            <Image src="/logo.png" alt="" fill sizes="176px" className="scale-[1.8] object-contain" />
          </div>
          <p className="intro-splash__word heading-display mt-1 text-5xl sm:text-6xl">
            We are <span className="txt-gradient">Athena</span>
          </p>
          <span className="intro-splash__bar mt-5 block h-0.5 w-40 bg-brand" />
        </div>
      </div>
    </>
  );
}
