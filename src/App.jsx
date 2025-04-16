import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuthenticated} = useAuth();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate=useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleSignout = () => {
    isAuthenticated(false);
    navigate("/");
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Connecting Teachers and Students for Better Academic Guidance
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                TG App simplifies the teacher-guardian system by providing a unified platform for managing student groups,
                tracking documents, and addressing student concerns across all departments.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors" onClick={handleSignup}>
                  Get Started
                </button>
                <a href="#features" className="px-6 py-3 border border-blue-500 text-blue-500 font-medium rounded hover:bg-blue-500 hover:text-white transition-colors">
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="https://res.cloudinary.com/dcc5th5so/image/upload/v1744828236/x2i5qh9dhdnuvog1boau.jpg" alt="TG App Dashboard Preview" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose TG App?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Student Guidance?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of colleges already using TG App to improve teacher-student relationships and academic outcomes.
          </p>
          <button className="px-8 py-4 bg-white text-blue-500 font-bold text-lg rounded hover:bg-gray-100 transition-colors" onClick={handleLogin}>
            Request a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TG App</h3>
              <p className="text-gray-300">
                Empowering teachers to guide students effectively through their academic journey with modern tools and insights.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div> */}
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: support@tgapp.edu</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-gray-400 mt-12 pt-6 border-t border-gray-700">
            &copy; 2025 TG App. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for feature cards
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:-translate-y-1 transform transition-transform">
      <div className="text-4xl mb-4 text-blue-500">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}



// Data
const features = [
  {
    icon: "👥",
    title: "Student Group Management",
    description:
      "Easily manage diverse student groups from different classes assigned to you as a guardian teacher."
  },
  {
    icon: "📄",
    title: "Document Tracking",
    description:
      "Store, organize and access important student documents all in one secure location."
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description:
      "Get insights into student performance and identify areas where they might need additional support."
  },
  {
    icon: "💬",
    title: "Communication Tools",
    description:
      "Direct messaging system to stay connected with your students and address their concerns promptly."
  },
  {
    icon: "📝",
    title: "Student Feedback System",
    description:
      "Collect and review feedback about students' academic progress and personal challenges."
  },
  {
    icon: "🔔",
    title: "Issue Tracking",
    description:
      "Identify and resolve student issues with a structured system for monitoring resolution progress."
  }
];

