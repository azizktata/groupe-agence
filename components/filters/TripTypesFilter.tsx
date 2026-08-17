import { useTranslations } from "next-intl";
type TripTypesFilterProps = {
  value: {
    oneWay: boolean;
    roundTrip: boolean;
  };
  onChange: (value: {
    oneWay: boolean;
    roundTrip: boolean;
  }) => void;
};

export function TripTypesFilter({
  value,
  onChange,
}: TripTypesFilterProps) {
  function toggle(key: "oneWay" | "roundTrip") {
    onChange({
      ...value,
      [key]: !value[key],
    });
  }

  const t = useTranslations("filters");
  const tf = useTranslations("flightSearch");

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-500 uppercase">
        {t("tripType")}
      </p>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={value.oneWay}
          onChange={() => toggle("oneWay")}
         className="text-white"
        />
        {tf("oneWay")}
      </label>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={value.roundTrip}
          onChange={() => toggle("roundTrip")}
          className="text-white"
        />
        {tf("roundTrip")}
      </label>
    </div>
  );
}
