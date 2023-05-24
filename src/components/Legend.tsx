import { classNames } from "@ninjha01/nitro-ui";
import { useState } from "react";

export const Legend = ({
  columns,
}: {
  columns: { name: string; description: string }[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      tabIndex={0}
      onClick={() => setOpen(!open)}
      className={classNames(
        "collapse max-w-xl border border-base-300 bg-white rounded-box w-full max-w-lg px-6",
        open ? "collapse-open" : "collapse-close"
      )}
    >
      <div
        className={classNames(
          "collapse-title text-xl font-medium flex w-full justify-between",
          open && "-mb-6"
        )}
      >
        Legend
        <button
          type="button"
          className="btn btn-outline btn-xs self-end -mr-8"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? "▲" : "▼"}
        </button>
      </div>
      <div className="collapse-content">
        <span
          tabIndex={0}
          className="flex w-full flex-col items-start justify-between text-start rounded-xl bg-white py-6 "
        >
          {columns.map((col) => (
            <p key={`${col.name}`} className="text-sm text-zinc-700">
              <strong className="font-semibold">{col.name} </strong>:{" "}
              {col.description}
            </p>
          ))}
        </span>
      </div>
    </button>
  );
};
