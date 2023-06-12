export default function camelCaseToPascal(camelCaseWord) {
  let separatedWords = camelCaseWord.replace(/([a-z])([A-Z])/g, "$1 $2");
  let pascalCasedWords = separatedWords
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return pascalCasedWords;
}
