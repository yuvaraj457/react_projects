import React from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

// import App from './App';
import reportWebVitals from './reportWebVitals';

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to React and react-i18next"
        }
      },
      tn : {
        translation: {
          "welcome": "Tamil"
        }
      }
    },
    fallbackLng: "en",
    detection: {
      order : ['htmlTag', 'cookie', 'localStorage', 'sessionStorage', 'path', 'subdomain'],
      caches : ['cookie']
    },

  })

const App = () => {
  const {t} = useTranslation()
  return t('welcome')
}

ReactDOM.render(
    <App />
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
