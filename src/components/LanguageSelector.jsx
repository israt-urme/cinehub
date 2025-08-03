import React from 'react';
import {useTranslation} from "react-i18next";

const languages = [
    {code: "en", lang: "English"},
    {code: "se", lang: "Svenska"},
]

const LanguageSelector = () => {
    const {i18n} = useTranslation();

    const selectLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
        // persist language: save data in a way that it remains available even after the app or browser is closed or refreshed
        localStorage.setItem('i18nextLng', languageCode);
    }

    return <div className="flex justify-end text-center text-white">
        <select
            // Sometimes, i18n.language could include a region (like en-US), to normalize use split
            value={i18n.language.split('-')[0]}
            onChange={(e) => selectLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg block p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select language"
        >
            {
                languages.map(lng => (
                    <option key={lng.code} value={lng.code}>
                        {lng.lang}
                    </option>
                ))
            }
        </select>
    </div>
}

export default LanguageSelector;