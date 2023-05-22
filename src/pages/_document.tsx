import { classNames } from "@ninjha01/nitro-ui";
import { Html, Head, Main, NextScript } from "next/document";
import { useState } from "react";

export default function Document() {
  const [dark, setDark] = useState(false);
  return (
    <Html className={classNames(dark && "dark", "h-full")} data-theme="mytheme">
      <Head />
      <body className="h-full  bg-gray-100 dark:bg-zinc-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
