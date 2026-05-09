const LoadingSpinner = ({ label = "Loading projects..." }) => {
  return (
    <div className="spinner-shell" role="status" aria-live="polite">
      <div className="spinner-orbit" aria-hidden="true" />
      <p className="spinner-label">{label}</p>
    </div>
  );
};

export default LoadingSpinner;
