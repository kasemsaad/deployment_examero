import React, { useEffect, useState } from 'react'
import Api_Dashboard from '../../interceptor/interceptorDashboard'
import image from "./../../../assets/image/High Importance.svg"
import { NotifyError } from '../../Alert/alertToast'
import { ToastContainer } from 'react-toastify'
import TablePointAll from '../../../common/Table/PointAllTable/pointAllTable'
import Point from '../points'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function PointAll() {
    const navigate= useNavigate()
    const role = useSelector((state) => state.RoleAccess.role);     
    const acccessDenied = ()=>{
        if (role === "owner"){
            navigate('/dashboard/accessDenied')
        }
    }
    const [Teacher, SetTeacher] = useState([])

    const [pagination, Setpagination] = useState('')
    const [current_page, SetcurrentPage] = useState(1)
    const totalPages = pagination.last_page
    const handelNext = () => {
        if (current_page === totalPages) return;
        SetcurrentPage((prev) => prev + 1);
    };

    const handelPrev = () => {
        if (current_page === 1) return;
        SetcurrentPage((prev) => prev - 1);
    };

    const getALLdataOfTeacher = async () => {
        await Api_Dashboard.get(`points/my-point?page=${current_page}`).then((response) => {
            console.log(response.data.data);
            SetTeacher(response.data.data)
            Setpagination(response.data.meta.pagination);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getALLdataOfTeacher()
        acccessDenied()
    }, [current_page])

  
  


    return (
        <>
        {/* <div id='RewardTeacher'> */}



            <Point
            current_page={current_page}
            totalPages={totalPages}
                next={handelNext}
                handelPrev={handelPrev}
                dataRender={Teacher}
                // teacherTableHead={true}
                flagNoContent={Teacher.length === 0} 

            />








            {/* </div> */}


        </>)
}
