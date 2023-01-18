import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BeakerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "@ninjha01/nitro-ui";

const navigation = [{ name: "Home", href: "#", current: true }];

const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Shell;

function Header() {
  return (
    <div className="bg-fuchsia-600 pb-32 dark:bg-fuchsia-800">
      <Disclosure
        as="nav"
        className="border-b border-fuchsia-300 border-opacity-25  bg-fuchsia-600 dark:bg-fuchsia-800 lg:border-none"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-fuchsia-400 lg:border-opacity-25">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <BeakerIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="hidden lg:ml-10 lg:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-fuchsia-700 text-white"
                              : "text-white hover:bg-fuchsia-500 hover:bg-opacity-75",
                            "rounded-md py-2 px-3 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-fuchsia-500 p-2 text-fuchsia-200 hover:bg-fuchsia-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-fuchsia-600">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-fuchsia-700 text-white"
                        : "text-white hover:bg-fuchsia-500 hover:bg-opacity-75",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Cas Tool
          </h1>
        </div>
      </header>
    </div>
  );
}
