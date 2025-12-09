function formatFullDate(timestamp) {
  const date = new Date(timestamp);

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default formatFullDate