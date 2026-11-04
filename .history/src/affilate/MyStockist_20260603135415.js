import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useUser } from '../context/UserContext';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';
import { useVendor } from '../context/AuthContext';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Toast from '../utils/Toast';


export default function MyStockist() {
    const [stockist, setStockist] = useState();
    const [status, setStatus] = useState();
    const [toast, setToast] = useState()
    const user = useUser()
    console.log(user?.user)

    const {
        setToastMsg,
        setToastType,
      } = useVendor();

    const columns = [
        { id: "1", label: "Name" },
        { id: "2", label: "Email"},
        { id: "3", label: "Address" },
        { id: "4", label: "Phone" },
        { id: "5", label: "Country" },
        { id: "6", label: "City" },
        { id: "7", label: "State" },
        { id: "8", label: "Status" },
        { id: "9", label: "Actions" },
      ];

    const getStockist = () => {
        fetch("https://api.pmall.com.ng/api/v1/stockists/affiliate_stockist",{
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
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

      const getStockistById = () => {
        fetch("https://api.pmall.com.ng/api/v1/stockists/list/" + 16,{
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        })
          .then((resp) => resp.json())
          .then((result) => {
            console.log(result);
            // setStockist(result.data)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const deleteStockist = (Id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this stockist?');
        if (isConfirmed) {
          fetch("https://api.pmall.com.ng/api/v1/stockists/delete/" + Id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          })
            .then((resp) => resp.json())
            .then((result) => {
              if(result.status){
                setToastMsg("Great! Stockist deleted successfully");
                setToastType("success")
                setStatus(result)
                setInterval(() => {
                  setToastMsg("");
                }, 5000);
                console.log(result);
                getStockist()
                // setNewProduct(result)
              }else{
                setToastMsg("Oops! there seems to be an error. Try again")
                setToastType("error")
                setInterval(() => {
                  setToastMsg("");
         }, 3000);
          }
            })
          .catch((err) => {
            console.log(err);
          });
        }
      };

      useEffect(()=>{
        getStockist()
        getStockistById()
      },[status])

  return (
    <div className='all-stkts flex flex-col g-40'>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="My Stockists" image="true" />

        <div className=' add-addy'>
            <Link to="/affiliate/add-stockist">
                <div className='flex g-10 alc new-addy pointer'>
                    <AddCircleOutlineOutlinedIcon />
                    <p>Add Stockist</p>
                </div>
            </Link>
        </div>
        <div className='flex flex-col g-20 '>
          {stockist?.map((data, index) => (
            <div className='flex flex-col g-20 stk-card'>
              <div className='flex justsb'>
                <div className="flex alc g-10 flex-start">
                    <div className={`user__avatar ${data?.is_active == "1" ? "bg-success" : "bg-error"}`}>
                        <h3 className="uppercase">
                        {"AD"}</h3>
                    </div>
                    <div>
                    <p className="bold">{data?.name}</p>
                    <p className="stk-grey">{data?.email}</p>
                  </div>
                  </div>
                  <div className="lheight13 flex alc g-10">
                      <Link to={`/affiliate/edit-stockist/${data.id}`}>
                          <div className='edit'>
                              <EditOutlinedIcon className='ic' />
                          </div>
                      </Link>
                      <div className='delete pointer' onClick={()=>deleteStockist(data?.id)}>
                          <DeleteOutlineOutlinedIcon className='ic' />
                      </div>
                  </div>
              </div>
              <div className='flex justsb'>
                <div className='flex flex-col g-10'>
                  <div className='flex alc g-5'>
                    <p>Address: </p>
                    <p className="stk-grey">{data?.address}</p>
                  </div>
                  <div className='flex alc g-5'>
                    <p>Phone: </p>
                    <p className="stk-grey">{data?.phone}</p>
                  </div>
                  <div className='flex alc g-5'>
                    <p>Country: </p>
                    <p className="stk-grey">{data?.country}</p>
                  </div>
                </div>
                <div className='flex flex-col g-10'>
                  <div className='flex alc g-5'>
                    <p>City: </p>
                    <p className="stk-grey">{data?.city}</p>
                  </div>
                  <div className='flex alc g-5'>
                    <p>State: </p>
                    <p className="stk-grey">{data?.state}</p>
                  </div>
                  <div className='flex flex-end'>
                    <p className={`badge stockist-status ${data?.is_active == "1" ? "bg-success" : "bg-error"}`}>{data?.is_active == "1" ? "Active" : "Inactive"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <TableContainer component={Paper}>
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
                                <div className="flex alc g-10 flex-start">
                                    <div className={`user__avatar ${data?.is_active == "1" ? "bg-success" : "bg-error"}`}>
                                        <h3 className="uppercase">
                                        {data?.name[0]}</h3>
                                    </div>
                                    <p className="">{data?.name}</p>
                                </div>
                            </TableCell>

                            <TableCell >
                                <div className="lheight13">
                                    <p className="">{data?.email}</p>
                                </div>
                            </TableCell>
                            
                            <TableCell >
                                <div className="lheight13">
                                <p className="">{data?.address} </p>
                                </div>
                            </TableCell>

                            <TableCell >
                                <div className="lheight13">
                                <p className="">{data?.phone} </p>
                                </div>
                            </TableCell>

                            <TableCell > 
                            <p className="">{data?.country}</p>
                            </TableCell>
                            <TableCell >
                                <p className="">{data?.city}</p>
                            </TableCell>
                            <TableCell >
                                <p className="">{data?.state}</p>
                            </TableCell>
                            <TableCell >
                                <p className={`badge ${data?.is_active == "1" ? "bg-success" : "bg-error"}`}>{data?.is_active == "1" ? "Active" : "Inactive"}</p>
                            </TableCell>
                            <TableCell >
                                <div className="lheight13 flex alc g-10">
                                    <Link to={`/affiliate/edit-stockist/${data.id}`}>
                                        <div className='edit'>
                                            <EditOutlinedIcon className='ic' />
                                        </div>
                                    </Link>
                                    <div className='delete pointer' onClick={()=>deleteStockist(data?.id)}>
                                        <DeleteOutlineOutlinedIcon className='ic' />
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                        
                    ))}
                </TableBody>
            </Table>
        </TableContainer> */}
    </div>
  )
}
