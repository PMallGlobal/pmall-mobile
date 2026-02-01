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


export default function Analytics() {
    const columns = [
        { id: "product_image", label: "Product", status: 1 },
        { id: "name", label: "QTY", status: 1 },
        { id: "category", label: "Price",  status: 0 },
      ];
  return (
    <div className='available-stock flex flex-col g-20 analytics'>
        <CategoryHeader title="Analytics" image="true" />

        <div className="flex justsb dates">
            <div className='flex alc date g-10'>
                <p>From:</p>
                <input type="date"></input>
            </div>
            <div className='flex alc date g-10'>
                <p>To:</p>
                <input type="date"></input>
            </div>
        </div>

        <div className='db-cards'>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>New Orders</p>
                    <h2>6</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/lsicon_order-outline.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Stock Inventory</p>
                    <h2>300</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/si_inventory-line.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Track Shipment</p>
                    <h2>26</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/streamline-ultimate_shipment-online-monitor-1.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>PMT Wallet</p>
                    <h2>0.00</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/streamline-plump_wallet-solid.png" alt="" />
                </div>
            </div>
        </div>

        <div className='bg-white rounded-sm p-20'>
            <div className='p-table flex flex-col g-20'>
            <p>Available Stock</p>
            <div className='flex justsb alc'>
                <div className='flex alc search-data g-10'>
                    <SearchOutlinedIcon className='search-ic' />
                    <input type="text" placeholder='Search Products' />
                </div>
                <div className='flex alc g-10 ex-da'>
                    <OpenInNewOutlinedIcon className='ex-ic' />
                    <p>Export Data</p>
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
