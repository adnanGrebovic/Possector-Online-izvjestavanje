import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useAppSelector } from 'src/data/ConfigureData';
import { useState } from 'react';


export default function SimpleLineChart() {
  const { dateRange } = useAppSelector(state => state.date_range);
  const {previousDateRange}= useAppSelector(state=>state.previous_date_range);
  const [datesArray, setDatesArray] = useState<string[]>([]);
  const {cashRegister,loading}= useAppSelector(state=>state.cash_register);
  const {previousCashRegister, prevLoading}= useAppSelector(state=>state.previous_cash_register);
  const [showChart, setShowChart]= useState(false);



  const formatDate = (isoString: string|null) => {
    if (!isoString) return ''; 
  
    const date = new Date(isoString); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  };


  const currentDateRange= `${formatDate(dateRange[0])}-${formatDate(dateRange[1])}`;
  const PreviousDateRange= `${formatDate(previousDateRange[0])}-${formatDate(previousDateRange[1])}`;



  const generateDatesArray = (start: string, end: string, interval: 'hour' | 'day') => {
    const dateArray: string[] = [];
    const startDateUTC = new Date(start);
    const endDateUTC = new Date(end);
  
    const currentDate = new Date(startDateUTC);
  
    if (interval === 'hour') {
      
      endDateUTC.setHours(23, 59, 59, 999); 
  
      while (currentDate <= endDateUTC) {
        const formattedHour = `${currentDate.getHours()}:00`;
        dateArray.push(formattedHour);
        currentDate.setHours(currentDate.getHours() + 1); 
      }
    } else {
      while (currentDate <= endDateUTC) {
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
        dateArray.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1); 
      }
    }
    return dateArray;
  };




  const currentData = React.useMemo(
    () =>
      cashRegister
        ?.map((entry) => entry.TotalRevenue)
        .filter((value): value is number => value !== undefined) || [],

    [cashRegister]
  );


  const previousData = React.useMemo(
    () =>
      previousCashRegister
        ?.map((entry) => entry.TotalRevenue)
        .filter((value): value is number => value !== undefined) || [],
    [previousCashRegister]
  );





React.useEffect(() => {
  if (dateRange[0] && dateRange[1]) {
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    const isSingleDay = startDate.toDateString() === endDate.toDateString();

    const interval = isSingleDay ? 'hour' : 'day';

    const generatedDates = generateDatesArray(
      dateRange[0],
      dateRange[1],
      interval
    );
    setDatesArray(generatedDates);
  } else{
    setDatesArray([]);
  }
}, [dateRange]);





React.useEffect(()=>{
  if((cashRegister?.length ?? 0) > 0 && (previousCashRegister?.length ?? 0)>0 && datesArray.length>0 ){
    setShowChart(true);
  }
  else{
    setShowChart(false);
  }
},[cashRegister, previousCashRegister, datesArray]);




console.log('currentData', currentData);
console.log('previousData', previousData);
console.log("currentDateRange", datesArray);


return (
  showChart && !loading && !prevLoading ? (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: currentData ?? [], label: `Current Revenue ${currentDateRange}` },
        { data: previousData ?? [], label: `Previous Revenue ${PreviousDateRange}` },
      ]}
      xAxis={[{ scaleType: 'point', data: datesArray }]}
      sx={{
        '& .MuiChart-series': {
          marginBottom: '10px', 
          position: 'relative',
          top: '-20px',
        },
      }}
    />
  ) : null
);
}
