import { useTranslations } from "next-intl";
type PriceFilterProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
};

export function PriceFilter({
  min,
  max,
  value,
  onChange,
}: PriceFilterProps) {
  const t = useTranslations("filters");
  const [from, to] = value;

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-slate-500 uppercase">
        {t("price")}
      </p>

      <div className="flex items-center justify-between text-sm font-medium">
        <span>{from}</span>
        <span>{to}</span>
      </div>

      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          value={from}
          onChange={(e) =>
            onChange([
              Math.min(Number(e.target.value), to - 1),
              to,
            ])
          }
          className="w-full text-gray-100"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={to}
          onChange={(e) =>
            onChange([
              from,
              Math.max(Number(e.target.value), from + 1),
            ])
          }
          className="w-full text-gray-100"
        />
      </div>
    </div>
  );
}
