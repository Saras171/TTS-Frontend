// File: src/pages/Dashboard.jsx

// NPM Packages Imported
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

// Custom Hooks & Utilities
import { useAuth } from '@/context/AuthContext';
import {
  logoutUser,
  generateTTS,
  getAudioHistory,
  deleteAudioFile,
} from '@/utils/api';
import { getVoiceName } from '@/utils/getVoiceName';

// Reusable UI Components
import { Button } from '@/components/ui/button';
import InfoPanel from '@/components/dashboard/InfoPanel';
import TTSEngine from '@/components/dashboard/TTSEngine';
import HistoryPanel from '@/components/dashboard/HistoryPanel';
import DeleteModal from '@/components/dashboard/DeleteModal';

// Dashboard Component
export default function Dashboard() {
  const { user, isAuthenticated, checkAuth } = useAuth();  // Auth context
  const navigate = useNavigate();

   // Component State Hooks
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [gender, setGender] = useState('male');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0.0);
  const [audioUrl, setAudioUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAudioId, setSelectedAudioId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const audioRef = useRef(null);
  const historyRef = useRef(null);

  // Auth Validation on Mount
  useEffect(() => {
    const validateAuth = async () => {
      await checkAuth();
      setLoading(false);
    };
    validateAuth();
  }, []);

  // Redirect if Unauthenticated
  // Fetch history when authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/login');
    if (isAuthenticated) fetchHistory();
  }, [isAuthenticated, loading]);

   // Fetch User's Audio History
  const fetchHistory = async () => {
    try {
      const res = await getAudioHistory();
      setHistory(res.data.history || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

   // Logout Handler
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logoutUser();
      localStorage.clear();
      await checkAuth();
      navigate('/login');
        toast.success("Logged out successfully.");
    } catch (err) {
      console.error('Logout error', err);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

    // Generate Speech File
  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const voice = getVoiceName(language, gender);
      const res = await generateTTS({
        text,
        languageCode: language,
        voice,
        speed,
        pitch,
      });
      setAudioUrl(res.data.url);
      console.log('audio url: ', res.data.url);
       toast.success("Speech file generated successfully!");

         // Real-time update in history section
    if (res.data.audio) {
      setHistory((prev) => [res.data.audio, ...prev]);
    } else {
      fetchHistory(); // Fallback: refetch full history if audio meta not returned
    }

    // RESET INPUT FIELDS AFTER GENERATION
    setText('');             // Clear textarea
    setLanguage('en-US');    // Reset language
    setGender('male');       // Reset gender
    setSpeed(1.0);           // Reset speed
    setPitch(0.0);     
    
     // Scroll to generated audio
    setTimeout(() => {
      audioRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);// Reset pitch
    } catch (err) {
    toast.error(err.response?.data?.message || 'TTS generation failed.');
    } finally {
      setGenerating(false);
    }
  };

   // Delete Audio Handler
  const confirmDelete = async () => {
    if (!selectedAudioId) return;
    try {
      await deleteAudioFile(selectedAudioId);
      setShowDeleteModal(false);
      setSelectedAudioId(null);
      fetchHistory();  // Refresh history after deletion
        toast.success("Audio file deleted.");
    } catch (err) {
    toast.error("Failed to delete audio file.");
    }
  };

    // Trigger Delete Modal
  const handleDeleteClick = (id) => {
    setSelectedAudioId(id);
    setShowDeleteModal(true);
  };

    // Toggle History Panel View
  const toggleHistory = () => {
    const newVisible = !historyVisible;
    setHistoryVisible(newVisible);
    if (newVisible) {
      setTimeout(() => {
        historyRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

    // Loader while checking session
  if (loading) return <div className="p-4">Checking session...</div>;

  // -------------------------
  // Dashboard JSX Structure
  // -------------------------
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 bg-tts-background p-4">
    
      {/* Mobile Hamburger */}
      <div className="absolute top-4 right-4 z-50 block md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer bg-white p-2 rounded-full shadow"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Slide-in mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setMenuOpen(false)}
            ></div>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col space-y-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X className="cursor-pointer w-6 h-6 text-gray-600" />
                </button>
              </div>
              
                  {/* View History Button */}
              <Button
  className=" bg-blue-500 text-white"
  onClick={() => {
    setMenuOpen(false);        // Close the menu
    const newVisible = !historyVisible;
    setHistoryVisible(newVisible); // Toggle history visibility
    if (!historyVisible) {
      // Delay scroll to allow animation
      setTimeout(() => {
        historyRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }}
>
  View History
</Button>


              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                disabled={logoutLoading}
                className=" bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                {logoutLoading ? (
                  <>
                    <span className="animate-spin"><X className="w-5 h-5" /></span>
                    Logging Out...
                  </>
                ) : (
                  'Logout'
                )}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    {/* Main Dashboard Layout */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6 transition-all duration-500 ease-in-out">
        <InfoPanel user={user} />
        <TTSEngine
          text={text}
          setText={setText}
          language={language}
          setLanguage={setLanguage}
          gender={gender}
          setGender={setGender}
          speed={speed}
          setSpeed={setSpeed}
          pitch={pitch}
          setPitch={setPitch}
          audioUrl={audioUrl}
          handleGenerate={handleGenerate}
          generating={generating}
          handleLogout={handleLogout}
          logoutLoading={logoutLoading}
          toggleHistory={toggleHistory}
            audioRef={audioRef}
          historyVisible={historyVisible}
        />
        <HistoryPanel
          historyVisible={historyVisible}
          history={history}
          historyRef={historyRef}
          handleDeleteClick={handleDeleteClick}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedAudioId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

