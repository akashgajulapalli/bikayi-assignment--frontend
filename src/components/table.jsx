import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import ModalComponent from './modal';
import SelectComponent from './select';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const TableComponent = ({ tableData, categoryData, yearsData, modalData }) => {
  const [category, setCategory] = useState('All');
  const [year, setYear] = useState('All');
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    setData(tableData);
    setDefaultData(tableData);
  }, [tableData])

  useEffect(() => {
    const filteredData = defaultData
      .filter(e => category === 'All' ? e : e.category === category)
      .filter(e => year === 'All' ? e : e.year === year);
    setData(filteredData);
  }, [defaultData, category, year])

  return (
    <Box sx={{ padding: 10 }}>
      <ModalComponent data={modalData} />
      <SelectComponent data={{
        label: 'Category',
        value: category,
        updateFn: setCategory,
        list: categoryData
      }} />
      <SelectComponent data={{
        label: 'Year',
        value: year,
        updateFn: setYear,
        list: yearsData
      }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell >Category</StyledTableCell>
              <StyledTableCell >Year</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data?.length > 0 && data.map((row, index) => (
              <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                <StyledTableCell >{row.category}</StyledTableCell>
                <StyledTableCell >{row.year}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableComponent;