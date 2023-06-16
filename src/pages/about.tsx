import {
  BugAntIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Shell from "../components/Shell";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const About: NextPage = () => {
  return (
    <Shell>
      <div className="isolate rounded-xl bg-white px-6 py-16 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About
          </h2>
          <section className="mt-8 px-4 text-justify text-lg leading-8 text-gray-600 prose-a:font-semibold prose-a:text-brand-800 prose-a:hover:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {aboutText}
            </ReactMarkdown>
          </section>
        </div>
      </div>
    </Shell>
  );
};

const aboutText = `We designed a spacer design tool that allows users to retrieve genome-wide activation and suppression guides for nuclease inactivated dCasMINI. [(Xu et al., 2021)](https://www.cell.com/molecular-cell/pdfExtended/S1097-2765(21)00648-1) This tool should facilitate epigenetic modulation studies involving dCasMINI (or other dCas molecules recognizing TTTR PAMs) by computing genome-wide activation/suppression guides that can be queried by users based on gene IDs. Compared to dCas9, dCasMINI is a fraction of the size, facilitating therapeutic delivery across both in vivo and ex vivo delivery vehicles (i.e. AAV, LNP, lentivirus/retrovirus), and has a favorable off-target profile, resulting in a reduction of undesired gene targeting events.. [(Xin et al., 2022)](https://www.nature.com/articles/s41467-022-33346-1#article-info)`;
export default About;
