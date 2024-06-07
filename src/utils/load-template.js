const fs = require("fs");

const getTemplateFile = (page) =>
  fs.readFileSync(`${__dirname}/../pages${page}.html`, "utf8");

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

const replaceSubTemplates = (currentTemplate, subTemplates = []) => {
  const replacer = (updatedTemplate, subTemplate) => {
    return updatedTemplate.replace(
      `{%${subTemplate}%}`,
      loadTemplate(`/${subTemplate}`)
    );
  };

  return subTemplates.reduce(replacer, currentTemplate);
};

const loadTemplate = (template, props = {}) => {
  const initialValue = getTemplateFile(template);
  const subTemplates = findSubTemplates(initialValue);
  console.log(subTemplates);
  const templateWithPropsReplaced = replaceProps(initialValue, props);
  const templateWithSubTemplateReplaced = replaceSubTemplates(
    templateWithPropsReplaced,
    subTemplates
  );

  return templateWithSubTemplateReplaced;
};

module.exports = { loadTemplate };
