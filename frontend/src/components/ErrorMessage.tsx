import { type FieldError } from "react-hook-form";

interface ErrorMessageProps {
  error?: FieldError;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  return <p className="mt-2.5 text-sm text-red-600">{error.message}</p>;
}

export default ErrorMessage;
