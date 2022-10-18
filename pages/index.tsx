import { Toggle } from "@ninjha01/nitro-ui";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="justify-content flex h-screen flex-col items-center p-24">
      <span className="text-4xl font-bold text-brand-400">Hello World</span>
      <Toggle checked={checked} onClick={() => setChecked(!checked)} />
    </div>
  );
};

export default Home;
