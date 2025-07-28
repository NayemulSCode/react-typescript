import React from "react";
import { TodoStats } from "../../types/types";

interface StatsCardProps {
  stats: TodoStats;
  onClearCompleted: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats, onClearCompleted }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">মোট কাজ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">সম্পন্ন</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">বাকি</div>
          </div>
        </div>

        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            সম্পন্ন কাজ মুছুন
          </button>
        )}
      </div>

      {stats.total > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {Math.round((stats.completed / stats.total) * 100)}% সম্পন্ন
          </p>
        </div>
      )}
    </div>
  );
};
export default StatsCard;