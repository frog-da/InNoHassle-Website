import ClarificationCard from "@/components/schedule/ClarificationCard";
import Arrow from "@/components/icons/Arrow";

export default function ClarificationContainer() {
  return (
    <div className="my-4 grid w-full grid-cols-1 place-items-center gap-y-10 lg:grid-cols-3 2xl:grid-cols-7">
      <ClarificationCard
        icon={
          <>
            <span className="icon-[material-symbols--table-chart-outline] text-5xl" />
            <span className="icon-[material-symbols--double-arrow] text-3xl" />
            <span className="icon-[material-symbols--data-object] text-5xl" />
          </>
        }
        title="Retrieval"
        shortDescription={`Parsers extract academic schedules from spreadsheets.`}
      />
      <Arrow />
      <ClarificationCard
        icon={<span className="icon-[ic--outline-settings-suggest] text-5xl" />}
        title="Processing"
        shortDescription={`The scripts generate .ics files for calendar apps`}
      />
      <Arrow className="lg:invisible lg:hidden 2xl:visible 2xl:flex" />
      <ClarificationCard
        icon={
          <span className="icon-[material-symbols--calendar-add-on-outline] text-5xl" />
        }
        title="Export"
        shortDescription={`You can export the schedule into your favorite calendar app!`}
      />
      <Arrow />
      <ClarificationCard
        icon={
          <span className="icon-[material-symbols--cloud-sync-outline] text-5xl" />
        }
        title="Synchronize"
        shortDescription={`Your calendar will update with schedule changes!`}
      />
    </div>
  );
}
