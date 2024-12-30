const { ESLintUtils } = require('@typescript-eslint/utils');
const { AST_NODE_TYPES } = require('@typescript-eslint/types');
const { parse } = require('@angular-eslint/template-parser');
const fs = require('fs');

const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

const usedProperties = new Map();

module.exports = createRule({
  name: 'no-used-public',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure public properties are used outside the class',
      recommended: 'error',
    },
    fixable: 'code',
    messages: {
      unusedProperty: 'Public property "{{name}}" is not used outside the class.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const key = context.filename.replace('.html', '').replace('.ts', '');
    const variables = usedProperties.has(key) ? usedProperties.get(key) : usedProperties.set(key, new Set()).get(key);
    return {
      'Program'(node){
        for(let variable of findAstVariables(node)){
          variables.add(variable);
        }
      },
      'ClassDeclaration'(node) {
        const isAngularComponent = node.decorators && node.decorators.some(decorator => decorator.expression.callee.name === 'Component');
        if (!isAngularComponent) return;
        const publicProperties = node.body.body.filter(
          member => member.type === AST_NODE_TYPES.PropertyDefinition
                 && (member.accessibility === 'public' || member.accessibility === undefined)
                 && member.decorators.length === 0
        );
        publicProperties.forEach(property => {

          const propertyName = property.key.name;
          const isUsed = variables.has(propertyName) || context.sourceCode.getScope(node).references.some(ref => ref.identifier.name === propertyName);

          if (!isUsed) {
            context.report({
              node: property,
              messageId: 'unusedProperty',
              data: { name: propertyName },
              fix: fixer => fixer.replaceTextRange([property.range[0], property.range[1]], `private ${propertyName}`)
            });
          }
        });
      },
    };
  }
});



function* traverseObject(obj, visited = new Set(), level = 0) {
  if (obj && typeof obj === 'object') {
      if (visited.has(obj)) {
          return;
      }
      visited.add(obj);

      for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
              yield { key, value: obj[key], level };
              yield* traverseObject(obj[key], visited, level + 1);
          }
      }
  }
}

function *findAstVariables(obj) {
  let searchZoneLevel = undefined;
  for (let { key, value, level } of traverseObject(obj)) {
    if(searchZoneLevel === undefined){
      if (key === 'ast') {
        searchZoneLevel = level;
      }
    }
    else{
      if(level <= searchZoneLevel){
        searchZoneLevel = undefined;
        if (key === 'ast') {
          searchZoneLevel = level;
        }
      } else if(key === 'name'){
        yield value;
      }
    }
  }
}


function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
      if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
              return;
          }
          seen.add(value);
      }
      return value;
  };
}

function getTemplate(templatePath) {
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  return parse(templateContent, { filePath: templatePath });
}