import React from 'react';
import { Deal } from '../types';
import DealCard from './DealCard';

interface DealComparisonProps {
  deals: Deal[];
}

const DealComparison: React.FC<DealComparisonProps> = ({ deals }) => {
  if (!deals.length) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Top Deals Found</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deals.map((deal, index) => (
          <DealCard key={deal.id} deal={deal} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default DealComparison;