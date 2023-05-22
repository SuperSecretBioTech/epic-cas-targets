import { Combobox } from "@ninjha01/nitro-ui";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Shell from "../components/Shell";
import { GENES } from "../data/genes";

const Home: NextPage = () => {
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <FormNav />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <FormInput />
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Home;

function FormInput() {
  const [selectedGene, setSelectedGene] = useState<string>(GENES[0]);
  const [selectedEffect, setSelectedEffect] = useState<
    "Suppression" | "Activation"
  >("Activation");
  const router = useRouter();
  const onSubmit = () => {
    router.push({
      pathname: `/results/${selectedGene}_${selectedEffect}`,
    });
  };
  let selectedOptionIdx = 0;
  if (selectedGene !== null) {
    const idx = GENES.indexOf(selectedGene);
    if (idx >= 0) {
      console.debug("Setting selectedOptionIdx", idx);
      selectedOptionIdx = idx;
    } else {
      throw new Error("Invalid selectedGene");
    }
  }

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-zinc-50">
                Search Terms
              </h3>
              <p className="mt-1 text-sm text-fuchsia-50">
                This is a web tool for selecting target sites for CRISPR/CasMini
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="Target Gene"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Target Gene
                    </label>

                    <Combobox
                      options={GENES.map((gene) => ({
                        id: gene,
                        label: gene,
                      }))}
                      onSelect={(option: { id: string; label: string }) => {
                        setSelectedGene(option.id);
                      }}
                      selectedOptionIdx={selectedOptionIdx}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="Suppression/Activation"
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Effect
                    </label>
                    <select
                      className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        setSelectedEffect(
                          e.target.value as "Suppression" | "Activation"
                        );
                      }}
                      defaultValue="Activation"
                    >
                      <option value="Activation">Activation</option>
                      <option value="Suppression">Suppression</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 px-4 py-3 text-right sm:px-6">
                <button
                  className="inline-flex justify-center rounded-md bg-fuchsia-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={onSubmit}
                >
                  Find Target Sites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-zinc-200" />
        </div>
      </div>
    </>
  );
}

function FormNav() {
  return (
    <div className="rounded-lg bg-white px-5 py-6 shadow dark:bg-zinc-600 sm:px-6 ">
      <div className="grid h-96 content-center rounded-lg border-4 border-dashed border-zinc-200">
        <h1 className="text-center text-3xl font-semibold text-zinc-300">
          Form Navigation
        </h1>
      </div>
    </div>
  );
}
