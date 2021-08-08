import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

import { getWordData } from "../apis";

const Home = () => {
  const [word, setWord] = useState();
  const [language, setLanguage] = useState('en_US');
  const [wordData, setWordData] = useState({});

  const query = useQuery(["apiParams", { word, language }], () =>
    getWordData({ word, language })
  );

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
    e.preventDefault()
    setWordData(query.data)
    console.log('here')
  }

  return (
    <div style={({ display: "flex" }, { width: "75vw" })}>
      <form onSubmit={(e) => formSubmit(e)}>
        <input onChange={(e) => setWord(e.target.value)} required/>
        <div style={{ width: "50%" }}>
          <Select
            options={options}
            onChange={(lang) => setLanguage(lang.value)}
            value={options[0]}
            required
          />
        </div>
        <button type="submit">Search</button>
        {console.log(wordData)}
      </form>
      {query.status === "success" ? (
        <>
          {wordData && (
            <div>
              <h3>Meanings</h3>
              {wordData[0]?.meanings.map(({ partOfSpeech, definitions }) => (
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
                <p>{wordData[0]?.origin}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Home;
