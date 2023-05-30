import {
  BugAntIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Shell from "../components/Shell";
const faqs = [
  {
    question: "What Cas molecules is this tool appropriate for?",
    answer:
      "Our spacer design tool is appropriate for Cas molecules recognizing TTTR PAMs such as dCas-Mini.",
  },
  {
    question: "What is the difference between activation and suppression guides?",
    answer:
      "Activation guides are located -1000bp/+200bp from the TSS and suppression guides are located -200bp/+1000bp from the TSS.",
  },
  {
    question: "Is this tool capable of designing guides against genomes other than human?",
    answer:
      "While we currently only support guide design against the human genome (hg38), we will shortly be releasing a Mus musculus database (mm10) to facilitate mouse studies.",
  },
  {
    question: "How are off-targets computed?",
    answer:
      "20bp spacer sequences were sensitively mapped genome-wide using bowtie2 and then restricted to off-target sites containing TTTR within 5bp upstream of the spacer sequence (thus allowing for a single bp bulge). Final on-target spacer lists were sorted based on number of putative off-targets.",
  },
];
const FAQ: NextPage = () => {
  return (
    <Shell>
      <div className="rounded-xl bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Can’t find the answer you’re looking for? Reach out to our{" "}
                <a
                  href="#"
                  className="font-semibold text-brand-600 hover:text-brand-500"
                >
                  customer support
                </a>{" "}
                team.
              </p>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <dl className="space-y-10">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>{" "}
    </Shell>
  );
};
export default FAQ;
