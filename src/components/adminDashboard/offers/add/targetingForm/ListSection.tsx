export default function ListSection({
  type,
  items,
  onRemove,
}: {
  type: "included" | "excluded";
  items: string[];
  onRemove: (value: string, from: "included" | "excluded") => void;
}) {
  const styles = "text-gray-700 border-gray-400 bg-gray-50 border-gray-200";

  return (
    <div>
      <h3
        className={`font-semibold border bg-white rounded-t-lg p-1 w-[200px] ${styles}`}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)} ({items.length})
      </h3>
      <div className="w-[200px]">
        {items.length === 0
          ? ""
          : items.map((item) => (
              <div
                key={item}
                className={`flex text-xs justify-between items-center px-1 py-1 border-b-none border border-gray-200 ${styles}`}
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => onRemove(item, type)}
                  className="text-gray-600 text-xl font-bold hover:text-gray-800"
                >
                  ×
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
