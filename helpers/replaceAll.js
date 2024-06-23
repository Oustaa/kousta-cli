import { nameCapitalize } from "./nameCapitalize.js";
import { pluralize } from "./pluralize.js";

export const replaceAll = (text, name) => {
  const capitalizeName = nameCapitalize(name);
  const pluralName = pluralize(name);
  const capitalizePluralName = nameCapitalize(pluralName);
  return text
    .replaceAll("<% name %>", name)
    .replaceAll("<% Name %>", capitalizeName)
    .replaceAll("<% pluralName %>", pluralName)
    .replaceAll("<% PluralName %>", capitalizePluralName);
};

