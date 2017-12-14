import T from 'i18n-react';


let currentLang = '';
export const defaultLanguage = 'he';


const languages = {
  'en': require('../locale/en.yml'),
  'he': require('../locale/he.yml')
};


/**
 * @param {string} lang Language
 */
export function setLanguage(lang) {
  if (!(lang in languages)) {
    lang = defaultLanguage;
  }
  currentLang = lang;
  T.setTexts(Object.assign({}, languages[defaultLanguage], languages[lang]));
}

export const getLanguage = () => currentLang;
