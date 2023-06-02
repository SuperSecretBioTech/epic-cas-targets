import {
  BugAntIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { NextPage } from "next";
import Shell from "../components/Shell";

const About: NextPage = () => {
  return (
    <Shell>
      <div className="isolate rounded-xl bg-white px-6 py-16 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {`We designed a spacer design
            tool that allows users to retrieve genome-wide activation and
            suppression guides for nuclease inactivated dCas-Mini (Xu et al., 2021).`}
          </p>
        </div>
      </div>
    </Shell>
  );
};
export default About;
