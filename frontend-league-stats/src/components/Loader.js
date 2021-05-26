const Loader = ({ full, size }) => {
  return full ? (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 4rem)",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        className="league-stats-loader"
        style={{ height: size, width: size }}
      />
    </div>
  ) : (
    <div
      className="league-stats-loader"
      style={{ height: size, width: size }}
    />
  );
};

export default Loader;
