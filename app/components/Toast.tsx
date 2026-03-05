"use client";

function Toast({
  message,
  onClose,
  variant = "success",
}: {
  message: string;
  onClose: () => void;
  variant?: "success" | "warning";
}) {
  const bg = variant === "success" ? "bg-green-600" : "bg-amber-500";

  return (
    <div className={`fixed top-4 left-1/2 z-50 ${bg} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-toast-in`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 font-bold">×</button>
    </div>
  );
}

export default Toast;
