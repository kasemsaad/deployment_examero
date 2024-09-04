import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import img from './../../assets/image/02-01 1.png';
import mainCertificate from './../../assets/image/ph_certificate.svg';
import fowrword from './../../assets/image/Forward.svg';

import Api_website from '../../utlis/axios_utils_websit.jsx';
import chain from '../../dashboard/font/chain.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import image_ from './../../assets/image/1-01 1.png';
import image_2 from './../../assets/image/04-01 1 (3).png';
import image_3 from './../../assets/image/05-01 2.png';
import image_4 from './../../assets/image/5469061_Монтажная область 1 1.png';
import image_5 from './../../assets/image/6_Монтажная область 1 1.png';
import image_6 from './../../assets/image/02-01 1 (2).png';


import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

    

function CertificationTeacher() {
    const [user, setInput] = useState({
        firstName: '',
        teacher_name:"",
        manger_school:"",
        techerName:""
    });   
     const layoutBackground = useSelector((state) => state.dark.lay);

     const getinput = (e) => {
        user[e.target.name] = e.target.value
        setInput(user);
    }

    const [logoSchool, setLogoSchool] = useState(null);
    const getLogoSchool = (e) => {
        if (e.target.name === 'logo_school') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setLogoSchool(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    const [data, setData] = useState([]);
    const [activePlanData, SetactivePlanData] = useState([]);
    const [selectedItem, SetSelected] = useState('');
    const [AlertPoint, SetAlertPoint] = useState('');
    const [AlertPointSuccess, SetAlertPointSuccess] = useState('');
    const [idOfPointSelected, SetidOfPointSelected] = useState('');

    const notify = (alertPointSuccess) => {
        toast.success(alertPointSuccess, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const errorNotify = (alertPoint) => {
        toast.error(alertPoint, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const getConnect = async () => {
        await Api_website.get(`/teachers/plans`).then((response) => {
            SetactivePlanData(response.data.data);
        }).catch((err) => {
        });
    }

    const sendSpecification = async (e) => {
        e.preventDefault();
    
        // Check each field and display a specific error message if it's empty
        if (!user.firstName) {
            errorNotify("يرجى إدخال اسم الطالب.");
            return;
        }
        if (!user.teacher_name) {
            errorNotify("يرجى إدخال اسم المعلم في الشهادة.");
            return;
        }
        if (!user.manger_school) {
            errorNotify("يرجى إدخال اسم مدير المدرسة.");
            return;
        }
        if (!idOfPointSelected) {
            errorNotify("يرجى اختيار باقة.");
            return;
        }
    
        // Payload creation
        const payload = {};
        if (idOfPointSelected !== "rewards") {
            payload.plan_id = idOfPointSelected;
        }
    
        if (!c) {
            errorNotify("يرجى اختيار شهادة أولاً.");
            return;
        }
    
        // API call to send the data
        try {
            const response = await Api_website.post('/teachers/certificate', payload);
            const successMessage = response.data.message;
            SetAlertPointSuccess(successMessage);
            notify(successMessage);
            generateCertificate();
        } catch (err) {
            const errorMessage = err.response.data.message;
            SetAlertPoint(errorMessage);
            errorNotify(errorMessage);
        }
    }

    const getPoint = (e) => {
        const selectedValue = e.target.value;
        SetidOfPointSelected(selectedValue);
    }

    useEffect(() => {
        getConnect();
    }, []);

    const x = image_;
    let [c, setC] = useState("");

    const onImg = (v) => {
        notify("تم اختيار الشهاده بنجاح")
        setC(v);
    }

    const generateCertificate = () => {
        let f = "خالد";

        let d = "مصطفي";

        let x = "";

        const doc = new jsPDF({
            orientation: 'landscape', // or 'portrait', depending on your certificate orientation
            unit: 'px',
            format: [690, 504] // Use the image's width and height in pixels
        });
        const img = new Image();
        const originalWidth = 690;  // Original image width
    const originalHeight = 504; // Original image height

    // Calculate the aspect ratio
    const aspectRatio = originalHeight / originalWidth;

    // Determine the PDF page width and height
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Calculate the new height based on the page width while maintaining the aspect ratio
    const newHeight = pageWidth * aspectRatio;

    let finalWidth = pageWidth;
    let finalHeight = newHeight;
    if (newHeight > pageHeight) {
        finalHeight = pageHeight;
        finalWidth = pageHeight / aspectRatio;
    }


        // Add background image مهمه 
        // doc.addImage(c, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        doc.addImage(c, 'PNG', 0, 0, finalWidth, finalHeight);

        doc.addFileToVFS('Amiri-Regular.ttf', chain);
        doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
        doc.setFont('Amiri');

        if (logoSchool) {
            doc.addImage(logoSchool, 'PNG', 538, 70, 80, 70);  
        }

        doc.setFontSize(27);
        doc.text(user.teacher_name, 505, 229, { align: 'right' }); 
        doc.setFontSize(27);
        doc.text(user.firstName, 320, 227, { align: 'right' }); 
        
        doc.setFontSize(27);
        doc.text(user.manger_school, 500, 400, { align: 'right' });

        doc.setFontSize(27);
        doc.text(user.teacher_name, 229, 400, { align: 'right' }); 

        // Save the PDF
        doc.save(`${user.firstName}-${user.teacher_name}-${user.manger_school}-${user.teacher_name}.pdf`);
    };

    return (
        <>
            <ToastContainer position='top-center' />
            <form onSubmit={sendSpecification}>
                <div className="container pb-4" style={{ overflow: 'auto', marginTop: '18px', direction: 'rtl', height: 'auto', border: "2px solid purble", borderRadius: "10px", width: "90%", margin: "auto" ,backgroundColor: layoutBackground === "#0E0A43" ? "#0E0A43" : "#ECECEC",
        color: layoutBackground === "#0E0A43" ? "white" : "black",
        fontSize: "18px"  }}>
                    <div className='col-12 mt-3 d-flex' style={{ alignItems: "center" ,"paddingTop":'1rem'}}>
                        <div className="" style={{ width: "5.333333%" }}>
                            <img src={mainCertificate} className="img-fluid rounded-circle" alt="صورة شخصية" style={{ width: '23px', height: '23px' }} />
                        </div>
                        <div className='col-6'>
                            <p style={{ margin: '0', padding: "0", color: "#FFFFFF", fontSize: '24px', backgroundColor: layoutBackground === "#0E0A43" ? "#0E0A43" : "#ECECEC",
        color: layoutBackground === "#0E0A43" ? "white" : "black",
        fontSize: "24px"  }}>شهادات التقدير
                            </p>
                        </div>
                    </div>
                    <div className='col-12 mt-4'>
                        <div style={{ width: "170px", height: "27px", backgroundColor: '#FF7380', borderRadius: '112px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div>
                                <p style={{ margin: "0", padding: "0", color: "#000000", fontSize: "14px" }}>استخراج شهادة</p>
                            </div>
                            <div style={{ marginRight: "20px" }}>
                                <img src={fowrword} alt="fowrword" />
                            </div>
                        </div>
                    </div>
                    <div className='wraber_input_certify mt-3' style={{ display: "flex" }}>
                        <div className='col-4'>
                            <label htmlFor="student">اسم الطالب</label>
                            <input type="text" name="firstName" id="" className='form-control' onChange={getinput} />
                            <div className='mt-3'>
                                <label htmlFor="student"> اسم المعلم في (الشهاده)</label>
                                <input type="text" name="teacher_name" id="" className='form-control' onChange={getinput} />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="student">اسم الباقة</label>
                                <select
                                    id="dataSelect"
                                    className="form-select"
                                    onChange={getPoint}
                                >
                                    <option value="" disabled selected>اختر اسم الباقه</option>
                                    <option value="rewards">المكافآت</option>

                                    {activePlanData.map((item, index) => (
                                        <option key={index} value={item.plan.id}>
                                            {item.plan.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="student">اسم مدير المدرسة</label>
                                <input type="text" name="manger_school" id="" className='form-control' onChange={getinput} />
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="student">  شعار المدرسه ان وجد</label>
                                <input type="file" name="logo_school" id="" className='form-control' onChange={getLogoSchool} />
                            </div>
                        </div>
                        <div className='col-7' style={{ marginRight: "25px" }}>
                            <div className='col-12'>
                                <label htmlFor="exampleFormControlTextarea1">سبب منح الشهادة</label>
                                <textarea  className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                   
                    <div className='wrapper_certificate_image mt-4' style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap"}}>
    <div style={{width:"15vw"}}>
        <img
            src={image_}
            alt=""
            width={"100%"}
            className={`certificate-image ${c === "/static/media/1-01 1.bd62874641d2b6709fa7.png" ? "selected-image" : "noSelect"}`}
            onClick={() => onImg("/static/media/1-01 1.bd62874641d2b6709fa7.png")}
        />
    </div>

    <div style={{width:"15vw"}}>
        <img
            src={image_2}
            alt=""
            width={"100%"}
            className={`certificate-image ${c === "/static/media/04-01 1 (3).86a1a4dfab78c402e4d5.png" ? "selected-image" : "noSelect"}`}
            onClick={() => onImg("/static/media/04-01 1 (3).86a1a4dfab78c402e4d5.png")}
        />
    </div>

    <div style={{width:"15vw"}}>
        <img
            src={image_3}
            alt=""
            width={"100%"}
            className={`certificate-image ${c === "/static/media/05-01 2.d2bb0e7989fa79279762.png" ? "selected-image" : "noSelect"}`}
            onClick={() => onImg("/static/media/05-01 2.d2bb0e7989fa79279762.png")}
        />
    </div>

    <div style={{width:"15vw"}}>
        <img
            src={image_4}
            alt=""
            width={"100%"}
            style={{marginTop:"10px"}}
            className={`certificate-image ${c === "/static/media/5469061_Монтажная область 1 1.afb476a96ecbea580207.png" ? "selected-image" : "noSelect"}`}
            onClick={() => onImg("/static/media/5469061_Монтажная область 1 1.afb476a96ecbea580207.png")}
        />
    </div>

    <div style={{width:"15vw"}}>
        <img
            src={image_5}
            alt=""
            style={{marginTop:"10px"}}

            width={"100%"}
            className={`certificate-image ${c === "/static/media/6_Монтажная область 1 1.138c89efac712f1175f6.png" ? "selected-image" : "noSelect"}`}
            onClick={() => onImg("/static/media/6_Монтажная область 1 1.138c89efac712f1175f6.png")}
        />
    </div>

    <div style={{width:"15vw"}}>
        <img
            src={image_6}
            alt=""
            style={{marginTop:"10px"}}

            width={"100%"}
            className={`certificate-image ${c === "/static/media/02-01 1 (2).fc64969151fbb7eb581e.png" ? "selected-image" : "noSelect"}`}
            onClick={() => onImg("/static/media/02-01 1 (2).fc64969151fbb7eb581e.png")}
        />
    </div>
</div>

                    <div className='col-12 mt-4 d-flex ' style={{direction:"ltr"}}>
                        <button  className='btn ' type='submit' style={{backgroundColor:"#C01F59",color:"#ffff"}}>استخراج الشهادة</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default CertificationTeacher;
