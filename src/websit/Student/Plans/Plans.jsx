import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import createNew from '../../../assets/icons/sidebar/wpf_create-new copy.svg';
import plus from '../../../assets/image/+.svg';
import './Plans.css';
import Api_Website from '../../../utlis/axios_utils_websit.jsx';
import styled from 'styled-components';
import park_check from "../../../assets/icons/Home/icon-park_check-correct.svg";
import paypal from "../../../assets/image/home/1655977977paypal-logo-transparent.png";
import mastercard from "../../../assets/image/home/MasterCard_Logo.svg.png";
function Plans(props) {
    const setId = (id) => {
        localStorage.setItem("sidbarId", JSON.stringify(id));
    };

    const sec1 = useRef();
    const sec2 = useRef();
    const sec3 = useRef();
    const sec4 = useRef();
    const sec5 = useRef();
    const sec6 = useRef();
    
    const [checkstudent, setcheckstudent] = useState(null);
    const [checkteacher, setcheckteacher] = useState(null);  
    const [student_data, setStudent_data] = useState(null);
    const [teacher_data, setTeacher_data] = useState(null);
    const [name, setname] = useState("");
    const [baymentObj, setbaymentObj] = useState("");
    const [UserPayment, setUserPayment] = useState("");
    const navigate = useNavigate();
    const user=localStorage.getItem("user")
    const scrollHandler = (elmRef) => {
        window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
    }
    const handleScroll = () => {
        const sections = document.querySelectorAll('.animationBoxltr, .animationBoxrtl, .animationBoxltrimg, .animationBoxrtlimg  ');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top + window.pageYOffset < scrollTop + window.innerHeight) {
                section.classList.add('visible');
            }
        });
    };

  const check=()=>{
    if(user=="student"){
        setcheckstudent(false)
        setcheckteacher(true)
    }else if(user=="teacher"){
        setcheckstudent(true)
        setcheckteacher(false)
    }
  }
    const logout = () => {

        if (user === "student") {
            Api_Website.post(`/students/logout`)
                .then(response => {
                    localStorage.removeItem("token_user");
                    localStorage.removeItem("user");
                    navigate("/")                })
                .catch(error => {
                    console.error("Error not logout ");
                });
                
        } else if (user === "teacher") {
            Api_Website.post(`/teachers/logout`)
                .then(response => {
                    localStorage.removeItem("token_user");
                    localStorage.removeItem("user");
                    navigate("/")                })
                .catch(error => {

                    console.error("Error not logout ");
                });
                
        }

    }
    const login = () => {
        if (user === "student") {
            navigate("/student/homeStudentView")
        } else if (user === "teacher") {
            navigate("/teacher/Home_teacher")
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        check()
        if (user === "student") {
            Api_Website.get(`/students/refresh`)
                .then(response => {
                   setname(response.data.User.fullName);

                })
                .catch(error => {
                    console.error("Error fetching name data:");
                });

        } else if (user === "teacher") {

            Api_Website.get(`/teachers/refresh`)
                .then(response => {

                    setname(response.data.user.fullName);

                })
                .catch(error => {
                    console.error("Error fetching name data:");
                });

        } else {
            navigate("/")
        }
    
}, [user,name]);

    useEffect(() => {
        Api_Website.get(`/teacher-plan`)
            .then(response => {
                setTeacher_data(response.data);
            })
            .catch(error => {
                console.error("Error fetching teacher data:", error);
            });

        Api_Website.get(`/student-plan`)
            .then(response => {
                setStudent_data(response.data);
            })
            .catch(error => {
                console.error("Error fetching student data:", error);
            });

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [user]);

    if (!student_data || !teacher_data) {
        return <>
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </>;
    }

    const loading = () => {
        setTimeout(() => {
            const load = document.getElementById("reload");
            // const body = document.getElementsByTagName("body");
            load.style.display = "none"
            document.body.style.removeProperty('overflow');
            let backdrop = document.querySelector('.modal-backdrop.fade.show');
            if (backdrop) {
                backdrop.remove();
            }
        }, 4000)
    }



    const mastercardStudentApi = (id) => {
        const data = {
            plan_id: id
        }
        Api_Website.post(`students/payments/pay-with-paymob`, data)

            .then(response => {
                window.open(response.data.redirect_url, '_blank');
                loading()
            })
            .catch(error => {
                console.error("Error fetching mastercard data:");
                loading()
                setTimeout(() => {
                    navigate("/login_student")
                }, 4000);
            });
    }
    const paypalStudentApi = (id) => {
        const data = {
            plan_id: id
        }
        Api_Website.post(`students/payments/pay-with-paypal`, data)
            .then(response => {
                window.open(response.data.redirect_url, '_blank');
                loading()
            })
            .catch(error => {
                console.error("Error fetching paypal data:");
                loading()
                setTimeout(() => {
                    navigate("/login_student")
                }, 4000);

            });
    }
    const mastercardTeacherApi = (id) => {
        const data = {
            plan_id: id
        }
        Api_Website.post(`/teachers/payments/pay-with-paymob`, data)
            .then(response => {
                window.open(response.data.redirect_url, '_blank');
                loading()
            })
            .catch(error => {
                console.error("Error fetching mastercard data:");
                loading()
                setTimeout(() => {
                    navigate("/login_teacher")
                }, 4000);

            });
    }
    const paypalTeacherApi = (id) => {
        const data = {
            plan_id: id
        }
        Api_Website.post(`/teachers/payments/pay-with-paypal`, data)
            .then(response => {
                window.open(response.data.redirect_url, '_blank');
                loading()

            })
            .catch(error => {
                console.error("Error fetching paypal data:");
                loading()
                setTimeout(() => {
                    navigate("/login_teacher")
                }, 4000);

            });
    }

    return (
        <>
   <Section61  className="Section61 pt-4 " ref={sec6} >
                <h3 className="Bold text-center"><span style={{ color: "#FF8A00" }}>اختر نوع الباقة</span></h3><br />
                <DivSection61  className=" container d-flex align-items-center  justify-content-  flex-column">
                    <div  className="boxrow1 row  d-flex align-items-start justify-content-evenly"  style={{backgroundColor:"transparent"}}>
                        <div hidden={checkteacher} className="boxpre1 p-2 col-md-3 shadow  " style={{ backgroundColor: "#8C57FB" }}>
                            <h3 className="fonto Bold text-start"  style={{ color: "#FE4F60" }}><span>{teacher_data.data[0].name}</span></h3>
                            <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {teacher_data.data[0].price}</span></h3>
                            <div className="boxchil1 text-white" dir="rtl">
                                <div className="d-flex align-items-start">
                                    <img className="checkicone" src={park_check} alt="check" />
                                    <p>{teacher_data.data[0].description}</p>
                                </div>
                                <p><img className="checkicone" src={park_check} alt="check" />عدد الأسئلة : {teacher_data.data[0].allow_question} </p>
                                <p><img className="checkicone" src={park_check} alt="check" /> عدد الامتحانات : {teacher_data.data[0].allow_exam}</p>
                            </div>
                            <div  className="d-flex align-items-center justify-content-center">
                                <button
                                    className="btn mx-2 py-0 rounded-3 "
                                    style={{ height: "3rem", width: "100%", backgroundColor: "#4941A6", color: "#ffff" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#bayment"
                                    onClick={() => {
                                        setbaymentObj(teacher_data.data[0])
                                        setUserPayment("teacher")
                                    }}
                                >
                                    اشترك الآن
                                </button>                            </div>
                        </div>

                        <div hidden={checkteacher} className="boxpre1   p-2 col-md-3 shadow  " style={{ backgroundColor: "#4941A6" }}>
                            <h3 className="fonto Bold text-start" style={{ color: "#4941A6" }}><span>{teacher_data.data[1]?.name}</span></h3>
                            <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {teacher_data.data[1]?.price}</span></h3>
                            <div className="boxchil1 text-white" dir="rtl">
                                <div className="d-flex align-items-start">
                                    <img className="checkicone" src={park_check} alt="check" />
                                    <p>{teacher_data.data[1]?.description}</p>
                                </div>

                                <p><img className="checkicone" src={park_check} alt="check" />عدد الأسئلة : {teacher_data.data[1]?.allow_question} </p>
                                <p><img className="checkicone" src={park_check} alt="check" /> عدد الامتحانات : {teacher_data.data[1]?.allow_exam}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn mx-2 py-0 rounded-3 " style={{ height: "3rem", width: "100%", backgroundColor: "#C01F59", color: "#ffff" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#bayment"
                                    onClick={() => {
                                        setbaymentObj(teacher_data.data[1])
                                        setUserPayment("teacher")
                                    }}

                                >
                                    اشترك الآن
                                </button>
                            </div>
                        </div>

                        <div hidden={checkteacher} className=" boxpre1 p-2 col-md-3 shadow  " style={{ backgroundColor: "#C01F59" }}>
                            <h3 className="fonto Bold text-start" style={{ color: "#FE4F60" }}><span>{teacher_data.data[2]?.name}</span></h3>
                            <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {teacher_data.data[2]?.price}</span></h3>
                            <div className="boxchil1 text-white" dir="rtl">
                                <div className="d-flex align-items-start">
                                    <img className="checkicone" src={park_check} alt="check" />
                                    <p>{teacher_data.data[2]?.description}</p>
                                </div>

                                <p><img className="checkicone" src={park_check} alt="check" />عدد الأسئلة : {teacher_data.data[2]?.allow_question} </p>
                                <p><img className="checkicone" src={park_check} alt="check" /> عدد الامتحانات : {teacher_data.data[2]?.allow_exam}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn mx-2 py-0 rounded-3 " style={{ height: "3rem", width: "100%", backgroundColor: "#4941A6", color: "#ffff" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#bayment"
                                    onClick={() => {
                                        setbaymentObj(teacher_data.data[2])
                                        setUserPayment("teacher")
                                    }}                                >
                                    اشترك الآن
                                </button>

                            </div>
                        </div>

                    </div>
                </DivSection61>

                <DivSection61 className=" container mt-3 d-flex align-items-center justify-content-center flex-column pt-4">
                    {/* <h4 className="teacher1box Bold " ><span style={{ color: "#FE4F60" }}> ( الطلاب ) </span></h4><br /> */}
                    <div  className="boxrow1 row d-flex align-items-start justify-content-evenly" style={{backgroundColor:"transparent"}} >
                        <div hidden={checkstudent} className="boxpre1  p-2 col-md-3 shadow  " style={{ backgroundColor: "#8C57FB" }}>
                            <h3 className="fonto Bold text-start" style={{ color: "#FE4F60" }}><span>{student_data.data[0]?.name}</span></h3>
                            <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {student_data.data[0]?.price}</span></h3>
                            <div className="boxchil1 text-white" dir="rtl">
                                <div className="d-flex align-items-start">
                                    <img className="checkicone" src={park_check} alt="check" />
                                    <p>{student_data.data[0]?.description}</p>
                                </div>

                                <p><img className="checkicone" src={park_check} alt="check" />عدد الأسئلة : {student_data.data[0]?.allow_question} </p>
                                <p><img className="checkicone" src={park_check} alt="check" /> عدد الامتحانات : {student_data.data[0]?.allow_exam}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn mx-2 py-0 rounded-3 " style={{ height: "3rem", width: "100%", backgroundColor: "#4941A6", color: "#ffff" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#bayment"
                                    onClick={() => {
                                        setbaymentObj(student_data.data[0])
                                        setUserPayment("student")
                                    }}                                >
                                    اشترك الآن
                                </button>
                            </div>
                        </div>

                        <div hidden={checkstudent} className="boxpre1   p-2 col-md-3 shadow  " style={{ backgroundColor: "#4941A6" }}>
                            <h3 className="fonto Bold text-start" style={{ color: "#4941A6" }}><span>{student_data.data[1]?.name}</span></h3>
                            <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {student_data.data[1]?.price}</span></h3>
                            <div className="boxchil1 text-white" dir="rtl">
                                <div className="d-flex align-items-start">
                                    <img className="checkicone" src={park_check} alt="check" />
                                    <p>{student_data.data[1]?.description}</p>
                                </div>

                                <p><img className="checkicone" src={park_check} alt="check" />عدد الأسئلة : {student_data.data[1]?.allow_question} </p>
                                <p><img className="checkicone" src={park_check} alt="check" /> عدد الامتحانات : {student_data.data[1]?.allow_exam}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn mx-2 py-0 rounded-3 " style={{ height: "3rem", width: "100%", backgroundColor: "#C01F59", color: "#ffff" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#bayment"
                                    onClick={() => {
                                        setbaymentObj(student_data.data[1])
                                        setUserPayment("student")
                                    }}                                  >
                                    اشترك الآن
                                </button>
                            </div>
                        </div>

                        <div hidden={checkstudent} className="boxpre1  p-2 col-md-3 shadow  " style={{ backgroundColor: "#C01F59" }}>
                            <h3  className="fonto Bold text-start" style={{ color: "#FE4F60" }}><span>{student_data.data[2]?.name}</span></h3>
                            <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {student_data.data[2]?.price}</span></h3>
                            <div className="boxchil1 text-white" dir="rtl">
                                <div className="d-flex align-items-start">
                                    <img className="checkicone" src={park_check} alt="check" />
                                    <p>{student_data.data[0]?.description}</p>
                                </div>

                                <p><img className="checkicone" src={park_check} alt="check" />عدد الأسئلة : {student_data.data[2]?.allow_question} </p>
                                <p><img className="checkicone" src={park_check} alt="check" /> عدد الامتحانات : {student_data.data[2]?.allow_exam}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn mx-2 py-0 rounded-3  " style={{ height: "3rem", width: "100%", backgroundColor: "#4941A6", color: "#ffff" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#bayment"
                                    onClick={() => {
                                        setbaymentObj(student_data.data[2])
                                        setUserPayment("student")
                                    }}                                  >
                                    اشترك الآن
                                </button>
                            </div>
                        </div>
                    </div>
                </DivSection61>

            </Section61>
            <div className="modal fade managerFade bg-danger" id="bayment" tabIndex="-1" aria-labelledby="addManagerModalLabel" aria-hidden="true" style={{ zIndex: "999999999999999999999999999999999999999999999999999" }} >
                <div className="modal-dialog modal-dialog-centered managergDialog modaleSize bg-danger">
                    <div className="modal-content managerContent bg-danger">
                        <div className="modal-header managerHeader d-flex  justify-content-center">
                            <h5 className="modal-title managerTitle text-center ">{baymentObj.name}</h5>
                            <button type="button" className="btn-close kh" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body managerBody">
                            <h4 className="modal-title managerTitle text-center ">الدفع عن طريق</h4>
                            <div className="parent1 py-4">
                                {
                                    UserPayment === "student" ? (
                                        <>
                                            <button className="btn btn-light mx-2"
                                                onClick={() => {
                                                    paypalStudentApi(baymentObj.id)

                                                }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#reload"
                                            >
                                                <img
                                                    className="m-4"
                                                    src={paypal}
                                                    alt="paypal"

                                                    style={{ width: "60px", height: "70px" }}

                                                />
                                            </button>
                                            <button className="btn btn-light mx-2"

                                                onClick={() => {
                                                    mastercardStudentApi(baymentObj.id)
                                                }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#reload"
                                            >

                                                <img
                                                    className="m-4"
                                                    src={mastercard}
                                                    alt="mastercard"

                                                    style={{ width: "60px", height: "70px" }}

                                                />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-light mx-2"
                                                onClick={() => {
                                                    paypalTeacherApi(baymentObj.id)

                                                }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#reload"
                                            >
                                                <img
                                                    className="m-4"
                                                    src={paypal}
                                                    alt="paypal"
                                                    style={{ width: "60px", height: "70px" }}

                                                />
                                            </button>
                                            <button className="btn btn-light mx-2"
                                                onClick={() => {
                                                    mastercardTeacherApi(baymentObj.id)
                                                }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#reload"
                                            >
                                                <img
                                                    className="m-4"
                                                    src={mastercard}
                                                    alt="mastercard"
                                                    style={{ width: "60px", height: "70px" }}

                                                />
                                            </button>

                                        </>
                                    )
                                }

                            </div>
                            <h3 className="modal-title managerTitle text-center ">${baymentObj.price}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade managerFade" style={{ backgroundColor: "#00000032", border: "none" }} id="reload" tabIndex="-1" aria-labelledby="addManagerModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered managergDialog " >
                    <div className="modal-content managerContent " style={{ backgroundColor: "transparent", border: "none" }}>
                        <div className="spinner" data-bs-dismiss="modal" >
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div>
            </div>
            </>
)
}
const Section61 = styled.section``;
const DivSection61 = styled.div``;
export default Plans;
