export const pluralize = (word) => {
  if (typeof word !== "string" || word.length === 0) {
    throw new Error("Input must be a non-empty string");
  }

  const pluralRules = [
    { regex: /s$/i, replacement: "ses" }, // bus -> buses
    { regex: /([^aeiou])y$/i, replacement: "$1ies" }, // baby -> babies
    { regex: /(x|ch|sh)$/i, replacement: "$1es" }, // box -> boxes, church -> churches, bush -> bushes
    { regex: /f$/i, replacement: "ves" }, // leaf -> leaves
    { regex: /fe$/i, replacement: "ves" }, // knife -> knives
    { regex: /o$/i, replacement: "oes" }, // hero -> heroes
    { regex: /us$/i, replacement: "i" }, // cactus -> cacti
    { regex: /is$/i, replacement: "es" }, // analysis -> analyses
    { regex: /on$/i, replacement: "a" }, // phenomenon -> phenomena
  ];

  for (let rule of pluralRules) {
    if (rule.regex.test(word)) {
      return word.replace(rule.regex, rule.replacement);
    }
  }

  return word + "s";
};

