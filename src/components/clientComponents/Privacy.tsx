"use client";
import React, { useEffect } from "react";

export const PrivacyPolicyLink: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      href="https://www.iubenda.com/privacy-policy/94168299"
      className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
      title="Privacy Policy"
      target="_blank" // Opens in a new tab
      rel="noopener noreferrer" // Security best practice
    >
      Privacy Policy
    </a>
  );
};

export const CookiePolicyLink: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      href="https://www.iubenda.com/privacy-policy/94168299/cookie-policy"
      className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
      title="Cookie Policy"
      target="_blank" // Opens in a new tab
      rel="noopener noreferrer" // Security best practice
    >
      Cookie Policy
    </a>
  );
};
