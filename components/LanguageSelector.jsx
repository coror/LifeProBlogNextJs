import React from 'react';

const LanguageSelector = ({ currentLanguage, onChangeLanguage }) => {
  return (
    <select
      value={currentLanguage}
      onChange={(e) => onChangeLanguage(e.target.value)}
    >
      <option value='en-US'>EN</option>
      <option value='de'>DE</option>
    </select>
  );
};

export default LanguageSelector;
