import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$^&*-_+=[]{}~`";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassworToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
    alert("Password copied to clipboard");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-950 to-purple-900">
      <div className="w-full max-w-md mx-auto backdrop-blur-xl bg-white/10 shadow-lg rounded-lg p-6 text-white border border-white/20">
        <h1 className="text-2xl font-semibold text-center mb-5 tracking-wide">
          🔐 Password Generator
        </h1>

        {/* Password Display Box */}
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4 bg-white/20 border border-white/30">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-lg text-white bg-transparent placeholder-gray-400"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassworToClipboard}
            className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-500 transition-all rounded-r-lg"
          >
            Copy
          </button>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-4 text-sm">
          {/* Length Slider */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              // minimum characters selected 
              min={8}

              // maximum characters selected 
              max={100}
              value={length}
              className="cursor-pointer w-full accent-blue-500"
              onChange={(e) => setLength(e.target.value)}
            />
            <span className="bg-gray-900 px-2 py-1 rounded-lg text-sm">{length}</span>
          </div>

          {/* Checkbox Options */}
          <div className="flex justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-4 h-4 accent-blue-500"
              />
              Include Numbers
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="w-4 h-4 accent-blue-500"
              />
              Include Symbols
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
