import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Globe, Heart } from 'lucide-react';

const About = () => {
  const objectives = [
    {
      icon: Target,
      title: 'High Accuracy Detection',
      description: 'Develop CNN-based models capable of detecting retinopathy with exceptional accuracy and reliability.'
    },
    {
      icon: Users,
      title: 'Accessible Screening',
      description: 'Create easy-to-use interfaces available on both web and mobile platforms for widespread accessibility.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Provide affordable screening solutions that raise awareness and promote regular eye checkups worldwide.'
    },
    {
      icon: Heart,
      title: 'Prevent Blindness',
      description: 'Reduce delays in diagnosis, leading to early intervention and prevention of vision loss.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About EyeCareAI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing eye care through artificial intelligence and deep learning technology.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-4">
              <strong>Retinopathy is a leading cause of preventable blindness worldwide</strong>, particularly among individuals with diabetes, high blood pressure, or premature birth conditions. The disease often progresses silently, with symptoms appearing only in advanced stages, making early detection crucial to avoid vision loss.
            </p>
            <p className="mb-4">
              This project proposes the development of a computer-based Retinopathy Screening Tool that uses deep learning and image processing to detect early signs of retinopathy in retinal images. By leveraging Convolutional Neural Networks (CNNs), the system provides fast, reliable, and affordable screening support for both healthcare professionals and patients.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {objective.title}
                      </h3>
                      <p className="text-gray-600">
                        {objective.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Collection & Preprocessing</h3>
            <p className="mb-4">
              We utilize publicly available retinal image datasets (EyePACS, Messidor) and apply advanced preprocessing techniques including image resizing, normalization, contrast enhancement, and data augmentation to ensure robust model training.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Model Development</h3>
            <p className="mb-4">
              Our system implements state-of-the-art Convolutional Neural Networks (CNNs) using TensorFlow/Keras and PyTorch. The architecture includes convolutional layers for feature extraction, pooling layers for dimensionality reduction, dropout layers to prevent overfitting, and fully connected layers with softmax activation for multi-class classification of severity levels.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Evaluation & Validation</h3>
            <p className="mb-4">
              We rigorously test our models using unseen data and employ comprehensive metrics including accuracy, precision, recall, F1-score, and ROC-AUC to ensure reliability and performance.
            </p>
          </div>
        </div>

        {/* Expected Outcomes */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Expected Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>A CNN-powered screening system for automatic detection of diabetic retinopathy</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Web interface for hospitals and doctors, enabling professional-level analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Mobile interface for patients and rural health workers, extending accessibility</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Reduced delays in diagnosis, leading to early intervention and prevention of blindness</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Increased public awareness of regular eye examinations</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Affordable screening solution for underserved communities</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/model"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Learn About Our AI Technology
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;