"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import ReportIcon from "@mui/icons-material/Report";
import { reportedUrlApi } from "@/lib/api-client";

function RecipeCardError({ url }: { url: string }) {
  const [isReported, setIsReported] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [error, setError] = useState("");

  const handleReportUrl = async () => {
    setIsReporting(true);
    setError("");

    try {
      await reportedUrlApi.report(url);
      setIsReported(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to report URL. Please try again."
      );
      console.error("Error reporting URL:", err);
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="bg-tertiary text-black sm:mx-40 pt-4 pb-4 rounded-lg border-2 border-black pr-4 pl-4 mt-8 mr-4 ml-4">
      <h2 className="text-lg pb-4">
        The provided URL ({url}) is not supported
      </h2>
      <p className="pb-4">
        Please verify the provided URL or try a different one.
      </p>

      <div className="mt-4">
        {isReported ? (
          <p className="text-green-700 font-semibold">
            ✓ URL reported successfully. Thank you for helping us improve!
          </p>
        ) : (
          <>
            <Button
              variant="contained"
              color="warning"
              onClick={handleReportUrl}
              disabled={isReporting}
              startIcon={<ReportIcon />}
            >
              {isReporting ? "Reporting..." : "Report Unsupported URL"}
            </Button>
            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default RecipeCardError;
