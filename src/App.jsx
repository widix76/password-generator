import React, { useState, useCallback, useEffect } from 'react';

    function App() {
      const [password, setPassword] = useState('');
      const [passwordLength, setPasswordLength] = useState(16);
      const [includeUppercase, setIncludeUppercase] = useState(true);
      const [includeLowercase, setIncludeLowercase] = useState(true);
      const [includeNumbers, setIncludeNumbers] = useState(true);

      const generatePassword = useCallback(() => {
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';

        let newPassword = '';
        for (let i = 0; i < passwordLength; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          newPassword += charset[randomIndex];
        }
        setPassword(newPassword);
      }, [passwordLength, includeUppercase, includeLowercase, includeNumbers]);

      useEffect(() => {
        generatePassword(); // Generate password on component mount and when settings change
      }, [generatePassword]);

      return (
        <div className="app">
          <h1>Password Creator</h1>
          <div className="password-display">{password}</div>
          <div className="settings-container">
            <div className="setting-row">
              <label>Password Length:</label>
              <div className="length-controls">
                <button
                  className="length-button"
                  onClick={() => setPasswordLength(Math.max(8, passwordLength - 1))}
                >
                  -
                </button>
                <div className="length-display">{passwordLength}</div>
                <button
                  className="length-button"
                  onClick={() => setPasswordLength(Math.min(64, passwordLength + 1))}
                >
                  +
                </button>
              </div>
            </div>
            <div className={`setting-row ${!includeUppercase ? 'disabled' : ''}`}>
              <label htmlFor="uppercase">Include Uppercase:</label>
              <input
                type="checkbox"
                id="uppercase"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
            </div>
            <div className={`setting-row ${!includeLowercase ? 'disabled' : ''}`}>
              <label htmlFor="lowercase">Include Lowercase:</label>
              <input
                type="checkbox"
                id="lowercase"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
            </div>
            <div className={`setting-row ${!includeNumbers ? 'disabled' : ''}`}>
              <label htmlFor="numbers">Include Numbers:</label>
              <input
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
            </div>
          </div>
        </div>
      );
    }

    export default App;
