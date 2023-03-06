import type { NextPage } from "next";
import { useRouter } from "next/router";
import Shell from "../components/Shell";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <FormNav />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <FormInput />
            <button
              className=" w-full rounded-xl border border-fuchsia-600 px-6 py-3 text-center text-fuchsia-600 transition duration-300 ease-in-out hover:bg-fuchsia-600 hover:text-white"
              onClick={() => {
                router.push("/results");
              }}
            >
              Find Targets
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Home;

import { useForm } from "react-hook-form";
function FormInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const GENES = ["ASCL1", "BDNF", "AHNAK2", "SERPINA1", "PRPF31"];
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      <select
                        {...register("Target Gene", { required: true })}
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                      >
                        {GENES.map((gene) => (
                          <option key={gene} value={gene}>
                            {gene}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Suppresion/Activation"
                        className="block text-sm font-medium leading-6 text-zinc-900"
                      >
                        Effect
                      </label>
                      <select
                        {...register("Suppresion/Activation", {
                          required: true,
                        })}
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                      >
                        <option value="Suppresion">Suppresion</option>
                        <option value="Activation">Activation</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Genome"
                        className="block text-sm font-medium leading-6 text-zinc-900"
                      >
                        Genome
                      </label>
                      <select
                        {...register("Genome", {
                          required: true,
                        })}
                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
                        disabled
                      >
                        <option value="Mouse">Suppresion</option>
                        <option value="Human">Activation</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-fuchsia-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
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
