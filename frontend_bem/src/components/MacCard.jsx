const MacCard = ({ children, custClass = "", headerActions = null }) => {
  return (
    <div className={`mx-auto ${custClass}`}>
      <section className="card-item">
        <div className="w-full">
          <div className="flex items-center justify-between h-10 border-b dark:border-brand-border_light bg-brand-mac_bar dark:bg-brand-mac_bar_dark rounded-t-xl">
            <div className="flex items-center">
              <button
                className="h-full pl-3 pr-1"
                title="Close"
                type="button"
              >
                <span className="w-[12px] h-[12px] flex items-center justify-center rounded-sm bg-brand-mac_close dark:bg-brand-mac_close_dark"></span>
              </button>
              <button
                className="h-full pl-1 pr-1"
                title="Minimize"
                type="button"
              >
                <span className="w-[12px] h-[12px] flex items-center justify-center rounded-sm bg-brand-mac_minimize dark:bg-brand-mac_minimize_dark"></span>
              </button>
              <button
                className="h-full pl-1 pr-2"
                title="Maximize"
                type="button"
              >
                <span className="w-[12px] h-[12px] flex items-center justify-center rounded-sm bg-brand-mac_maximize dark:bg-brand-mac_maximize_dark"></span>
              </button>
            </div>

            {headerActions && (
              <div className="flex items-center gap-2 pr-3">
                {headerActions}
              </div>
            )}
          </div>
          <div className="h-full p-4">{children}</div>
        </div>
      </section>
    </div>
  );
};

export default MacCard;
