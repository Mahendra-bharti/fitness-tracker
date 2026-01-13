export default function DisciplineCheckModal({ onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-80 text-center">
        <h2 className="text-white font-semibold text-lg">
          Daily Discipline Check
        </h2>

        <p className="text-zinc-400 text-sm mt-2">
          Did you maintain self-control today?
        </p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onConfirm(true)}
            className="flex-1 bg-green-600 py-2 rounded-lg"
          >
            Yes
          </button>

          <button
            onClick={() => onConfirm(false)}
            className="flex-1 bg-red-600 py-2 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
