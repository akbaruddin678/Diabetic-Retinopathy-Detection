// src/components/dashboard/PredictionHistory.jsx
import React, { useState, useEffect } from 'react';
import { predictionAPI } from '../../services/api';
import { Eye, Calendar, Download, AlertCircle } from 'lucide-react';
import { DISEASE_CLASSES, DISEASE_COLORS } from '../../utils/constants';

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPredictions();
  }, [currentPage]);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const response = await predictionAPI.getHistory(currentPage, 10);
      setPredictions(response.data.history);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      setError('Failed to load prediction history');
    } finally {
      setLoading(false);
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
    return `bg-${color}-100 text-${color}-800`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Prediction History</h2>
        <p className="text-gray-600">
          View your previous retinal image analyses
        </p>
      </div>

      {predictions.length === 0 ? (
        <div className="text-center py-12">
          <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No prediction history found</p>
          <p className="text-gray-400 text-sm mt-1">
            Upload your first retinal image to get started
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div
                key={prediction.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(prediction.prediction_result)}`}>
                      {prediction.prediction_result}
                    </div>
                    <div className="text-sm text-gray-600">
                      Confidence: {prediction.confidence.toFixed(2)}%
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(prediction.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  {DISEASE_CLASSES[prediction.prediction_result] || prediction.prediction_result}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PredictionHistory;