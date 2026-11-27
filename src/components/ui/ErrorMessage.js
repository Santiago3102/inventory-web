/** Error box with an optional retry button. */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="form-error m-3 d-flex align-items-center gap-3" role="alert">
      <span>{message}</span>
      {onRetry && (
        <button type="button" className="btn btn-line ms-auto" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}