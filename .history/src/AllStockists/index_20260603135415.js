import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Toast from '../utils/Toast';



export default function AllStockists() {
    const [stockist, setStockist] = useState();
    const [toast, setToast] = useState()
    const columns = [
        { id: "1", label: "Name" },
        { id: "2", label: "Email"},
        { id: "3", label: "Address" },
        { id: "4", label: "Phone" },
        { id: "5", label: "Country" },
        { id: "6", label: "City" },
        { id: "7", label: "State" },
        { id: "8", label: "Status" },
      ];

    const getStockist = () => {
        fetch("https://api.pmall.com.ng/api/v1/stockists/fetchstockist",{
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            // Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        })
          .then((resp) => resp.json())
          .then((result) => {
            console.log(result);
            setStockist(result.data)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(()=>{
        getStockist()
      },[])

  return (
    <div className='all-stkts flex flex-col g-40'>
         {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="All Stockists" image="true" />
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
                    {stockist?.map((data, index) => (                   
                        <TableRow key={data?.id} className="capitalize" sx={{
                            backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                            '&:hover': {
                            backgroundColor: '#f0f0f0',
                            },
                        }}>
                            <TableCell >
                                <div className="lheight13">
                                <p className="badge">{data?.name}</p>
                                </div>
                            </TableCell>

                            <TableCell >
                                <div className="lheight13">
                                    <p className="badge">{data?.email}</p>
                                </div>
                            </TableCell>
                            
                            <TableCell >
                                <div className="lheight13">
                                <p className="badge">{data?.address} </p>
                                </div>
                            </TableCell>

                            <TableCell >
                                <div className="lheight13">
                                <p className="badge">{data?.phone} </p>
                                </div>
                            </TableCell>

                            <TableCell > 
                            <p className="badge">{data?.country}</p>
                            </TableCell>
                            <TableCell >
                                <p className="badge">{data?.city}</p>
                            </TableCell>
                            <TableCell >
                                <p className="badge">{data?.state}</p>
                            </TableCell>
                            <TableCell >
                                <p className="badge">{data?.is_active == 1 ? "Active" : "Inactive"}</p>
                            </TableCell>
                        </TableRow>
                        
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
