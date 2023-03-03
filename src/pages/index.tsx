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
          </div>
          <div className="col-span-12 lg:col-span-4">
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("Target GENE", { required: true })}>
        <option value="X">X</option>
        <option value="Y">Y</option>
        <option value="Z">Z</option>
      </select>
      <select {...register("Suppresion/Activation", { required: true })}>
        <option value="Suppresion">Suppresion</option>
        <option value="Activation">Activation</option>
      </select>

      <input type="submit" />
    </form>
  );
}

function FormNav() {
  return (
    <div className="rounded-lg bg-white px-5 py-6 shadow dark:bg-zinc-600 sm:px-6 ">
      <div className="grid h-96 content-center rounded-lg border-4 border-dashed border-gray-200">
        <h1 className="text-center text-3xl font-semibold text-zinc-300">
          Form Navigation
        </h1>
      </div>
    </div>
  );
}
