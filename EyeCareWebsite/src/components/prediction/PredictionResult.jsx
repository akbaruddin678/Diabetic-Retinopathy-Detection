// src/components/prediction/PredictionResult.jsx
import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { DISEASE_CLASSES, DISEASE_COLORS } from '../../utils/constants';

const PredictionResult = ({ result }) => {
  const getSeverityIcon = (prediction) => {
    if (prediction === "No DR") {
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    } else if (prediction === "Mild" || prediction === "Moderate") {
      return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
    } else {
      return <XCircle className="h-8 w-8 text-red-500" />;
    }
  };

  const getSeverityColor = (prediction) => {
    const colorMap = {
      "No DR": "green",
      "Mild": "blue",
      "Moderate": "yellow", 
      "Severe": "orange",
      "Proliferative DR": "red"
    };
    
    const color = colorMap[prediction] || "gray";
    return `bg-${color}-100 text-${color}-800 border-${color}-200`;
  };

  const getRecommendation = (prediction) => {
    const recommendations = {
      "No DR": "No signs of diabetic retinopathy detected. Continue regular eye checkups.",
      "Mild": "Early signs detected. Schedule a follow-up with an ophthalmologist.",
      "Moderate": "Moderate non-proliferative diabetic retinopathy detected. Consult an ophthalmologist soon.",
      "Severe": "Severe non-proliferative diabetic retinopathy detected. Urgent ophthalmologist consultation recommended.",
      "Proliferative DR": "Proliferative diabetic retinopathy detected. Immediate medical attention required."
    };
    return recommendations[prediction] || "Please consult with a healthcare professional.";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
      
      {/* Main Result Card */}
      <div className={`border-2 rounded-lg p-6 ${getSeverityColor(result.prediction)}`}>
        <div className="flex items-center space-x-4">
          {getSeverityIcon(result.prediction)}
          <div>
            <h3 className="text-xl font-bold">
              {DISEASE_CLASSES[result.prediction] || result.prediction}
            </h3>
            <p className="text-lg font-semibold">
              Confidence: {result.confidence.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Recommendation</h4>
            <p className="text-blue-800">{getRecommendation(result.prediction)}</p>
          </div>
        </div>
      </div>

      {/* Probability Distribution */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Probability Distribution</h4>
        <div className="space-y-3">
          {result.probabilities.map((prob, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">
                  {DISEASE_CLASSES[result.disease_classes[index]] || result.disease_classes[index]}
                </span>
                <span className="text-gray-600">{(prob * 100).toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${prob * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-sm text-gray-500 text-center">
        Analysis completed on {new Date(result.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default PredictionResult;