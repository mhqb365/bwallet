const TRON_NODE =
  process.env.NODE_ENV === "development"
    ? "https://api.shasta.trongrid.io"
    : "https://api.trongrid.io";

export default TRON_NODE;
