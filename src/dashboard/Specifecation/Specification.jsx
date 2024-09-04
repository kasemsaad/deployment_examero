import React, { useEffect, useState } from 'react'
import "./Specification.css"
import SpecificationMain from "./../../assets/image/ph_table.svg"
import Api_Dashboard from '../interceptor/interceptorDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2pdf from 'html2pdf.js'; // استيراد مكتبة html2pdf.js
import { useDispatch, useSelector } from 'react-redux';
import { ROLE } from '../../redux/Types/types';
import { fetchRoleAndImage } from '../../redux/reducer/actions/action';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Specification() {

    const [data, setData] = useState([]);
    const [activePlanData, SetactivePlanData] = useState([]);

    const [selectedItem, SetSelected] = useState('')
    const [AlertPoint, SetAlertPoint] = useState('')
    const [AlertPointSuccess, SetAlertPointSuccess] = useState('')
    const [idOfPointSelected, SetidOfPointSelected] = useState('')
    const navigate = useNavigate()

 


    const notify = (AlertPointSuccess) => {
        toast.success(AlertPointSuccess, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    };

    
    const Errornotify = (AlertPoint) => {
        toast.error(AlertPoint, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    };

    useEffect(() => {
        getTeacher()
    }, [])

    // get from input teacher in select to detect connect and points
    const getTeacherInselection =async (e) => {
        const selectedValue = e.target.value;
        SetSelected(selectedValue);
        if (selectedValue) {
            await getConnect(selectedValue);
        }
    }

    const getPoint = (e) => {
        const selectedValue = e.target.value;
        // console.log(selectedValue);
        SetidOfPointSelected(selectedValue);
    }



    // get all teacher data 
    const getTeacher = async () => {
        await Api_Dashboard.get('/teachers/selection').then((response) => {
            setData(response.data.data)
        }).catch((err) => {
            // console.log(err);
        })
    }


    const getConnect = async (selectedItem) => {
        await Api_Dashboard.get(`/plans/${selectedItem}/teacher`).then((response) => {
            SetactivePlanData(response.data.data)
        }).catch((err) => {
            // console.log(err);
        })
    }
    

    const SendSpecification = async (e) => {

        e.preventDefault();
        const payload = {
            teacher_id: selectedItem
        }
        if(idOfPointSelected){
            payload.plan_id=idOfPointSelected  
        }
        // console.log(payload);

      await Api_Dashboard.post('/specification', payload).then((response) => {
        // console.log(response);
            let x=response.data.message
            SetAlertPointSuccess("تم التحميل بنجاح")
            notify(x)
            generatePdf()
        }).catch((err) => {
            // console.log(err);
            let x=err.response.data.message
            SetAlertPoint(x);
            Errornotify(x)
        })
    }

    const generatePdf = async () => {
        const input = document.querySelector(".specificationContent");
        html2canvas(input, {
            scale: 2 // Increase the scale for higher resolution
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4'); // Landscape orientation
    
            // Get page dimensions
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
    
            // Set the image width and height to fill the entire page
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    
            pdf.save("specification.pdf");
        });
         } 
    const downloadPDF = () => {
        const element = document.getElementById('specificationContent');
        const tableHeight = element.offsetHeight;
        const opt = {
            margin: [0, 0, 0, 0], // Set margins to zero
            filename: 'specification.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 }, // Adjust scale to fit content within the page
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save('specification.pdf');
    }

    return (
        <>
            <ToastContainer position='top-center' />

            <div id="" className="container  pb-4 " style={{ overflow: 'auto', marginTop: '18px', direction: 'rtl', height: 'auto', border: "2px solid purble", borderRadius: "10px", width: "90%", margin: "auto" }}>

                <div className='col-12  mt-3 d-flex ' style={{ alignItems: "center", }}>
                    <div className="" style={{ width: "5.333333%" }}>
                        <img src={SpecificationMain} className="img-fluid rounded-circle" alt="صورة شخصية" />
                    </div>
                    <div className='col-6'>
                        <p className='headerOfAllOpen' style={{ margin: '0', padding: "0", color: "#FFFFFF", fontWeight: "700", fontSize: '24px' }}>جدول المواصفات </p>
                    </div>
                </div>

                <div className="wraper_input_spesify x mt-4">

                    <div className='col-12 ' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                        <div className='col-5'>
                            <label htmlFor="">اسم المدرسه</label>
                            <input type="text" placeholder='أدخل اسم المدرسة' className='form-control mt-2' />
                        </div>

                        <div className='col-5'>
                            <label htmlFor="">اسم المبحث</label>
                            <input type="text" placeholder='أدخل اسم المدرسة' className='form-control mt-2' />
                        </div>
                    </div>





                    <div className='col-12 ' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className='col-5 mt-2'>
                            <label htmlFor="">العام الدراسي</label>
                            <input type="text" placeholder='أدخل اسم المدرسة' className='form-control mt-2' />
                        </div>
                        <div className='col-5 mt-2'>
                            <label htmlFor="">اسم الصف</label>
                            <input type="text" placeholder='أدخل اسم المدرسة' className='form-control mt-2' />
                        </div>
                    </div>
                    <form onSubmit={SendSpecification}>
                        <div>
                            <div className='col-12 mt-2' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div className='col-5'>
                                    <label htmlFor="">اسم المعلم</label>
                                    <select
                                        id="dataSelect"
                                        className="form-select mt-2"
                                        // value=""
                                        onChange={getTeacherInselection}
                                        required
                                    >
                                        <option value="" disabled selected>اختر اسم المعلم</option>
                                        {data.map((item, index) => (
                                            <option className='background_drop'  onClick={()=>getConnect()} key={index} value={item.id}>
                                                {item.email}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className='col-5'>
                                    <label htmlFor="">اسم الباقه</label>
                                    <select
                                        id="dataSelect"
                                        className="form-select mt-2"
                                        // value=""
                                        onChange={getPoint}
                                        
                                    >
                                        <option value="" disabled selected>اختر اسم الباقه</option>
                                        {activePlanData.map((item, index) => (
                                            <option className='background_drop'   key={index} value={item.plan.id}>
                                                {item.plan.name}
                                            </option>
                                        ))}
                                    </select>                  
                                    </div>

                            </div>


                        </div>

                        <div className='table_wrabber mt-3 col-12  ' style={{ textAlign: "center", overflowX: 'auto' }}>
<div className='specificationContent'>


                            <table className="table table-bordered mt-4 table-secondary "   >
                                <thead className=''>
                                    <tr>
                                        <th rowSpan="2">الرقم</th>
                                        <th rowSpan="2">الوحدة</th>
                                        <th rowSpan="2">عدد النتاجات</th>
                                        <th colSpan="2">وزن الوحدة</th>
                                        <th colSpan="3">القدرات العقلية</th>
                                    </tr>
                                    <tr>
                                        <th>عدد النتاجات للوحدة/ مجموع نتاجات الوحده %</th>
                                        <th>علامات الوحدة = وزن الوحده × علامة الامتحان الكلية</th>
                                        <th>معرفة 50%</th>
                                        <th>تطبيق 30%</th>
                                        <th>مهارات تفكير عليا 20%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="number" className='form-control' /> </td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="number" className='form-control' /> </td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                    </tr>


                                    <tr>
                                        <td><input type="number" className='form-control' /> </td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="number" className='form-control' /> </td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="number" className='form-control' /> </td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                        <td><input type="text" className='form-control' /></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div className='' style={{ direction: 'ltr', textAlign: "left" }}>

                                <button  type='submit' style={{ backgroundColor: "#C01F59" ,color:"white"}} className='btn '>تحميل الجدول</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
