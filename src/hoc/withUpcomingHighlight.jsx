const withUpcomingHighlight = (Component) => {
  return (props) => {
    const isUpcoming = new Date(props.job.date) > new Date();

    return (
      <div
        className={`${
          isUpcoming
            ? "bg-green-50 border border-green-500 rounded-2xl p-2"
            : ""
        }`}
      >
        {isUpcoming && (
          <p className="text-green-600 text-xs font-bold mb-2">
            🚀 Upcoming
          </p>
        )}

        <Component {...props} isUpcoming={isUpcoming} />
      </div>
    );
  };
};

export default withUpcomingHighlight;