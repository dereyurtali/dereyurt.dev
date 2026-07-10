'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="label mt-2 cursor-pointer border border-line-2 px-4 py-2 transition-colors hover:border-signal hover:text-signal print:hidden"
    >
      PRINT / SAVE PDF
    </button>
  );
}
