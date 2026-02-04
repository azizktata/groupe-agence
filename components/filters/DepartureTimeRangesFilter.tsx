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
  { key: "morning", label: "Matin", hours: "06:00 – 12:00" },
  { key: "afternoon", label: "Après-midi", hours: "12:00 – 18:00" },
  { key: "evening", label: "Soir", hours: "18:00 – 22:00" },
  { key: "night", label: "Nuit", hours: "22:00 – 06:00" },
] as const;

export function DepartureTimeRangesFilter({
  value,
  onChange,
}: DepartureTimeRangesFilterProps) {
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
        Heure de départ
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
            {range.label}
          </div>

          <span className="text-xs text-slate-400">
            {range.hours}
          </span>
        </label>
      ))}
    </div>
  );
}
