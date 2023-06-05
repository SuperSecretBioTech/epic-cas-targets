import React, { useState } from "react";

export type TermsConfig = {
  terms: string;
};

const TermsAndConditions = ({ config }: { config: TermsConfig }) => {
  return (
    <div className="flex flex-col items-center space-x-4 rounded-xl bg-white p-6">
      <h1 className="my-8 font-serif text-4xl font-semibold text-zinc-600">
        Terms and Conditions
      </h1>
      <div className="flex-1">
        <div className="whitespace-pre-line p-4 font-serif text-gray-700">
          {config.terms}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
