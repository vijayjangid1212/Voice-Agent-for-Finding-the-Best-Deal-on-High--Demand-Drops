import { Deal } from '../types';

export const generateMockDeals = (item: string): Deal[] => {
  const sellers = [
    'StockX',
    'GOAT',
    'Flight Club',
    'Stadium Goods',
    'Grailed',
    'TicketMaster',
    'SeatGeek',
    'StubHub',
    'Vivid Seats',
    'TickPick'
  ];
  
  // Generate random prices between $100 and $1000
  const getRandomPrice = () => Math.floor(Math.random() * 900) + 100;
  
  // Generate random delivery times (1-7 days)
  const getRandomDeliveryTime = () => `${Math.floor(Math.random() * 7) + 1} days`;
  
  // Generate random availability
  const getRandomAvailability = () => {
    const options = ['In Stock', 'Limited Stock', 'Last Few Items', 'Pre-order', 'Back-order'];
    return options[Math.floor(Math.random() * options.length)];
  };
  
  // Create a deal for each seller
  return sellers.map((seller, index) => ({
    id: `deal-${index}`,
    seller,
    price: getRandomPrice(),
    availability: getRandomAvailability(),
    deliveryTime: getRandomDeliveryTime(),
    item
  }));
};

export const findTopDeals = (deals: Deal[], count: number = 3): Deal[] => {
  // Sort by price (lowest first) and then by delivery time
  return [...deals].sort((a, b) => {
    // First sort by price
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    
    // If prices are equal, sort by delivery time (assuming format is "X days")
    const aDays = parseInt(a.deliveryTime.split(' ')[0]);
    const bDays = parseInt(b.deliveryTime.split(' ')[0]);
    return aDays - bDays;
  }).slice(0, count);
};