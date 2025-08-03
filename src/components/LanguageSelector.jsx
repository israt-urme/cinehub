import React from 'react';

const languages = [
    {code: "en", lang: "English"},
    {code: "se", lang: "Svenska"},
]

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);

    const changeLanguage = (languageCode) => {
        setSelectedLanguage(languageCode);
    }

    return <div className="flex justify-end text-center text-white">
        <select
            value={selectedLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg block p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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