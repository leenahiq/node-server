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
  const regexp = /{% *([a-z\/]+) *%}/g;
  const findAllSubTemplate = [...template.matchAll(regexp)];
  const listOfSubTemplate = findAllSubTemplate.map((item) => item[1]);
  // console.log("listOfSubTemplate", listOfSubTemplate);
  return listOfSubTemplate;
};

const replaceProps = (currentTemplate, props = {}) => {
  const replacer = (updatedTemplate, property) => {
    return updatedTemplate.replace(`{{${property}}}`, props[property]);
  };
  return Object.keys(props).reduce(replacer, currentTemplate);
};

const replaceSubTemplates = (currentTemplate, subTemplates = []) => {
  const replacer = (updatedTemplate, subTemplate) => {
    return updatedTemplate.replace(
      `{%${subTemplate}%}`,
      loadPage(`/${subTemplate}`)
    );
  };

  return subTemplates.reduce(replacer, currentTemplate);
};

const loadTemplate = (template, props = {}) => {
  const initialValue = loadPage(template);
  const subTemplates = findSubTemplates(initialValue);
  const templateWithPropsReplaced = replaceProps(initialValue, props);
  const templateWithSubTemplateReplaced = replaceSubTemplates(
    templateWithPropsReplaced,
    subTemplates
  );

  return templateWithSubTemplateReplaced;
};

const getPage = (service, res) => {
  res.statusCode = 200;
  const main = loadTemplate(service, { date: "12-12-22" });
  const pageContent = loadTemplate("/template", {
    main,
    title: capitiliseTitleOfPage(service),
  });

  res.end(pageContent);
};

const isPageExist = (url) => {
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
