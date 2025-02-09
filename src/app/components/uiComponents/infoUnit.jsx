export default function InfoUnit({ heading, value }) {
  return (
    <div className="xl:col-span-2 lg:col-span-3 md:col-span-3 col-span-6 my-4">
      <p className="text-secondary text-sm font-extralight">{heading}</p>
      <h3 className="mt-2 text-medium text-xl overflow-hidden text-ellipsis">{value}</h3>
    </div>
  );
}
