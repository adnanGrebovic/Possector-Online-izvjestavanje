import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Typography, Stack } from "@mui/material";
import { useAppDispatch } from "src/data/ConfigureData";
import { fetchRacuniAsync } from 'src/sections/product/view/racuniSlice';
import { fetchProdajaArtikalaAsync } from 'src/sections/blog/view/prodajaArtikalaSlice';
import { fetchProdajaPoOperaterimaAsync } from 'src/sections/product/view/prodajaPoOperaterimaSlice';
import { fetchPoreziAsync } from 'src/sections/user/view/poreziSlice';
import { fetchPoreziPoGrupamaAsync } from 'src/sections/user/view/poreziPoGrupamaSlice';
import { fetchUtrosenaRobaAsync } from 'src/sections/overview/view/utrosenaRobaSlice';
import { fetchVrsteplacanjaAsync } from 'src/sections/user/view/vrstePlacanjaSlice';
import { fetchProdajaArtikalaPoOperaterimaAsync } from 'src/sections/overview/view/prodajaArtikalaPoOperaterimaSlice';
import { fetchStanjeRobeAsync } from 'src/sections/product/view/stanjeRobeSlice';
import { fetchPrometPoKupcimaAsync } from 'src/sections/overview/view/prometPoKupcimaSlice';
import { fetchOslobodjenoPorezaAsync } from 'src/sections/overview/view/oslobodjenoPorezaSlice';
import { fetchCashRegisterAsync } from "src/sections/overview/view/cashRegisterSlice";
import { setDateRange } from "src/sections/product/view/dateSlice";
import { fetchPreviousCashRegisterAsync } from "src/sections/overview/view/previousCashRegisterSlice";
import { setPreviousDateRange } from "src/sections/product/view/previousDateSlice";

interface FormValues {
  dateRange: [Date | null, Date | null];
}


export const CustomDatePicker: React.FC = () => {
  const {handleSubmit,control, setValue, watch, formState: { errors }} = useForm<FormValues>({
    defaultValues: {
      dateRange: [null, null],
    },
  });

  const dispatch = useAppDispatch();
  const dateRange = watch("dateRange");
  
  
  const [selectedInterval, setSelectedInterval] = useState<number>(1);  

  const getDateRangeForInterval= (interval: number): [Date, Date]=>{
    const today= new Date();
    const startDate= new Date(today);
    const endDate= new Date(today);
    if(interval===1){
      endDate.setDate(today.getDate()+1);
    } else if(interval===7){  
      const dayOfWeek= today.getDay();
      const diffToMonday= dayOfWeek ===0 ? -6 : dayOfWeek -1; 
      startDate.setDate(today.getDate() - diffToMonday);
      endDate.setDate(startDate.getDate() + 6);
    } else if(interval === 30){
      startDate.setDate(1);
      endDate.setMonth(today.getMonth() + 1);
      endDate.setDate(0);
    } else{
      throw new Error('Invalid intercal. Alowed values: 1(day), 7(week), 30(month)');
    }

    return [startDate, endDate]
  };


  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };
  
  const reportActions: Record<string, Function> = {
    articles_sales: fetchProdajaArtikalaAsync,
    waiters_sales: fetchProdajaPoOperaterimaAsync,
    taxes_total: fetchPoreziAsync,
    taxes_tags: fetchPoreziPoGrupamaAsync,
    goods_spent: fetchUtrosenaRobaAsync,
    payment_types: fetchVrsteplacanjaAsync,
    waiters_articles_sales: fetchProdajaArtikalaPoOperaterimaAsync,
    customers_sales: fetchPrometPoKupcimaAsync,
    tax_free: fetchOslobodjenoPorezaAsync,
    storage_report: fetchStanjeRobeAsync,
    invoices: fetchRacuniAsync,
    cash_register: fetchCashRegisterAsync,
  };
  

  
  
  
  const handleDateChange= (dates: [Date | null, Date | null])=>{
    setValue("dateRange", dates);
    if(dates[0] && dates[1])
      dispatch(setDateRange({ dateRange: [dates[0]?.toISOString(), dates[1]?.toISOString()] }));
    
    const [fromDate, toDate]= dates;

    if(fromDate && toDate){
      const formattedFromDate= formatDate(fromDate);
      const formattedToDate= formatDate(toDate);

      const previousYearFromDate = new Date(fromDate);
      previousYearFromDate.setFullYear(previousYearFromDate.getFullYear() - 1);
      const formattedPreviousYearFromDate= formatDate(previousYearFromDate);

      const previousYearToDate = new Date(toDate);
      previousYearToDate.setFullYear(previousYearToDate.getFullYear() - 1);
      const formattedPreviousYearToDate= formatDate(previousYearToDate);

      dispatch(setPreviousDateRange({dateRange: [previousYearFromDate.toISOString(), previousYearToDate.toISOString()]}));

      dispatch(fetchPreviousCashRegisterAsync({from: formattedPreviousYearFromDate, to: formattedPreviousYearToDate}));


      const dispatchPromises = Object.entries(reportActions).map(([key, action]) =>
        dispatch(action({ from: formattedFromDate, to: formattedToDate }))
      .catch((error: any) => console.error(`Error fetching report for ${key}:`, error))
    );
    
    Promise.all(dispatchPromises)
    .then(() => console.log("All reports fetched successfully"))
    .catch((error) => console.error("Error during report fetching:", error));
    
  
    localStorage.setItem("selectedDateRange", JSON.stringify(dates));
    
  };
}



