import { Calculator, Plus, Minus, Divide, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  const operations = [
    {
      title: 'Multiplication',
      description: 'Practice your times tables with custom difficulty!',
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      link: '/multiplication',
      color: 'blue',
      active: true
    },
    {
      title: 'Addition',
      description: 'Master adding numbers of all sizes.',
      icon: <Plus className="w-8 h-8 text-green-600" />,
      link: '#',
      color: 'green',
      active: false
    },
    {
      title: 'Subtraction',
      description: 'Get faster at subtracting numbers.',
      icon: <Minus className="w-8 h-8 text-orange-600" />,
      link: '#',
      color: 'orange',
      active: false
    },
    {
      title: 'Division',
      description: 'Learn how to divide numbers easily.',
      icon: <Divide className="w-8 h-8 text-purple-600" />,
      link: '#',
      color: 'purple',
      active: false
    }
  ];

  const colorMap = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mb-6 animate-bounce">
            <Sparkles className="w-5 h-5" />
            Welcome to MathHelper!
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Let's make math <span className="text-blue-600">fun!</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Choose a domain below to start practicing. You can customize the difficulty 
            and even print out your own practice sheets!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {operations.map((op) => (
            <div 
              key={op.title}
              className={`group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border-2 ${
                op.active ? 'border-transparent hover:border-blue-500' : 'border-gray-100 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${colorMap[op.color as keyof typeof colorMap]} group-hover:scale-110 transition-transform`}>
                  {op.icon}
                </div>
                {!op.active && (
                  <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{op.title}</h3>
              <p className="text-gray-600 mb-8">{op.description}</p>
              
              {op.active ? (
                <Link
                  to={op.link}
                  className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Practice
                </Link>
              ) : (
                <div className="w-full bg-gray-100 text-gray-400 font-bold py-4 px-6 rounded-2xl text-center cursor-not-allowed">
                  Under Construction
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center text-gray-400 font-medium">
          Created with ❤️ for your math journey
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
