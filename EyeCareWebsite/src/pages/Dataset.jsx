import React from 'react';
import { Database, Download, Users, BarChart3, Eye, Shield, Cpu, Zap, ExternalLink } from 'lucide-react';

const Dataset = () => {
  const sourceDatasets = [
    {
      name: 'APTOS 2019',
      description: 'Asia Pacific Tele-Ophthalmology Society dataset from the blindness detection competition, featuring high-quality retinal images with expert DR grading.',
      size: '3,662 labeled images',
      classes: '5 severity levels',
      resolution: 'Various dimensions',
      source: 'APTOS Competition',
      link: 'https://www.kaggle.com/c/aptos2019-blindness-detection'
    },
    {
      name: 'EyePACS',
      description: 'Large-scale dataset from the California healthcare system containing retinal images from diabetic patients with quality assessments.',
      size: '88,702 images',
      classes: '5 severity levels',
      resolution: 'Various resolutions',
      source: 'Kaggle Diabetic Retinopathy',
      link: 'https://www.kaggle.com/c/diabetic-retinopathy-detection'
    },
    {
      name: 'Messidor',
      description: 'French research dataset with high-quality retinal images and standardized DR grading, widely used in academic research.',
      size: '1,200 images',
      classes: '4 severity grades',
      resolution: '1440×960, 2240×1488, 2304×1536',
      source: 'Messidor Research Project',
      link: 'https://www.adcis.net/en/third-party/messidor/'
    }
  ];

  const processedDatasets = [
    {
      name: 'Custom Balanced Training Set',
      description: 'Processed and balanced dataset derived from source datasets with perfect class distribution for optimal model training.',
      size: '25,000 images',
      classes: '5 severity levels',
      resolution: 'Standardized dimensions',
      source: 'Custom processed from source datasets'
    },
    {
      name: 'Validation Set',
      description: 'Dedicated validation dataset used for model selection and hyperparameter tuning during training.',
      size: '5,000 images',
      classes: '5 severity levels',
      resolution: 'Consistent with training',
      source: 'Stratified split from processed data'
    },
    {
      name: 'Test Set',
      description: 'Completely held-out test dataset for final model evaluation and performance reporting.',
      size: '4,950 images',
      classes: '5 severity levels',
      resolution: 'Consistent with training',
      source: 'Independent test split'
    }
  ];

  const preprocessing = [
    {
      step: 'Image Standardization',
      description: 'All images processed to consistent dimensions optimized for the neural network architecture.',
      icon: Eye
    },
    {
      step: 'Data Augmentation',
      description: 'Comprehensive augmentation including rotations, flips, and color adjustments to improve generalization.',
      icon: Database
    },
    {
      step: 'Class Balancing',
      description: 'Strategic sampling ensuring 5,000 images per class in training set for balanced learning.',
      icon: Users
    },
    {
      step: 'Mixed Precision',
      description: 'FP16/FP32 mixed precision training for faster convergence and reduced memory usage.',
      icon: Zap
    },
    {
      step: 'Cross-Validation',
      description: 'Rigorous train/validation/test splits with patient-level separation to prevent data leakage.',
      icon: Shield
    },
    {
      step: 'Quality Assurance',
      description: 'Automated quality control and manual verification to ensure dataset integrity.',
      icon: BarChart3
    }
  ];

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dataset & Training Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive datasets and optimized preprocessing for reliable diabetic retinopathy detection
          </p>
        </div>

        {/* Source Datasets */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Source Datasets</h2>
          <div className="prose prose-lg text-gray-600 mb-8 max-w-none text-center">
            <p>
              Our model is trained on a combination of three publicly available retinal image datasets, 
              processed and balanced to create a robust training environment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sourceDatasets.map((dataset, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dataset.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {dataset.description}
                </p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size:</span>
                    <span className="font-medium">{dataset.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Classes:</span>
                    <span className="font-medium">{dataset.classes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Resolution:</span>
                    <span className="font-medium">{dataset.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Source:</span>
                    <span className="font-medium">{dataset.source}</span>
                  </div>
                </div>
                <button
                  onClick={() => openLink(dataset.link)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  View Dataset
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Processed Dataset Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Dataset Processing Strategy</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-4">
              We combined and processed the source datasets to create a <strong>carefully balanced custom dataset</strong> specifically designed for diabetic retinopathy classification. The dataset features <strong>perfect class balance</strong> during training to ensure the model learns all severity levels equally.
            </p>
            <p className="mb-4">
              The training approach emphasizes <strong>strong generalization</strong> through comprehensive data augmentation and regularization techniques. The model achieved 78.4% test accuracy, demonstrating effective prevention of overfitting.
            </p>
          </div>
        </div>

        {/* Processed Dataset Details */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Processed Dataset Composition</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {processedDatasets.map((dataset, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {dataset.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {dataset.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size:</span>
                    <span className="font-medium">{dataset.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Classes:</span>
                    <span className="font-medium">{dataset.classes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Resolution:</span>
                    <span className="font-medium">{dataset.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Source:</span>
                    <span className="font-medium">{dataset.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preprocessing Pipeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Training & Preprocessing Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preprocessing.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.step}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Statistics */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Dataset Statistics & Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Distribution</h3>
              <div className="space-y-3">
                {[
                  { class: 'No DR (0)', count: '5,000', percentage: '20%', color: 'bg-green-500' },
                  { class: 'Mild (1)', count: '5,000', percentage: '20%', color: 'bg-blue-500' },
                  { class: 'Moderate (2)', count: '5,000', percentage: '20%', color: 'bg-yellow-500' },
                  { class: 'Severe (3)', count: '5,000', percentage: '20%', color: 'bg-orange-500' },
                  { class: 'Proliferative (4)', count: '5,000', percentage: '20%', color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{item.class}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 text-sm">{item.count}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: item.percentage }}
                        ></div>
                      </div>
                      <span className="text-gray-600 text-sm w-12">{item.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Configuration</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Training Images</span>
                  <span className="font-semibold">25,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Validation Images</span>
                  <span className="font-semibold">5,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Test Images</span>
                  <span className="font-semibold">4,950</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Training Epochs</span>
                  <span className="font-semibold">20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Best Epoch</span>
                  <span className="font-semibold">17</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Training Hardware</span>
                  <span className="font-semibold">CUDA GPU</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Training Insights</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-4">
              The model demonstrated <strong>exceptional generalization capability</strong>, achieving 78.4% test accuracy. This indicates effective regularization and prevention of overfitting through our training strategy.
            </p>
            <p className="mb-4">
              The <strong>95.1% AUC score</strong> confirms excellent confidence calibration, making the model highly reliable for clinical screening applications. The model particularly excels at detecting Severe and Proliferative DR cases (90.3% and 88.8% accuracy respectively).
            </p>
            <p>
              Our balanced dataset approach combined with <strong>mixed precision training</strong> and comprehensive data augmentation resulted in a robust model that performs well across all severity levels while maintaining strong performance on critical advanced stages.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Technical Training Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Strategy</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <Cpu className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Transfer Learning:</strong> Pre-trained backbone with custom classification head</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Mixed Precision:</strong> FP16/FP32 training for efficiency</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Regularization:</strong> Comprehensive techniques to prevent overfitting</span>
                </li>
                <li className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Early Stopping:</strong> Model selection based on validation performance</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Strong Generalization:</strong> 78.4% test accuracy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Excellent AUC:</strong> 95.1% indicating reliable confidence scores</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Critical Case Detection:</strong> 90.3% accuracy on Severe DR</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Multi-Dataset Training:</strong> Combined APTOS, EyePACS, and Messidor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dataset;