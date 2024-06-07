const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const capitaliseTitleOfPage = (service) =>
  service
    .split("/")
    .filter((item) => item)
    .map(capitalise)
    .join(" - ");

module.exports = { capitalise, capitaliseTitleOfPage };
