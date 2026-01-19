import { useState, useEffect, useRef } from 'react'
import ProjectCard from './components/ProjectCard'
import RadioPlayer from './components/RadioPlayer'
import { Radio, FileText, CreditCard, Package, Calculator, ShoppingBag, Stethoscope, Sparkles, Zap, Moon, Sun } from 'lucide-react'

export default function App() {
  const [isRadioActive, setIsRadioActive] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number}>>([])

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate floating elements
  useEffect(() => {
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
    setFloatingElements(elements)
  }, [])

  // Trigger animations after mount
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  const handleRadioToggle = () => {
    setIsRadioActive(true)
  }

  const handleBackToPortfolio = () => {
    setIsRadioActive(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  if (isRadioActive) {
    return (
      <div className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        <RadioPlayer onBack={handleBackToPortfolio} isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen overflow-hidden relative transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating gradient orbs */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className={`absolute w-96 h-96 rounded-full transition-opacity duration-500 ${
              isDarkMode ? 'opacity-20' : 'opacity-10'
            } animate-pulse`}
            style={{
              background: `radial-gradient(circle, ${['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'][element.id]} 0%, transparent 70%)`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: 'translate(-50%, -50%)',
              animation: `float ${15 + element.id * 2}s ease-in-out infinite`,
              animationDelay: `${element.id * 0.5}s`
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode ? 'opacity-10' : 'opacity-5'
        }`}>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }} />
        </div>

        {/* Mouse follower effect */}
        <div 
          className="pointer-events-none fixed w-64 h-64 rounded-full transition-all duration-300"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className={`
            relative w-14 h-14 rounded-full 
            flex items-center justify-center
            transition-all duration-500 transform hover:scale-110
            ${isDarkMode 
              ? 'bg-gray-800/80 backdrop-blur-md border border-gray-700 hover:bg-gray-700/80' 
              : 'bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-gray-100/80 shadow-lg'
            }
          `}
        >
          <div className="relative w-6 h-6">
            {/* Sun Icon */}
            <Sun className={`
              absolute inset-0 w-6 h-6 transition-all duration-500
              ${isDarkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100 text-yellow-500'}
            `} />
            
            {/* Moon Icon */}
            <Moon className={`
              absolute inset-0 w-6 h-6 transition-all duration-500
              ${isDarkMode ? 'opacity-100 rotate-0 scale-100 text-blue-300' : 'opacity-0 -rotate-180 scale-0'}
            `} />
          </div>
          
          {/* Orbit ring animation */}
          <div className={`
            absolute inset-0 rounded-full border-2
            transition-all duration-500
            ${isDarkMode 
              ? 'border-blue-400/30 animate-pulse' 
              : 'border-yellow-400/30'
            }
          `} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Animated Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="relative inline-block">
            <h1 className={`
              text-5xl md:text-7xl font-bold mb-3 animate-gradient
              ${isDarkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              }
            `}>
              Simple Web Application
            </h1>
            <div className="absolute -top-2 -right-2 animate-spin-slow">
              <Sparkles className={`w-8 h-8 transition-colors duration-500 ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`} />
            </div>
          </div>
          <p className={`
            text-xl animate-fade-in-up transition-colors duration-500
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `} style={{ animationDelay: '0.3s' }}>
            Portfolio of Web Projects
          </p>
          <div className="mt-4 flex justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Zap className={`w-5 h-5 animate-pulse transition-colors duration-500 ${
              isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`} />
            <span className={`text-sm transition-colors duration-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Interactive Portfolio
            </span>
            <Zap className={`w-5 h-5 animate-pulse transition-colors duration-500 ${
              isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`} />
          </div>
        </div>

        {/* Project Cards Grid with Enhanced Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl w-full">
          {/* Cheque Deposit */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            <ProjectCard
              title="Cheque Deposit"
              description="බැංකු චෙක්පත් තැන්පතු පද්ධතිය"
              icon={<CreditCard className="w-8 h-8" />}
              color="from-blue-500 to-cyan-500"
              href="https://cheque-deposit.netlify.app"
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Insurance Letter */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <ProjectCard
              title="Insurance Letter"
              description="රක්ෂණ ලිපි කළමනාකරණය"
              icon={<FileText className="w-8 h-8" />}
              color="from-purple-500 to-pink-500"
              href="https://duplicat-insurance-letter.netlify.app"
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* PD Cheque 02 */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <ProjectCard
              title="PD Cheque 02"
              description="දෙවන චෙක්පත් පද්ධතිය"
              icon={<CreditCard className="w-8 h-8" />}
              color="from-indigo-500 to-purple-500"
              href="https://magenta-paprenjak-c068ee.netlify.app"
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Stock Management */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            <ProjectCard
              title="Stock Management"
              description="Office Stock Control"
              icon={<Package className="w-8 h-8" />}
              color="from-orange-500 to-red-500"
              href="https://office-stationary-updet.netlifyapp/"
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Healthtrack */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.5s' }}
          >
            <ProjectCard
              title="healthtrack"
              description="මගේ වෛද්‍ය වාර්තා"
              icon={<Stethoscope className="w-8 h-8" />}
              color="from-indigo-500 to-blue-500"
              href="https://healthtrack-medical.netlify.app/"
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Lanka Shop */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.6s' }}
          >
            <ProjectCard
              title="lanka-shop"
              description="Shop Web"
              icon={<ShoppingBag className="w-8 h-8" />}
              color="from-pink-500 to-rose-500"
              href="https://lanka-shop.netlify.app/"
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Salary Calculator */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.7s' }}
          >
            <ProjectCard
              title="Salary Calculator"
              description="වැටුප් ගණනය කිරීම්"
              icon={<Calculator className="w-8 h-8" />}
              color="from-emerald-500 to-green-500"
              href="https://udaya-salry-cal.netlify.app"
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Online Radio */}
          <div 
            className={`transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            }`}
            style={{ animationDelay: '0.8s' }}
          >
            <ProjectCard
              title="Online Radio"
              description="Live Sri Lankan radio streaming"
              icon={<Radio className="w-8 h-8" />}
              color="from-red-500 to-orange-500"
              onClick={handleRadioToggle}
              mousePosition={mousePosition}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Animated Footer */}
        <div className={`mt-8 text-center transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ animationDelay: '1s' }}>
          <p className={`text-sm animate-pulse transition-colors duration-500 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2024 Simple Web Application
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          25% { transform: translate(-50%, -50%) translateY(-20px) rotate(90deg); }
          50% { transform: translate(-50%, -50%) translateY(0px) rotate(180deg); }
          75% { transform: translate(-50%, -50%) translateY(20px) rotate(270deg); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}