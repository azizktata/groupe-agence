import { useTranslations } from "next-intl";
type CabinsFilterProps = {
  cabins: string[];
  selected: string[];
  onChange: (cabins: string[]) => void;
};

export function CabinsFilter({
  cabins,
  selected,
  onChange,
}: CabinsFilterProps) {
  const t = useTranslations("filters");
  const tcab = useTranslations("cabins");

  function toggle(cabin: string) {
    if (selected.includes(cabin)) {
      onChange(selected.filter((c) => c !== cabin));
    } else {
      onChange([...selected, cabin]);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase">
        Classe cabine
      </p>

      {cabins.map((cabin) => (
        <label
          key={cabin}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(cabin)}
            onChange={() => toggle(cabin)}
            className="text-white"
          />
          {tcab(cabin)}
        </label>
      ))}
    </div>
  );
}
