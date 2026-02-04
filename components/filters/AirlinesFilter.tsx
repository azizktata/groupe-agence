type AirlinesFilterProps = {
  airlines: { code: string; name: string }[];
  selected: string[];
  onChange: (airlines: string[]) => void;
};

export function AirlinesFilter({
  airlines,
  selected,
  onChange,
}: AirlinesFilterProps) {
  function toggle(code: string) {
    if (selected.includes(code)) {
      onChange(selected.filter((c) => c !== code));
    } else {
      onChange([...selected, code]);
    }
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      <p className="text-xs font-semibold text-slate-500 uppercase">
        Compagnies
      </p>

      {airlines.map((airline) => (
        <label
          key={airline.code}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(airline.code)}
            onChange={() => toggle(airline.code)}
            className="text-white"
          />
          <span className="font-medium">{airline.name}</span>
          <span className="text-xs text-slate-400">
            ({airline.code})
          </span>
        </label>
      ))}
    </div>
  );
}
