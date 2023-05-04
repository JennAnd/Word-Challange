import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import "./index.css";
import HiddenTitle from "./HiddenWordsFromArticle";
import HiddenWordsFromArticle from "./HiddenWordsFromArticle";

function App() {
  const [title, setTitle] = useState("");
  const [extract, setExtract] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [hiddenWords, setHiddenWords] = useState([]);
  const [handleGuess, setHandleGuess] = useState([]);

  const url =
    "https://sv.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&titles=Hajar";

  const getTitleAndExtract = (json) => {
    const { pages } = json.query;
    const page = pages[Object.keys(pages)[0]];
    return { title: page.title, extract: page.extract };
  };
  const getExtract = async () => {
    let resp;
    setLoading(true);
    try {
      resp = await fetch(url);
      const json = await resp.json();
      const { title, extract } = getTitleAndExtract(json);

      setTitle(title);
      setExtract(extract);
      /*  setExtract(parse(extract)); */
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExtract();
  }, []);

  if (loading) return "Loading...";
  if (error) return "There was a problem processing your request.";
  return (
    <div className="App">
      <div className="article">
        <HiddenWordsFromArticle title={title} hiddenWords={hiddenWords} />
        <div
          className="extract"
          dangerouslySetInnerHTML={{ __html: extract }}
        ></div>
      </div>
    </div>
  );
}

export default App;

//Jag vill göra en dangerouslySetInnerHtml i importerade hiddenTitle här eller i komponenten
