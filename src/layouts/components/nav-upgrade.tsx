// import type { StackProps } from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import DatePicker from 'react-datepicker';

// // ----------------------------------------------------------------------

// export function CustomDatePicker({ sx, ...other }: StackProps) {
//   const { register, handleSubmit, setValue, watch } = useForm();

//   // Get current "from" and "to" values using watch
//   const fromDate = watch('fromDate');
//   const toDate = watch('toDate');

//   // Submit handler
//   const onSubmit = (data: any) => {
//     console.log('Form Submitted', data);
//   };

//   // Helper to handle date selection
//   const handleDateChange = (date: any, field: any) => {
//     setValue(field, date); // Update the form state
//   };

//   // Keydown handler for navigation
//   const handleKeyDown = (event: any, field: any) => {
//     const currentDate = watch(field);
//     if (currentDate) {
//       const newDate = new Date(currentDate);
//       if (event.key === 'ArrowUp') {
//         newDate.setDate(newDate.getDate() + 1); // Increment date
//       } else if (event.key === 'ArrowDown') {
//         newDate.setDate(newDate.getDate() - 1); // Decrement date
//       }
//       setValue(field, newDate); // Update the form state
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       flexDirection="column"
//       sx={{ mb: 4, textAlign: 'center', ...sx }}
//       {...other}
//     >
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="fromDate">From Date:</label>
//           <DatePicker
//             id="fromDate"
//             selected={fromDate}
//             onChange={(date) => handleDateChange(date, 'fromDate')}
//             onKeyDown={(event) => handleKeyDown(event, 'fromDate')}
//             placeholderText="Select From Date"
//             {...register('fromDate')}
//           />
//         </div>
//         <div>
//           <label htmlFor="toDate">To Date:</label>
//           <DatePicker
//             id="toDate"
//             selected={toDate}
//             onChange={(date) => handleDateChange(date, 'toDate')}
//             onKeyDown={(event) => handleKeyDown(event, 'toDate')}
//             placeholderText="Select To Date"
//             {...register('toDate')}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </Box>
//   );
// }

// // Mock useForm for now (your actual useForm hook should come from 'react-hook-form')
// function useForm(): { register: any; handleSubmit: any; setValue: any; watch: any; } {
//   throw new Error('Function not implemented.');
// }





import type { StackProps } from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { textGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function NavUpgrade({ sx, ...other }: StackProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ mb: 4, textAlign: 'center', ...sx }}
      {...other}
    />
      
    
  );
}
