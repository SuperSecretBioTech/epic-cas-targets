import { Combobox } from "@ninjha01/nitro-ui";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Shell from "../components/Shell";
import TermsAndConditions from "../components/TermsAndConditions";
import { GENES } from "../data/genes";
import { useLocalStorage } from "../hooks/useLocalstorage";

const Home: NextPage = () => {
  const [accepted, setAccepted] = useLocalStorage<boolean>(
    "terms_accepted",
    false
  );
  const termsConfig = {
    terms: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada venenatis ex, sit amet aliquam mauris fringilla ultrices. Integer consectetur vitae neque vitae malesuada. In malesuada arcu sem, a aliquet felis lacinia eu. Sed molestie dolor in blandit feugiat. Aliquam sit amet lorem dapibus, ullamcorper urna volutpat, faucibus quam. Curabitur non eros lacus. Maecenas neque ipsum, euismod in nibh consequat, sodales lobortis dui. Sed eget elit ligula. Nullam hendrerit eget velit id viverra.

Duis eu lacus dui. In posuere leo ut fringilla ornare. Proin a bibendum massa. Maecenas varius dui erat, in ultricies metus pharetra sed. Aenean vulputate id orci at varius. Donec vel volutpat ipsum. Praesent commodo condimentum purus id convallis. Pellentesque fringilla sagittis finibus. Cras volutpat nulla quis odio pharetra condimentum. Praesent pharetra ex at sapien luctus consequat. Donec eu nisi nunc. Cras tincidunt sagittis aliquet. Phasellus eros ante, facilisis sed imperdiet hendrerit, mattis sit amet velit. Suspendisse nec egestas nibh. Cras vehicula augue massa, ut blandit orci blandit eget. Cras aliquet congue quam eget vulputate.

Donec accumsan imperdiet ligula, sit amet volutpat erat dignissim quis. Sed bibendum diam ut nibh tincidunt, pharetra semper leo pellentesque. Etiam lectus quam, ultricies et lectus ut, fermentum vulputate nibh. Morbi sed nulla libero. Fusce eget diam eu tellus eleifend bibendum. In venenatis malesuada diam, vel faucibus ipsum viverra a. Aenean a nibh at nunc vulputate molestie. Ut posuere neque metus, sit amet consequat tellus placerat a. Donec faucibus lacus ac justo sollicitudin, sit amet semper orci dapibus. Nullam ut augue congue, varius leo quis, sodales dolor. Curabitur ac lectus magna. Ut at ante sed elit euismod consectetur nec ac velit.

Etiam vel diam quis mauris convallis commodo et consectetur massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at diam vel libero dignissim eleifend vitae posuere tellus. Nulla fermentum mauris eget nulla pulvinar accumsan quis ac elit. Pellentesque mi metus, posuere et lorem ut, vulputate condimentum tellus. Curabitur nisl dolor, viverra sit amet faucibus sagittis, interdum nec tortor. Sed nibh augue, condimentum sit amet venenatis vitae, commodo at velit. Mauris magna massa, scelerisque nec sollicitudin pretium, condimentum non erat. Mauris ultrices vel turpis et ullamcorper. Cras viverra dapibus lectus at posuere. Cras consectetur augue sit amet nunc interdum scelerisque. Curabitur a viverra odio.

Praesent semper tortor vitae risus egestas posuere. Sed fermentum, tortor quis finibus pretium, est erat varius est, sed viverra urna metus sed lacus. Nam lorem nulla, ultricies quis luctus non, condimentum convallis metus. In eget sodales lacus. Morbi sollicitudin rhoncus justo eget luctus. Proin ultrices rhoncus nisl quis suscipit. Morbi ornare tortor neque, at laoreet risus lacinia ut.`,
    accepted,
  };
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12">
            {accepted ? (
              <FormInput />
            ) : (
              <TermsAndConditions
                config={termsConfig}
                setAccepted={setAccepted}
              />
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Home;

function FormInput() {
  const [selectedGene, setSelectedGene] = useState<(typeof GENES)[number]>(
    GENES[0]
  );
  const [selectedEffect, setSelectedEffect] = useState<
    "Suppression" | "Activation"
  >("Activation");
  const router = useRouter();
  const onSubmit = () => {
    router.push({
      pathname: `/on_target/${selectedGene}_${selectedEffect}`,
    });
  };
  let selectedOptionIdx = 0;
  if (selectedGene !== null) {
    const idx = GENES.indexOf(selectedGene);
    if (idx >= 0) {
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
              <p className="mt-1 text-sm text-brand-50">
                Use this tool to generate a list of gRNA spacer sequences
                against specific genes for dCasMini, according to desired
                transcriptional modulation (activation/suppression).
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
                      onSelect={(option) => {
                        setSelectedGene(option.id as (typeof GENES)[number]);
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
                      className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
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
                  className="inline-flex justify-center rounded-md bg-brand-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 focus-visible:outline disabled:cursor-not-allowed disabled:opacity-50"
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
