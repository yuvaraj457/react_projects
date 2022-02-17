import React from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend';
import App from './App';
import reportWebVitals from './reportWebVitals';


i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order : [ 'htmlTag', 'cookie',  'localStorage', 'sessionStorage', 'path', 'subdomain'],
      caches : ['cookie']
    },
    backend: {
      loadPath : '/assets/locales/{{lng}}/transulation.json'
    },
    react : {useSuspense : false}
  })


ReactDOM.render(
    <App />
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
