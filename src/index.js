import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import "./style/font-awesome.css";
import "./style/index.css";

console.info('Version:',
  process.env.REACT_APP_VISUAL_EDITOR_GIT_BRANCH,
  process.env.REACT_APP_VISUAL_EDITOR_GIT_REVISION,
);
console.info('REACT_APP_EDITOR_BASENAME:', process.env.REACT_APP_EDITOR_BASENAME)
console.info('REACT_APP_MILLER_CLIENT_ID:', process.env.REACT_APP_MILLER_CLIENT_ID)
console.info('REACT_APP_DOCUMENT_SCHEMA:', process.env.REACT_APP_DOCUMENT_SCHEMA)

console.info('REACT_APP_FRONTEND_URL:', process.env.REACT_APP_FRONTEND_URL)

console.info('REACT_APP_TAG_THEME_PK:', process.env.REACT_APP_TAG_THEME_PK)
console.info('REACT_APP_TAG_CHAPTER_PK:', process.env.REACT_APP_TAG_CHAPTER_PK)
console.info('REACT_APP_TAG_EDUCATION_PK:', process.env.REACT_APP_TAG_EDUCATION_PK)
console.info('REACT_APP_DOCUMENT_SCHEMA:', process.env.REACT_APP_DOCUMENT_SCHEMA)
console.info('REACT_APP_LANGUAGES:', process.env.REACT_APP_LANGUAGES)
console.info('REACT_APP_DEFAULT_LANGUAGE:', process.env.REACT_APP_DEFAULT_LANGUAGE)
console.info('REACT_APP_MILLER_CLIENT_ID:', process.env.REACT_APP_MILLER_CLIENT_ID)

console.info('REACT_APP_CONTENT_ACCEPTED_FILES:', process.env.REACT_APP_CONTENT_ACCEPTED_FILES)
console.info('REACT_APP_CONTENT_MAX_SIZE:', process.env.REACT_APP_CONTENT_MAX_SIZE)
console.info('REACT_APP_PREVIEW_ACCEPTED_FILES:', process.env.REACT_APP_PREVIEW_ACCEPTED_FILES)
console.info('REACT_APP_PREVIEW_MAX_SIZE:', process.env.REACT_APP_PREVIEW_MAX_SIZE)

console.info('REACT_APP_MAPBOX_STYLE_URL:', process.env.REACT_APP_MAPBOX_STYLE_URL)
console.info('REACT_APP_MAPBOX_ACCESS_TOKEN:', process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)

console.info('REACT_APP_BACKGROUND_COLORS_PALETTE:', process.env.REACT_APP_BACKGROUND_COLORS_PALETTE)
console.info('REACT_APP_TEXT_COLORS_PALETTE:', process.env.REACT_APP_TEXT_COLORS_PALETTE)

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