const handleIntervalClick= (interval: number)=>{
  setSelectedInterval(interval);
 
  const[newFromDate, newToDate]= getDateRangeForInterval(interval);
  
  setValue('dateRange', [newFromDate, newToDate]);
  handleDateChange([newFromDate, newToDate]);
}


  const shiftDateRange= (direction: number)=>{
    const [fromDate, toDate]= dateRange;
    if(fromDate && toDate){
      const newFromDate= new Date(fromDate);
      const newToDate= new Date(toDate);

      if(selectedInterval===1){
        newFromDate.setDate(newFromDate.getDate()+direction);
        newToDate.setDate(newToDate.getDate()+direction);
      } else if(selectedInterval===7){
        newFromDate.setDate(newFromDate.getDate()+direction*7);
        newToDate.setDate(newToDate.getDate()+direction*7);
      } else if(selectedInterval===30){
        const currentMonth= newFromDate.getMonth();
        newFromDate.setMonth(currentMonth+direction);
        newFromDate.setDate(1);
        newToDate.setMonth(currentMonth+direction+1);
        newToDate.setDate(0);
      }
      setValue('dateRange', [newFromDate, newToDate]);
      handleDateChange([newFromDate, newToDate]);
    }
  }

  useEffect(()=>{
    
    const savedDateRange = localStorage.getItem("selectedDateRange");
    if (savedDateRange) {
      const parsedDateRange = JSON.parse(savedDateRange);
      setValue("dateRange", parsedDateRange);
    }
  }, [setValue]);



  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ textAlign: "center" }}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        {/* Interval Navigation */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "primary.main",
              "&:hover": { color: "primary.dark" },
              transition: "color 0.2s ease",
            }}
            onClick={() => shiftDateRange(-1)}
          >
            {"<"}
          </Typography>

          {/* Day, Week, Month Buttons */}
            { ['Day', 'Week', 'Month'].map((label, index) => {
            const interval = index === 0 ? 1 : index === 1 ? 7 : 30;
            return (
              <Typography
                key={label}
                sx={{
                  cursor: 'pointer',
                  fontWeight: selectedInterval === interval ? 'bold' : 'normal',
                  color: selectedInterval === interval ? 'primary.main' : 'text.primary',
                  '&:hover': { color: 'primary.dark', fontWeight: 'bold' },
                  transition: 'color 0.2s ease, font-weight 0.2s ease',
                }}
                onClick={() => handleIntervalClick(interval)}
              >
                {label}
              </Typography>
            );
          })}

            <Typography
              sx={{
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "primary.main",
                "&:hover": { color: "primary.dark" },
                transition: "color 0.2s ease",
              }}
              onClick={() => shiftDateRange(1)}
            >
              {">"}
            </Typography>
        </Stack>


          {/* Single Input for Date Range */}
          <Controller
            control={control}
            name="dateRange"
            rules={{
              validate: ([start, end]) =>
                start && end ? true : "Both start and end dates are required",
            }}
            render={({ field }) => (
              <Stack direction="column" spacing={1}>
                <DatePicker
                  selected={field.value ? field.value[0] : null}
                  onChange={(dates) => handleDateChange(dates as [Date | null, Date | null])}
                  startDate={field.value ? field.value[0] ?? undefined : undefined}
                  endDate={field.value ? field.value[1] ?? undefined : undefined}
                  selectsRange
                  isClearable
                  placeholderText="Select date range"
                />
                {errors.dateRange && (
                  <Typography color="error" variant="body2">
                    {errors.dateRange.message}
                  </Typography>
                )}
              </Stack>
            )}
          />

        </Stack>

    </Box>
  );
};

export default CustomDatePicker;




