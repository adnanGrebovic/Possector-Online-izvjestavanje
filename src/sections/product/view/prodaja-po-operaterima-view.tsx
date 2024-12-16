import React, { useState, useCallback, useMemo, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';

import { UserProps } from 'src/sections/user/user-table-row';
import { applyFilter, getComparator } from 'src/sections/user/utils';
import { UserTableHead } from 'src/sections/user/user-table-head';
import CustomDatePicker from 'src/layouts/components/nav-upgrade';
import { useAppSelector, useAppDispatch } from 'src/data/ConfigureData';
import { TableBody, TableRow, TableCell, TableFooter } from '@mui/material';
import { Items } from 'src/models/univerzalni';
import PdfCard from 'src/PDFGenerator/PDFCardWaitersSales';




// ----------------------------------------------------------------------

export function ProdajaPoOperaterimaView() {
  const { prodajaPoOperaterima } = useAppSelector(state => state.waiters_sales);
  const dispatch = useAppDispatch();
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [fetchedData, setFetchedData] = useState<Items[]>([]); // State to store API response
  const [showFooter, setShowFooter] = useState(false);


  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    if (prodajaPoOperaterima !== null) {
      setFetchedData(prodajaPoOperaterima.Items);
    }
  }, [prodajaPoOperaterima]);



  const sortedData = useMemo(() =>
    fetchedData.slice().sort(getComparator(table.order, table.orderBy)),
    [fetchedData, table.order, table.orderBy]
  );


  function extractNumber(value: any): number {
    if (typeof value === 'number') return value;

    if (!value || typeof value !== 'string') return 0;

    const cleanedString = value.replace(/[^0-9.,-]/g, '');

    const hasComma = cleanedString.includes(',');
    const hasDot = cleanedString.includes('.');
    const isEuropeanFormat = hasComma && (!hasDot || cleanedString.indexOf(',') > cleanedString.indexOf('.'));

    const normalizedString = isEuropeanFormat
      ? cleanedString.replace(/\./g, '').replace(',', '.')
      : cleanedString.replace(/,/g, '');

    const number = parseFloat(normalizedString);

    return Number.isNaN(number) ? 0 : number;
  }

  // Calculate the sum of all 'total' values using useMemo
  const totalSum = useMemo(() =>
    fetchedData.reduce((sum, item) => sum + extractNumber(item.TotalFormatted), 0), [fetchedData]);


  const paginatedData = useMemo(() => {
    const startIndex = table.page * table.rowsPerPage;
    const endIndex = startIndex + table.rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, table.page, table.rowsPerPage]);


  React.useEffect(() => {
    if (fetchedData.length > 0) {
      setShowFooter(true);
    }
    else {
      setShowFooter(false);
    }
  }, [fetchedData])

  return (
    <DashboardContent>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Prodaja po operaterima
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', top: '-60px' }}>
        <CustomDatePicker /> {/* Pass the callback */}
      </Box>

      <Box sx={{ position: 'relative', left: '700px', bottom: '170px' }}>
        <PdfCard title='Prodaja po opraterima' />
      </Box>

      <Card sx={{ bottom: '130px' }}>


        <Scrollbar>
          <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked: any) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }

                headLabel={[

                  { id: 'Name', label: 'Naziv', align: 'left', paddingRight: 15 },
                  { id: 'Value', label: 'Cijena', align: 'left', paddingRight: 15 },
                  { id: 'Quantity', label: 'Kolicina', align: 'left', paddingRight: 15 },
                  { id: 'Percentage', label: 'Postotak', align: 'left', paddingRight: 15 },
                  { id: 'TotalFormatted', label: 'Ukupno formatirano', align: 'left', paddingRight: 10 },
                  { id: '' },
                ]}
              />
              <TableBody>
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((item: Items, index) => (
                    <TableRow key={index}>

                      <TableCell sx={{ paddingLeft: '30px', textAlign: 'left', minWidth: 150, position: 'relative', left: '110px' }}>
                        {item.Name}
                      </TableCell>

                      <TableCell sx={{ paddingRight: '40px', textAlign: 'right', minWidth: 100, position: 'relative', left: '100px' }}>
                        {item.Value}
                      </TableCell>

                      <TableCell sx={{ paddingRight: '40px', textAlign: 'right', minWidth: 100, position: 'relative', left: '70px' }}>
                        {item.Quantity}
                      </TableCell>

                      <TableCell sx={{ paddingRight: '40px', textAlign: 'right', minWidth: 100, position: 'relative', left: '85px' }}>
                        {item.Percentage}
                      </TableCell>

                      <TableCell sx={{ paddingRight: '40px', textAlign: 'right', minWidth: 150, position: 'relative', left: '115px' }}>
                        {item.TotalFormatted}
                      </TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

              {showFooter && (
                <TableFooter sx={{position: 'relative', bottom: '5px'}}>
                  <TableRow>
                    <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold', fontSize: 17 }}>
                      Total Sum:
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', fontFamily: 'monospace', border: '2px solid #000', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', fontSize: 17 }}>
                      {totalSum.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={sortedData.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 50]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent >
  );
}

// ----------------------------------------------------------------------

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
