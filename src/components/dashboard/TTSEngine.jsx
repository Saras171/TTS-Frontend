// File: src/components/dashboard/TTSEngine.jsx

//NPM Packages import
import { Loader2 } from 'lucide-react';

//Components UI code files imported
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';

// TTSEngine Component
// ----------------------------
// The core text-to-speech interaction form. Users can:
// - Enter text
// - Select language, voice, speed, pitch
// - Trigger generation & playback
// Also includes history toggle and logout.
export default function TTSEngine({
  text,
  setText,
  language,
  setLanguage,
  gender,
  setGender,
  speed,
  setSpeed,
  pitch,
  setPitch,
  audioUrl,
  handleGenerate,
  generating,
  handleLogout,
  logoutLoading,
  toggleHistory,
    audioRef,
  historyVisible
}) {

   // Supported language options for selection dropdown
  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'hi-IN', name: 'Hindi (India)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'de-DE', name: 'German (Germany)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'ja-JP', name: 'Japanese (Japan)' },
    { code: 'ko-KR', name: 'Korean (South Korea)' },
    { code: 'it-IT', name: 'Italian (Italy)' },
    { code: 'ru-RU', name: 'Russian (Russia)' },
  ];

  return (
    <div className="w-full md:w-3/5 bg-white rounded-2xl p-6 shadow-md">
      <CardContent>
        <h2 className="text-xl md:text-3xl font-bold text-gray-700 mb-4 text-center md:text-left">
          Text-to-Speech Converter
        </h2>

 {/* Header Actions */}
        <div className="hidden sm:flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <Button
            onClick={toggleHistory}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {historyVisible ? 'Hide History' : 'Show History'}
          </Button>
          <Button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            {logoutLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Logging Out...
              </>
            ) : (
              'Logout'
            )}
          </Button>
        </div>

   {/* Text Input */}
        <textarea
          className="w-full p-4 text-sm md:text-base bg-gray-100 text-gray-700 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-sm resize-none"
          placeholder="Enter text to convert..."
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Language Selection */}
        <label className="text-gray-700 font-semibold">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl mb-4 shadow-sm"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

  {/* Gender Selection */}
        <label className="text-gray-700 font-semibold">Voice Gender:</label>
        <div className="flex justify-around mb-4 text-sm md:text-base">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            Male
          </label>
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            Female
          </label>
        </div>

 {/* Speed & Pitch Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Speed</label>
            <input
              type="number"
              value={speed}
              step="0.1"
              min="0.5"
              max="2.0"
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Pitch</label>
            <input
              type="number"
              value={pitch}
              step="0.1"
              min="-20.0"
              max="20.0"
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>
        </div>

      {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-xl flex justify-center items-center gap-2"
        >
          {generating ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Generating...
            </>
          ) : (
            'Generate Speech'
          )}
        </Button>


        {/* Generated Audio Preview */}
        {audioUrl && (
          <>
          <div ref={audioRef}>
            <h3 className="text-gray-700 mt-6 font-medium">Generated Audio:</h3>
            <audio
              controls
              src={audioUrl}
              className="w-full mt-4 bg-gray-100 rounded-xl shadow-lg"
            />
            </div>
          </>
        )}
      </CardContent>
    </div>
  );
}
