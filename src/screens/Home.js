import { useRef, useState } from "react";
import Select from "react-select";

const Home = () => {
  const [word, setWord] = useState();
  const [language, setLanguage] = useState({
    label: "English(US)",
    value: "en_US",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [query, setQuery] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

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

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    setFormSubmitted(true);
    setLoading(true);

    try {
      await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${language.value}/${word}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.title === "No Definitions Found") {
            setError(data);
            setQuery({});
          } else {
            setError(null);
            setQuery(data);
          }
          setLoading(false);
        });
    } catch (err) {
      console.log("here");
      setError(err);
      setLoading(false);
    }
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
              setQuery(undefined);
              setError(undefined);
              setFormSubmitted(false);
            }}
            required
            className="h-10 border-2 w-3/4 1sm:w-full focus:border-indigo-500"
            onFocus={(e) => e.target.select()}
            ref={inputRef}
          />
          <div className="w-1/4 mx-2 1sm:w-full 1sm:mx-0 1sm:mt-2">
            <Select
              options={options}
              onChange={(lang) => setLanguage(lang)}
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
      <div className="w-2/3 1sm:w-11/12 mx-auto">
        {formSubmitted && (
          <div>
            {console.log(loading)}
            {loading && <p>Loading...</p>}
            {query?.length > 0 ? (
              <>
                {console.log(query)}
                {query && (
                  <div>
                    <h3>Meanings</h3>
                    {query[0]?.meanings.map(({ partOfSpeech, definitions }) => (
                      <div>
                        <b>{partOfSpeech}</b>
                        {definitions.map((def) => (
                          <>
                            <div>~{def.definition}</div>
                            {def.example && <div>Ex: {def.example}</div>}
                          </>
                        ))}
                      </div>
                    ))}
                    <div>
                      <b>Origin</b>
                      <p>{query[0]?.origin}</p>
                      <p className="text-center">***</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {console.log(error)}
                {error && <p>{error.message}</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
