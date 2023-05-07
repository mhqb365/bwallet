const EXPLORER =
  process.env.NODE_ENV === "development"
    ? "https://shasta.tronscan.org"
    : "https://tronscan.org";

export default EXPLORER;
