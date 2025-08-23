export interface CardType {
    id: string;
    title: string;
    value: string;
    yesterday: string;
    currentMonth: string;
    lastMonth: string;
  }
  
  export const dataItems: CardType[] = [
    { id: '1', title: 'CPC', value: '$0', yesterday: '$0', currentMonth: '$0', lastMonth: '$0' },
    { id: '2', title: 'Payout', value: '$0', yesterday: '$0', currentMonth: '$0', lastMonth: '$0' },
    { id: '3', title: 'Margin', value: '0%', yesterday: '0%', currentMonth: '0%', lastMonth: '0%' },
    { id: '4', title: 'Profit', value: '$0', yesterday: '$0', currentMonth: '$0', lastMonth: '$0' },
    { id: '5', title: 'Conversions', value: '0', yesterday: '0', currentMonth: '0', lastMonth: '0' },
    { id: '6', title: 'Unique Clicks', value: '0', yesterday: '0', currentMonth: '0', lastMonth: '0' },
    { id: '7', title: 'Invalid Clicks', value: '0', yesterday: '0', currentMonth: '0', lastMonth: '0' },
    { id: '8', title: 'Revenue', value: '$0', yesterday: '$0', currentMonth: '$0', lastMonth: '$0' },
    { id: '9', title: 'Gross Click', value: '0', yesterday: '0', currentMonth: '0', lastMonth: '0' },
    { id: '10', title: 'EPC', value: '$0', yesterday: '$0', currentMonth: '$0', lastMonth: '$0' },
    { id: '11', title: 'Clicks', value: '0', yesterday: '0', currentMonth: '0', lastMonth: '0' },
    { id: '12', title: 'Impressions', value: '0', yesterday: '0', currentMonth: '0', lastMonth: '0' },
  ];
  