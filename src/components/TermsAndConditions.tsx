import React, { useState } from "react";

export type TermsConfig = {
  terms: string;
};

const TermsAndConditions = ({ config }: { config: TermsConfig }) => {
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
    </div>
  );
};

export default TermsAndConditions;
