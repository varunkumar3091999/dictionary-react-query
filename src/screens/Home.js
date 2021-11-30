import { useRef, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

import { getWordData } from "../apis";

const Home = () => {
  const [word, setWord] = useState();
  const [language, setLanguage] = useState({
    label: "English(US)",
    value: "en_US",
  });
  const [wordData, setWordData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const query = useQuery(["apiParams", { word, language }], () =>
    getWordData({ word, language: language.value })
  );

  const inputRef = useRef(null);

  const options = [
    { label: "English(US)", value: "en_US" },
    { label: "English(UK)", value: "en_GB" },
    { label: "Hindi", value: "hi" },
    { label: "French", value: "fr" },
    { label: "Japanese", value: "ja" },
    { label: "Russian", value: "ru" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Korean", value: "ko" },
    { label: "Brazilian Portuguese", value: "pt-BR" },
    { label: "Arabic", value: "ar" },
    { label: "Turkish", value: "tr" },
  ];

  const formSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setWordData(query.data);
  };

  const clearForm = () => {
    setFormSubmitted(false);
    inputRef.current.value = "";
  };

  return (
    <div className="w-">
      <form
        onSubmit={(e) => formSubmit(e)}
        className="w-2/3 1sm:w-11/12 mx-auto mt-10"
      >
        <div className="flex 1sm:flex-col">
          <input
            onChange={(e) => {
              setWord(e.target.value);
              setFormSubmitted(false);
            }}
            required
            className="h-10 border-2 w-3/4 1sm:w-full focus:border-indigo-500"
            ref={inputRef}
          />
          {console.log(language)}
          <div className="w-1/4 mx-2 1sm:w-full 1sm:mx-0 1sm:mt-2">
            <Select
              options={options}
              onChange={(lang) => setLanguage(lang)}
              value={options[0]}
              required
              className="h-10"
              value={language}
            />
          </div>
        </div>
        <div className="my-5 flex justify-start">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-3 py-1 shadow-lg"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => clearForm()}
            className="mx-3 border px-3 py-1 shadow-lg text-indigo-500"
          >
            Clear
          </button>
        </div>
      </form>
      {formSubmitted && (
        <>
          {query.status === "success" ? (
            <>
              {wordData && (
                <div className="w-2/3 1sm:w-11/12 mx-auto">
                  <h3>Meanings</h3>
                  {wordData[0]?.meanings.map(
                    ({ partOfSpeech, definitions }) => (
                      <div>
                        <b>{partOfSpeech}</b>
                        {definitions.map((def) => (
                          <>
                            <div>~{def.definition}</div>
                            {def.example && <div>Ex: {def.example}</div>}
                          </>
                        ))}
                      </div>
                    )
                  )}
                  <div>
                    <b>Origin</b>
                    <p>{wordData[0]?.origin}</p>
                    <p className="text-center">***</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {query.status === "error" ? (
                <p>Error loading data.</p>
              ) : (
                <p>Loading</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
