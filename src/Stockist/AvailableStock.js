import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";


export default function AvailableStock() {
    const columns = [
        { id: "product_image", label: "Product", status: 1 },
        { id: "name", label: "QTY", status: 1 },
        { id: "category", label: "Price",  status: 0 },
      ];
  return (
    <div className='available-stock flex flex-col g-20'>
        <CategoryHeader title="Available Stock" image="true" />
        <div className='bg-white rounded-sm p-20'>
            <div className='p-table flex flex-col g-20'>
            <div className='flex justsb alc'>
                <p>Products Table</p>
                <div className='flex alc g-10 ex-da'>
                    <OpenInNewOutlinedIcon className='ex-ic' />
                    <p>Export Data</p>
                </div>
            </div>
            <div className='flex alc justsb'>
                <div className='flex alc date g-10'>
                    <p>Date Range:</p>
                    <input type="date"></input>
                </div>
                <div className='flex alc search-data g-10'>
                    <SearchOutlinedIcon className='search-ic' />
                    <input type="text" placeholder='Search Products' />
                </div>
            </div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="Product Table" 
            sx={{
                '& .MuiTableCell-body': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 60,    
                py: 2,
                color:'#03001E'     
                },
                '& .MuiTableCell-head': {
                whiteSpace: 'nowrap',
                fontSize: 16,
                py: 2,
                },
            }}
            >
                <TableHead>
                <TableRow>
                    {columns?.map((column) => (
                    <TableCell>{column.label}</TableCell>
                    ))}
                </TableRow>
                </TableHead>
                <TableBody>
                    {columns?.map((product, index) => (                   
                        <TableRow key={product?.id} className="capitalize" sx={{
                            backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                            '&:hover': {
                            backgroundColor: '#f0f0f0',
                            },
                        }}>
                        <TableCell >
                            <div className="lheight13">
                            <p className="badge">Detox Plus</p>
                            </div>
                        </TableCell>

                        <TableCell >
                            <div className="lheight13">
                            <p className="badge">123 </p>
                            </div>
                        </TableCell>

                        <TableCell > 
                        <p className="badge"> #2400 </p>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    </div>
    </div>
  )
}
