import React, { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Sectors } from 'src/models/sectors';
import { ParsedStolovi, Stolovi } from 'src/models/stolovi';
import { Narudzbe, ParsedItems } from 'src/models/racuni';
import type { UserProps } from '../user-table-row';
import { applyFilter, getComparator } from '../utils';


// Define the useTable hook at the bottom or top of the file
export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}


export function StoloviView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [sektori, setSektori] = useState<Sectors[]>([]);
  const [stolovi, setStolovi] = useState<ParsedStolovi[]>([]);
  const [racun, setRacun] = useState<ParsedItems[]>([]);
  const [showTable, setShowTable] = useState(false);



  // Fetch sectors and tables from different APIs
  useEffect(() => {
    const fetchSektori = async () => {
      try {
        const response = await fetch('http://192.168.2.46:1234/sectors'); 
        const data: Sectors[] = await response.json();
        setSektori(data);
      } catch (error) {
        console.error('Error fetching sektori:', error);
      }
    };

    fetchSektori();
  }, []);


  const fetchStolovi = async (data: string) => {
    try {
      const response = await fetch(data);
      const data1: Stolovi[] = await response.json();
      const parsedData: ParsedStolovi[] = [];
      data1.forEach((item, index) => {
        parsedData.push({
          Id: item.Id,
          Name: item.Name,
          Waiter: item.Waiter?.Name,
          Orders: item.Orders
        })
      })

      setStolovi(parsedData);
    }
    catch (error) {
      console.error('Error fetching stolovi:', error);
    };
  }


  const fetchRacun = async (data: string) => {
    try {
      const response = await fetch(data);
      const data1: Narudzbe[] = await response.json();
      const parsedData: ParsedItems[] = [];
      if (data1.length > 0) {
        const dateCreated = data1[1].DateCreated;
        const invoiceNumber = data1[1].InvoiceNumber;
        data1[1].Items.forEach((item, index) => {
          parsedData.push({
            Id: item.Id,
            InvoiceNumber: invoiceNumber,
            Price: item.Price,
            Total: item.Total,
            Quantity: item.Quantity,
            DateCreated: dateCreated,
            Article: {
              Name: item.Article.Name,
              Price: item.Article.Price,
            },
          })
        })
      }
      setRacun(parsedData);
      console.log(parsedData);

    }
    catch (error) {
      console.error('Error fetching stolovi:', error);
    };
  }




  const [firstDropdownValue, setFirstDropdownValue] = useState('');
  const [secondDropdownValue, setSecondDropdownValue] = useState('');

  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  // const notFound = !dataFiltered.length && !!filterName;



  const handleFirstDropdownChange = (event: SelectChangeEvent<string>) => {
    setFirstDropdownValue(event.target.value as string);
    fetchStolovi(event.target.value as string);

  };

  const handleSecondDropdownChange = (event: SelectChangeEvent<string>) => {
    setSecondDropdownValue(event.target.value as string);
    fetchRacun(event.target.value as string);
  };


  React.useEffect(() => {
    if (firstDropdownValue && secondDropdownValue) {

      const selectedStolovi = stolovi.find((stol) => stol.Orders === secondDropdownValue);

      if (selectedStolovi && selectedStolovi.Waiter) {
        setShowTable(true);
      } 
      else {
        setShowTable(false);
      }
    } 
    else {
      setShowTable(false);
    }
  }, [firstDropdownValue, secondDropdownValue, stolovi])


  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Stolovi
        </Typography>
      </Box>

      

      {/* Dropdown menus */}
      <Box
        display="flex"
        gap={2}
      >
        <FormControl fullWidth sx={{ minWidth: 150 }}>
          <InputLabel id="first-dropdown-label">Sektori</InputLabel>
          <Select
            labelId="first-dropdown-label"
            id="first-dropdown"
            value={firstDropdownValue}
            onChange={handleFirstDropdownChange}
            label="Sektori"
            sx={{
              paddingRight: '8px',
            }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {sektori.map((sektor) => (
              <MenuItem key={sektor.Id} value={sektor.Tables}>
                {sektor.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ minWidth: 150 }}>
          <InputLabel id="second-dropdown-label">Stolovi</InputLabel>
          <Select
            labelId="second-dropdown-label"
            id="second-dropdown"
            value={secondDropdownValue}
            onChange={handleSecondDropdownChange}
            label="Stolovi"
            sx={{
              paddingRight: '8px',
            }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {stolovi.map((_stolovi) => (
              <MenuItem key={_stolovi.Id} value={_stolovi.Orders}>
                {_stolovi.Waiter ? `${_stolovi.Name} Konobar: ${_stolovi.Waiter}` : _stolovi.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>


      {showTable && (
        <Box
          sx={{
            width: '700px', // Adjust as needed for your layout
            margin: '0 auto',
            padding: 2,
            border: '1px solid black',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: 5
          }}
        >
          {/* Title */}
          <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
            Pregled Stola
          </Typography>

          {/* Headers */}
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            sx={{ fontWeight: 'bold', borderBottom: '1px solid black', paddingBottom: 1, paddingX: 2 }}
          >
            <Typography sx={{ flex: 1, textAlign: 'left' }}>Name</Typography>
            <Typography sx={{ flex: 1, textAlign: 'center' }}>Quantity</Typography>
            <Typography sx={{ flex: 1, textAlign: 'center' }}>Article Price</Typography>
            <Typography sx={{ flex: 1, textAlign: 'center' }}>Price</Typography>
            <Typography sx={{ flex: 1, textAlign: 'right' }}>Date Created</Typography>
          </Box>

          {/* Items */}
          {racun.map((item) => (

            <Box
              key={item.Id}
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{ paddingTop: 1, paddingBottom: 1, borderBottom: '1px dashed black', paddingX: 2 }}
            >
              <Typography sx={{ flex: 1, textAlign: 'left' }}>{item.Article.Name}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'center' }}>{item.Quantity}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'center' }}>{item.Article.Price.toFixed(2)}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'center' }}>{item.Total.toFixed(2)}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'right' }}>{new Date(item.DateCreated).toLocaleDateString()} {new Date(item.DateCreated).toLocaleTimeString()}</Typography>
              
            </Box>
          ))}

          {/* Total Price */}
          <Box
            display='flex'
            justifyContent='space-between'
            width="100%"
            sx={{ marginTop: 2, fontWeight: 'bold', borderTop: '1px solid black', paddingTop: 1 }}
          >
            <Typography>Total</Typography>
            <Typography>
              {racun.reduce((acc, curr) => acc + curr.Price * curr.Quantity, 0).toFixed(2)}
            </Typography>
          </Box>

        </Box>
      )}

    </DashboardContent>
  );
}

