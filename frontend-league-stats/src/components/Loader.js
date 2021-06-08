const Loader = ({ full, size }) => {
  return full ? (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 7rem)",
        flexDirection: "column",
        gridColumn: "1 / 3",
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
