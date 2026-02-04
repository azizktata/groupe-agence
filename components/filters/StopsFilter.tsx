type StopsFilterProps = {
  availableStops: number[];
  selectedStops: number[];
  onChange: (stops: number[]) => void;
};

export function StopsFilter({
  availableStops,
  selectedStops,
  onChange,
}: StopsFilterProps) {
  function toggleStop(stop: number) {
    if (selectedStops.includes(stop)) {
      onChange(selectedStops.filter((s) => s !== stop));
    } else {
      onChange([...selectedStops, stop]);
    }
  }

  function label(stop: number) {
    if (stop === 0) return "Sans escale";
    if (stop === 1) return "1 escale";
    return `${stop} escales`;
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase">
        Escales
      </p>

      {availableStops.map((stop) => (
        <label
          key={stop}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedStops.includes(stop)}
            onChange={() => toggleStop(stop)}
            className="text-white"
          />
          {label(stop)}
        </label>
      ))}
    </div>
  );
}
