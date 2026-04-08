export default function SpecialHeader({
  header,
  desc,
}: {
  header: string;
  desc?: string;
}) {
  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl md:text-3xl mb-8">{header}</h1>
      {desc && <p className="max-w-5xl m-auto">{desc}</p>}
    </div>
  );
}
