const fs = require("fs");

const getTemplateFile = (page, folder = "pages") => {
  return fs.readFileSync(`${__dirname}/../${folder}${page}.html`, "utf8");
};

const findSubTemplates = (template) => {
  const regexp = /{% *([a-z\/0-9]+) *%}/g;
  const findAllSubTemplate = [...template.matchAll(regexp)];
  const listOfSubTemplate = findAllSubTemplate.map((item) => item[1]);
  return listOfSubTemplate;
};

const replaceProps = (currentTemplate, props = {}) => {
  const replacer = (updatedTemplate, property) => {
    return updatedTemplate.replace(`{{${property}}}`, props[property]);
  };
  return Object.keys(props).reduce(replacer, currentTemplate);
};

const replaceSubTemplates = (currentTemplate, subTemplates = [], folder) => {
  const replacer = (updatedTemplate, subTemplate) => {
    return updatedTemplate.replace(
      `{%${subTemplate}%}`,
      loadTemplate(`/${subTemplate}`, {}, folder)
    );
  };

  return subTemplates.reduce(replacer, currentTemplate);
};

const loadTemplate = (template, props = {}, folder) => {
  const initialValue = getTemplateFile(template, folder);
  const subTemplates = findSubTemplates(initialValue);
  const templateWithPropsReplaced = replaceProps(initialValue, props);
  const templateWithSubTemplateReplaced = replaceSubTemplates(
    templateWithPropsReplaced,
    subTemplates,
    folder
  );

  return templateWithSubTemplateReplaced;
};

module.exports = { loadTemplate };
