import { useTranslations } from "next-intl";
type DepartureTimeRanges = {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  night: boolean;
};

type DepartureTimeRangesFilterProps = {
  value: DepartureTimeRanges;
  onChange: (value: DepartureTimeRanges) => void;
};

const TIME_RANGES = [
  { key: "morning" },
  { key: "afternoon" },
  { key: "evening" },
  { key: "night" },
] as const;

export function DepartureTimeRangesFilter({
  value,
  onChange,
}: DepartureTimeRangesFilterProps) {
  const t = useTranslations("filters");

  function toggle(
    key: keyof DepartureTimeRanges
  ) {
    onChange({
      ...value,
      [key]: !value[key],
    });
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase">
        {t("departureTime")}
      </p>

      {TIME_RANGES.map((range) => (
        <label
          key={range.key}
          className="flex items-center justify-between gap-3 text-sm cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value[range.key]}
              onChange={() => toggle(range.key)}
              className="text-white"
            />
            {t(range.key)}
          </div>

          <span className="text-xs text-slate-400">
            {t(`${range.key}Range`)}
          </span>
        </label>
      ))}
    </div>
  );
}
