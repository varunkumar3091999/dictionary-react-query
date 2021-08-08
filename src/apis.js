import axios from "axios";
export const getWordData = async ({word, language}) => {
  const res = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`
  );
	console.log(word, language)
  return res.data;
};
