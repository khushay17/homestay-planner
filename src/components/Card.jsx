export default function Card({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="mb-4">{icon}</div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}