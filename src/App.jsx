import { useState, useEffect } from 'react';
import { User, Building2, Palette, ArrowRight, ArrowLeft, Check, Users, Briefcase, Bell, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OnboardingApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    name: '',
    email: '',
    // Step 2: Business Info
    companyName: '',
    industry: '',
    companySize: '',
    // Step 3: Preferences
    theme: 'light',
    dashboardLayout: 'compact'
  });

  const [errors, setErrors] = useState({});

  // Mock data for dashboard
  const weeklyProgressData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 7 },
    { name: 'Wed', tasks: 3 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 6 },
    { name: 'Sat', tasks: 2 },
    { name: 'Sun', tasks: 5 }
  ];

  // Check if onboarding is already complete on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    if (savedData.isComplete) {
      setFormData(savedData);
      setIsOnboardingComplete(true);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    } else if (step === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
      if (!formData.companySize.trim()) newErrors.companySize = 'Company size is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const completeData = { ...formData, isComplete: true };
      localStorage.setItem('onboardingData', JSON.stringify(completeData));
      setIsOnboardingComplete(true);
    }
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboardingData');
    setFormData({
      name: '',
      email: '',
      companyName: '',
      industry: '',
      companySize: '',
      theme: 'light',
      dashboardLayout: 'compact'
    });
    setCurrentStep(1);
    setIsOnboardingComplete(false);
    setErrors({});
  };

  if (isOnboardingComplete) {
    return (
      <div className={`min-h-screen transition-all duration-500 ${
        formData.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className={`rounded-lg p-6 mb-8 ${
            formData.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {formData.name}! 👋</h1>
                <p className={`${formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formData.companyName} • {formData.industry}
                </p>
              </div>
              <button
                onClick={resetOnboarding}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Demo
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`grid ${
            formData.dashboardLayout === 'wide' ? 'grid-cols-1 md:grid-cols-3 gap-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          } mb-8`}>
            <div className={`rounded-lg p-6 ${
              formData.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Team Members</p>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% this month
                  </p>
                </div>
                <Users className={`w-12 h-12 ${
                  formData.theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`} />
              </div>
            </div>

            <div className={`rounded-lg p-6 ${
              formData.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Active Projects</p>
                  <p className="text-3xl font-bold text-green-600">8</p>
                  <p className="text-sm text-blue-500 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    3 completing soon
                  </p>
                </div>
                <Briefcase className={`w-12 h-12 ${
                  formData.theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`} />
              </div>
            </div>

            <div className={`rounded-lg p-6 ${
              formData.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    formData.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Notifications</p>
                  <p className="text-3xl font-bold text-orange-600">5</p>
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <Bell className="w-4 h-4 mr-1" />
                    2 urgent items
                  </p>
                </div>
                <Bell className={`w-12 h-12 ${
                  formData.theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`} />
              </div>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className={`rounded-lg p-6 ${
            formData.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4">Weekly Task Progress</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={formData.theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={formData.theme === 'dark' ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis 
                    stroke={formData.theme === 'dark' ? '#9ca3af' : '#6b7280'}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: formData.theme === 'dark' ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
            <span className="text-sm font-medium text-gray-700">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-500">
          {/* Step Icons */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step < currentStep 
                    ? 'bg-green-500 text-white' 
                    : step === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : step === 1 ? (
                    <User className="w-6 h-6" />
                  ) : step === 2 ? (
                    <Building2 className="w-6 h-6" />
                  ) : (
                    <Palette className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  step <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step === 1 ? 'Personal' : step === 2 ? 'Business' : 'Preferences'}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Let&#39;s get to know you!</h2>
                  <p className="text-gray-600">Tell us a bit about yourself to get started.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">About your business</h2>
                  <p className="text-gray-600">Help us understand your company better.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.companyName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.industry ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.companySize ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                  {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize your experience</h2>
                  <p className="text-gray-600">Set your preferences for the dashboard.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Theme Preference</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['light', 'dark'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => handleInputChange('theme', theme)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          formData.theme === theme
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className={`w-full h-16 rounded mb-2 ${
                          theme === 'light' ? 'bg-white border' : 'bg-gray-800'
                        }`}></div>
                        <span className="text-sm font-medium capitalize">{theme} Theme</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Dashboard Layout</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['compact', 'wide'].map((layout) => (
                      <button
                        key={layout}
                        onClick={() => handleInputChange('dashboardLayout', layout)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          formData.dashboardLayout === layout
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className={`w-full h-16 rounded mb-2 bg-gray-100 flex ${
                          layout === 'compact' ? 'gap-1' : 'gap-2'
                        }`}>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className={`bg-gray-300 rounded ${
                              layout === 'compact' ? 'flex-1' : 'flex-1'
                            }`}></div>
                          ))}
                        </div>
                        <span className="text-sm font-medium capitalize">{layout} Layout</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Complete Setup
                <Check className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingApp;