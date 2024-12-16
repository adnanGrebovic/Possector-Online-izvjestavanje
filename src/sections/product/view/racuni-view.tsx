import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';

import { _users } from 'src/_mock';

import { applyFilter, getComparator } from 'src/sections/user/utils';
import { UserProps } from 'src/sections/user/user-table-row';
import { Racuni } from 'src/models/racuni';
import CustomDatePicker from 'src/layouts/components/nav-upgrade';
import { useAppSelector, useAppDispatch } from 'src/data/ConfigureData';
import { Typography, Card, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination, TableFooter, MenuItem, TextField, Select } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { DashboardContent } from 'src/layouts/dashboard';
import { UserTableHead } from 'src/sections/user/user-table-head';
import PdfCard from 'src/PDFGenerator/PDFCardInvoice';



// ----------------------------------------------------------------------

export default function RacuniView() {


  const { racuni, loading } = useAppSelector(state => state.invoices);
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [fetchedData, setFetchedData] = useState<Racuni[]>([]); // State to store API response
  const [showFooter, setShowFooter] = useState(false);



  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;



  useEffect(() => {
    if (racuni !== null) {
      setFetchedData(racuni);
    }
  }, [racuni])


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



  const totalSum = useMemo(() =>
    fetchedData.reduce((sum, item) => sum + extractNumber(item.total), 0), [fetchedData]);

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


  const totalPages = Math.ceil(fetchedData.length / table.rowsPerPage);



  return (
    <DashboardContent>

      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Racuni
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', top: '-60px' }}>
        <CustomDatePicker /> {/* Pass the callback */}
      </Box>

      <Box sx={{ position: 'relative', left: '700px', bottom: '170px' }}>
        <PdfCard title='Racuni' />
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
                  { id: 'invoice_number', label: 'ID', align: 'left', paddingRight: 15 },
                  { id: 'DateCreated', label: 'Datum Racuna', align: 'left', paddingRight: 15 },
                  { id: 'waiter_name', label: 'Konobar', align: 'left', paddingRight: 15 },
                  { id: 'payment_type', label: 'Nacin placanja', align: 'left', paddingRight: 15 },
                  { id: 'total', label: 'Ukupno', align: 'left', paddingRight: 10 },
                  { id: '', align: 'center' },
                ]}
              />


              <TableBody>
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((item: Racuni, index) => (
                    <TableRow key={index}>

                      <TableCell sx={{ textAlign: 'right', minWidth: 100, position: 'relative', left: '40px' }}>
                        {item.invoice_number}
                      </TableCell>

                      <TableCell sx={{ textAlign: 'right', minWidth: 150, position: 'relative', left: '80px' }}>
                        {new Date(item.DateCreated).toLocaleDateString()} {new Date(item.DateCreated).toLocaleTimeString()}
                      </TableCell>

                      <TableCell sx={{ textAlign: 'right', minWidth: 100, position: 'relative', left: '85px' }}>
                        {item.waiter_name}
                      </TableCell>

                      <TableCell sx={{ textAlign: 'right', minWidth: 100, position: 'relative', left: '65px' }}>
                        {item.payment_type}
                      </TableCell>

                      <TableCell sx={{ textAlign: 'right', minWidth: 100, position: 'relative', left: '60px' }}>
                        {item.total}
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
                <TableFooter sx={{ position: 'relative', bottom: '5px' }}>
                  {/* Table footer for displaying total sum */}
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

        {/* <TablePagination
          component="div"
          page={table.page}
          count={racuni?.length || 0}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 50]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        /> */}


        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <TablePagination
            component="div"
            page={table.page}
            count={fetchedData.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 50]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Typography sx={{ mr: 1 }}>Page:</Typography>
            <Select
              value={table.page}
              onChange={(e) => table.onChangePage(null, Number(e.target.value))}
              size="small"
              sx={{ minWidth: 80 }}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <MenuItem key={index} value={index}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

      </Card>
    </DashboardContent >
  );


}
// ----------------------------------------------------------------------







export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [filterOption, setFilterOption] = useState<string>('all');
  const dispatch = useAppDispatch();


  const onChangeFilter = useCallback((option: string) => {
    console.log(`Filter changed to: ${option}`);
    setFilterOption(option);
    setPage(0);
  }, []);


  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      const newOrder = isAsc ? 'desc' : 'asc';
      console.log(`Sorting by ${id}, order: ${newOrder}`);
      setOrder(newOrder);
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
      // dispatch(setPageSize(parseInt(event.target.value, 10)));
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
    filterOption,
    onChangeFilter,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}


