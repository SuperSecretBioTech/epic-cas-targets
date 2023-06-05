import React, { useState } from "react";

export type TermsConfig = {
  terms: string;
};

const TermsAndConditions = ({
  config,
  setAccepted,
}: {
  config: TermsConfig;
  setAccepted: (accepted: boolean) => void;
}) => {
  return (
    <div className="p-6 bg-white rounded-xl flex flex-col items-center space-x-4">
      <h1 className="text-4xl text-zinc-600 font-semibold font-serif my-8">
        Terms and Conditions
      </h1>
      <div className="flex-1">
        <div className="p-4 font-serif text-gray-700 whitespace-pre-line">
          {config.terms}
        </div>
      </div>
      <div className="flex items-center mt-4">
        <button
          className="btn btn-primary !text-white"
          onClick={() => {
            setAccepted(true);
          }}
        >
          I Accept the Terms and Conditions
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
