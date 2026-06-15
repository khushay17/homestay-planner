export default function Card({
  icon,
  title,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
      {icon && <div className="mb-4">{icon}</div>}

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-slate-600">
        {description}
      </p>
    </div>
  );
}