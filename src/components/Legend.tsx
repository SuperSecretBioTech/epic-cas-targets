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
        "rounded-box collapse w-full max-w-xl max-w-lg border border-base-300 bg-white px-6",
        open ? "collapse-open" : "collapse-close"
      )}
    >
      <div
        className={classNames(
          "collapse-title flex w-full justify-between text-xl font-medium",
          open && "-mb-6"
        )}
      >
        Legend
        <button
          type="button"
          className="btn-outline btn-xs btn -mr-8 self-end"
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
          className="flex w-full flex-col items-start justify-between rounded-xl bg-white py-6 text-start "
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
