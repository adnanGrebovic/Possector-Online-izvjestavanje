import type { UserProps } from './user-table-row';

// ----------------------------------------------------------------------

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------



 export function getComparator(order: 'asc' | 'desc', orderBy: string) {

  
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



  // return (a: any, b: any) => {
  //   const valueA = a[orderBy];
  //   const valueB = b[orderBy];

  //   if (typeof valueA === 'string' && typeof valueB === 'string') {
  //     // Use localeCompare for strings to handle alphabetical sorting
  //     const comparison = valueA.localeCompare(valueB);
  //     return order === 'asc' ? comparison : -comparison;
  //   } 
  //     // For numbers, perform a regular comparison
  //     if (valueA < valueB) return order === 'asc' ? -1 : 1;
  //     if (valueA > valueB) return order === 'asc' ? 1 : -1;
  //     return 0;
    
  // };


  return (a: any, b: any) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (typeof valueA === 'string' || typeof valueB === 'string') {
      const numberA = extractNumber(valueA);
      const numberB = extractNumber(valueB);

      if (!Number.isNaN(numberA) && !Number.isNaN(numberB)) {
        if (numberA < numberB) return order === 'asc' ? -1 : 1;
        if (numberA > numberB) return order === 'asc' ? 1 : -1;
        return 0;
      }

      return order === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
    }

    return 0; 
  };

}


// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: UserProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};

export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
