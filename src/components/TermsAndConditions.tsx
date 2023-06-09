import { classNames } from "@ninjha01/nitro-ui";
import terms from "../data/terms.md";

export type TermsConfig = {
  terms: string;
};

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col items-center space-x-4 rounded-xl bg-white pt-16 px-8">
      <Prose content={terms} />
    </div>
  );
};

export default TermsAndConditions;

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Prose = (props: { content: string }) => {
  const { content } = props;
  const aStyles = "prose-a:text-brand-800";
  const pStyles = "prose-p:text-noir-800";
  const hStyles =
    "prose-headings:text-noir-800 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base";
  const strongStyles = "prose-strong:text-noir-800 prose-strong:font-semibold";
  const liStyles = "prose-li:text-xl";
  return (
    <article
      className={classNames(
        "font-serif prose prose-slate prose-zinc h-full w-full md:prose-lg lg:prose-xl",
        aStyles,
        pStyles,
        hStyles,
        liStyles,
        strongStyles
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
};
