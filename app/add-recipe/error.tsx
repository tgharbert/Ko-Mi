"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center pt-40 text-tertiary">
      <h1 className="text-2xl font-bold mb-4">Failed to load recipe form</h1>
      <p className="mb-6 text-tertiary/70">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="bg-pop hover:bg-pop/80 text-tertiary rounded-md px-6 py-2 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
