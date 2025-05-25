import React from 'react';
import { Deal } from '../types';
import { ShoppingBag, Clock, CheckCircle } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  rank: number;
}

const DealCard: React.FC<DealCardProps> = ({ deal, rank }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className={`p-2 text-white text-center font-semibold ${
        rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-gray-400' : 'bg-amber-700'
      }`}>
        #{rank} Best Deal
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{deal.seller}</h3>
        <p className="text-sm text-gray-600 mb-3">{deal.item}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-700">
            <ShoppingBag size={16} className="mr-1" />
            <span>{deal.availability}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock size={16} className="mr-1" />
            <span>{deal.deliveryTime}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-green-600">${deal.price}</span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center">
            <CheckCircle size={16} className="mr-1" />
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealCard;