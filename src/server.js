const http = require("http");
const fs = require("fs");

const loadPage = (page) =>
  fs.readFileSync(`${__dirname}/pages${page}.html`, "utf8");

const capitilise = (word) => word.charAt(0).toUpperCase() + word.slice(1);
const capitiliseTitleOfPage = (service) =>
  service
    .split("/")
    .filter((item) => item)
    .map(capitilise)
    .join(" - ");

const findSubTemplates = (template) => {
  //wait for some magic to happen
  // regex
  return ["nav", "copyright"];
};

const replaceProps = (currentTemplate, props = {}) => {
  const replacer = (updatedTemplate, property) =>
    updatedTemplate.replace(`{{${property}}}`, props[property]);

  return Object.keys(props).reduce(replacer, currentTemplate);
};

const replaceSubTemplates = (currentTemplate, subTemplates = []) => {
  return currentTemplate;
};

const loadTemplate = (template, props = {}) => {
  const initialValue = loadPage(template);
  const subTemplates = findSubTemplates(initialValue);
  console.log(subTemplates);
  const templateWithPropsReplaced = replaceProps(props, initialValue);
  const templateWithSubTemplateReplaced = replaceSubTemplates(
    subTemplates,
    templateWithPropsReplaced
  );
  return templateWithSubTemplateReplaced;
};

const getPage = (service, res) => {
  res.statusCode = 200;
  const main = loadTemplate(service, { date: "12-12-22" });

  // const subNav = service.includes("news") ? loadTemplate("/nav") : "";
  // const nav = loadTemplate("./nav");
  const pageContent = loadTemplate("/template", {
    main,
    title: capitiliseTitleOfPage(service),
  });
  // console.log(3, pageContent);
  res.end(pageContent);
};

const isPageExist = (url) => {
  // look in pages folder if matching file exist
  return fs.existsSync(`${__dirname}/pages${url}.html`);
};

const defaultPage = (req, res) => {
  const page = req.url === "/" ? "/index" : req.url;

  if (isPageExist(page)) {
    return getPage(page, res);
  }
  res.statusCode = 404;
  res.end("Not found");
};

const server = http.createServer(defaultPage);

module.exports = { server };
// ToDo
// Make sub menu to news
