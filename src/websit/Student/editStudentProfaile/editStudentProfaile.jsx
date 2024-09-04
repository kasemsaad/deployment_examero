// import React, { useEffect, useState } from 'react'
import "./editStudentProfaile.css"
import home from "../../../assets/image/material-symbols_person-outline (1).svg"
import Homeicon from "./hugeicons_folder-details.png"
import success from "../../../assets/image/Vector (1).svg"
import lock from "../../../assets/image/mdi_password-outline.svg"
import Api_website from '../../../utlis/axios_utils_websit'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Api_dashboard from '../../../utlis/axios_utils_dashboard'
import sora2 from '../../../common/header/man 2.png';
import React, { useEffect, useRef, useState } from 'react';
import createNew from '../../../assets/icons/sidebar/wpf_create-new copy.svg';
import plus from '../../../assets/image/+.svg';
import '../Plans/Plans.css';
import Api_Website from '../../../utlis/axios_utils_websit.jsx';
import styled from 'styled-components';
import park_check from "../../../assets/icons/Home/icon-park_check-correct.svg";
import paypal from "../../../assets/image/home/1655977977paypal-logo-transparent.png";
import mastercard from "../../../assets/image/home/MasterCard_Logo.svg.png";
function EditStudentProfaile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const layoutBackground = useSelector((state) => state.dark.lay);
  const [alert, Setalert] = useState(false)
  const [alerterror, Setalerterror] = useState(false)
  const [data, setInfo] = useState([]);
  const [PasswordAlert, SetPasswordAlert] = useState(false)
  const [inputUser, setInputUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    governorate: "",
    date_of_birth: '',
    phone_number: "",
    image: "",
  })

  const [errormesssage, Seterrormessage] = useState('')
  const getUsersFromInput = (e) => {
    let USER = { ...inputUser }
    USER[e.target.name] = e.target.value
    setInputUser(USER)
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputUser({ ...inputUser, image: file });
    }
  }
  useEffect(() => {
    getRefreshUser()
    getDataStudentExam()

  }, [])

  const getRefreshUser = async () => {
    document.body.style.removeProperty('overflow');

    await Api_website.get('/students/refresh').then((response) => {
      let user = response.data.User
      setInputUser(user)
    }).catch((err) => {
      console.error(err);
    })
  }


  const HandleSubmit = async (event) => {

    event.preventDefault();
    const payload = {
      first_name: inputUser.firstName,
      last_name: inputUser.lastName,
      date_of_birth: inputUser.date_of_birth,
      phone_number: inputUser.phone_number,
      email: inputUser.email
    };

    if (inputUser.image) {
      payload.image = inputUser.image;
    }

    document.body.style.removeProperty('overflow');

    await Api_website.post('/students/update', payload, {

      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      Setalert(true);
      setTimeout(() => {
        Setalert(false);
      }, 2000);
      getRefreshUser()
    }).catch((err) => {
      Seterrormessage(err.response.data.message);
      Setalerterror(true);
      setTimeout(() => {
        Seterrormessage(false);
      }, 2000);
    });
  };



  const [paswwordInputs, SetpasswordInput] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  })
  const [errorMessagePass, SetErrorMessagePass] = useState(false)
  const [responseErrorMesage, SetresponseErrorMesage] = useState('')
  const getInputPasswor = (e) => {

    let inputPass = { ...paswwordInputs }
    inputPass[e.target.name] = e.target.value
    SetpasswordInput(inputPass)

  }

  const HandleSavePassword = async (event) => {
    event.preventDefault();
    document.body.style.removeProperty('overflow')
    await Api_website.post('/students/change-password', paswwordInputs).then((response) => {
      SetPasswordAlert(true)
      setTimeout(() => {
        SetPasswordAlert(false)
      }, 2000)
    }).catch((err) => {
      SetErrorMessagePass(true)
      SetresponseErrorMesage(err.response.data.message)
      setTimeout(() => {
        SetErrorMessagePass(false)
      }, 2000)

    })

  };

  const getDataStudentExam = () => {
    document.body.style.removeProperty('overflow')
    setLoading(true);
    Api_website.get(`students/plans`)
      .then(response => {
        setInfo(response.data.plans);
        // console.log(response.data.plans);

      })
      .catch(error => {
        setInfo([]);
        setLoading(false);
        console.error("Error fetching plans data:", error);
      });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const setId = (id) => {
    localStorage.setItem("sidbarId", JSON.stringify(id));
  };


  const sec6 = useRef();

  const [checkstudent, setcheckstudent] = useState(null);
  const [checkteacher, setcheckteacher] = useState(null);
  const [student_data, setStudent_data] = useState(null);
  const [teacher_data, setTeacher_data] = useState(null);
  const [name, setname] = useState("");
  const [baymentObj, setbaymentObj] = useState("");
  const [UserPayment, setUserPayment] = useState("");
  // const navigate = useNavigate();
  const user = localStorage.getItem("user")
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

  const check = () => {
    if (user == "student") {
      setcheckstudent(false)
      setcheckteacher(true)
    } else if (user == "teacher") {
      setcheckstudent(true)
      setcheckteacher(false)
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

  }, [user, name]);

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
      {/* <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div> */}
    </>;
  }

  // const loading = () => {
  //   setTimeout(() => {
  //       const load = document.getElementById("reload");
  //       // const body = document.getElementsByTagName("body");
  //       load.style.display = "none"
  //       document.body.style.removeProperty('overflow');
  //       let backdrop = document.querySelector('.modal-backdrop.fade.show');
  //       if (backdrop) {
  //           backdrop.remove();
  //       }
  //   }, 4000)
  // }



  const mastercardStudentApi = (id) => {
    const data = {
      plan_id: id
    }
    Api_Website.post(`students/payments/pay-with-paymob`, data)

      .then(response => {
        window.open(response.data.redirect_url, '_blank');
        // loading()
      })
      .catch(error => {
        console.error("Error fetching mastercard data:");
        // loading()
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
        // loading()
      })
      .catch(error => {
        console.error("Error fetching paypal data:");
        // loading()
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
        // loading()
      })
      .catch(error => {
        console.error("Error fetching mastercard data:");
        // loading()
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
        // loading()

      })
      .catch(error => {
        console.error("Error fetching paypal data:");
        // loading()
        setTimeout(() => {
          navigate("/login_teacher")
        }, 4000);

      });
  }

  return (

    <>
      <div className="container" style={{ overflow: 'auto', marginTop: '10px', direction: 'rtl', height: 'auto' }}>
        <div className=" w-100 h-100 pb-4" style={{ height: '60vh', marginTop: '80px', position: 'relative', borderRadius: '24px', border: '1px #4941A6 solid' }}>
          <form onSubmit={(e) => HandleSubmit(e)} encType="multipart/form-data">

            <div>
              <div className="upload" >

                {/* // upload image */}
                <img style={{backgroundColor:" #4941A6"}}
                  src={inputUser.media?.name ? `${Api_dashboard.defaults.baseURL}/assets/Student/${inputUser.media?.name}` : sora2}
                  id="image"
                  alt="Upload Preview"
                />


                <div className="rightRound" id="upload" style={{ backgroundColor: "#4941A6" }}>
                  <input type="file" accept=".jpg, .jpeg, .png" name='image' onChange={handleImageChange} />
                  <i className="fa fa-camera"></i>
                </div>

                <div className="leftRound" id="cancel" style={{ display: 'none' }}>
                  <i className="fa fa-times"></i>
                </div>

                <div className="rightRound" id="confirm" style={{ display: 'none' }}>
                  <i className="fa fa-check"></i>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: '50px' }} className="container">
              <div className="d-flex align-items-center" style={{ direction: 'rtl', marginBottom: '20px' }}>
                <div className="d-flex align-items-center " style={{ width: "13vw" }}>
                  <img src={home} className="img-fluid rounded-circle" alt="صورة شخصية" style={{ width: '30px', height: '30px' }} />
                  <h3 className="ml-3 mx-2  personal_inf" style={{ margin: "0", padding: "0", color: "#A6A0F4" }}>البيانات الشخصية</h3>
                </div>
                {
                  alert ?
                    <div className=" alert-primary " style={{ backgroundColor: "#ACEADF", height: "41px", display: "flex", alignItems: "center", borderRadius: "10px" }}>
                      <div className='d-flex ' style={{ alignItems: "center", marginRight: "17px", width: '30vw' }}>
                        <img src={success} className="img-fluid rounded-circle" alt="صورة شخصية" style={{ width: '10px', height: '10px' }} />
                        <div>
                          <p style={{ margin: "0", padding: "0", color: "#000000", fontSize: "14px", fontWeight: "600px", marginRight: "10px" }}>تم حفظ التغييرات بنجاح</p>
                        </div>
                      </div>
                    </div>
                    : ""}

                {errormesssage ?
                  <div className=" alert-danger " style={{ backgroundColor: "#F68C8C", height: "41px", display: "flex", alignItems: "center", borderRadius: "10px" }}>
                    <div className='d-flex ' style={{ alignItems: "center", marginRight: "17px", width: '30vw' }}>
                      <img src={success} className="img-fluid rounded-circle" alt="صورة شخصية" style={{ width: '10px', height: '10px' }} />
                      <div>
                        <p style={{ margin: "0", padding: "0", color: "#000000", fontSize: "14px", fontWeight: "600px", marginRight: "10px" }}>{errormesssage}</p>
                      </div>
                    </div>
                  </div>
                  : ""}

              </div>



              <div className="row" style={{ justifyContent: 'space-between', marginTop: '33px' }}>
                <div className="col-lg-6  row" style={{ alignItems: 'center' }}>
                  <div className="label_size">
                    <label htmlFor="name" style={{
                      color: layoutBackground === "#0E0A43" ? "white" : "black"
                    }}>الاسم</label>
                  </div>
                  <div className="input_size">
                    <input onChange={(e) => getUsersFromInput(e)} type="text" className="form-control" name='firstName' placeholder='ادخل الاسم' required value={inputUser.firstName} />
                  </div>
                </div>

                <div className="col-lg-6 row top_input_margin " style={{ alignItems: 'center' }}>
                  <div className="label_size">
                    <label htmlFor="phone" style={{
                      color: layoutBackground === "#0E0A43" ? "white" : "black"
                    }}> رقم الهاتف</label>
                  </div>
                  <div className="input_size">
                    <input onChange={(e) => getUsersFromInput(e)} type="number" className="form-control" name='phone_number' placeholder='ادخل رقم الهاتف' value={inputUser.phone_number} />
                  </div>
                </div>
              </div>

              <div className="row Wraber_ele" style={{ justifyContent: 'space-between', marginTop: '33px' }}>
                <div className="col-lg-6  row" style={{ alignItems: 'center' }}>
                  <div className="label_size">
                    <label htmlFor="familyName" style={{
                      color: layoutBackground === "#0E0A43" ? "white" : "black"
                    }}>اسم العائلة</label>
                  </div>
                  <div className="input_size">
                    <input onChange={(e) => getUsersFromInput(e)} type="text" className="form-control" id="familyName" name='lastName' required placeholder='ادخل اسم العائله' value={inputUser.lastName} />
                  </div>
                </div>

                <div className="col-lg-6  row  " style={{ alignItems: 'center' }}>
                  <div className="label_size">
                    <label htmlFor="email" style={{
                      color: layoutBackground === "#0E0A43" ? "white" : "black"
                    }}>البريد الألكتروني</label>
                  </div>
                  <div className="input_size">
                    <input onChange={(e) => getUsersFromInput(e)} type="email" className="form-control" id="email" placeholder='ادخل البريد الاكتروني' name='email' required value={inputUser.email} />
                  </div>
                </div>
              </div>

              <div className="row Wraber_ele" style={{ justifyContent: 'space-between', marginTop: '33px' }}>
                <div className="col-lg-6 row " style={{ alignItems: 'center', marginTop: "-10px" }}>
                  <div className="label_size">
                    <label htmlFor="birthDate" style={{
                      color: layoutBackground === "#0E0A43" ? "white" : "black"
                    }}>تاريخ الميلاد</label>
                  </div>
                  <div className="input_size">
                    <input onChange={(e) => getUsersFromInput(e)} type="date" className="form-control" required placeholder='dd/mm/yyy' name='date_of_birth' value={inputUser.date_of_birth} />
                  </div>
                </div>
                <div className="col-md-12 mt-3 button_wraper " align="start" style={{ direction: "ltr", marginLeft: "10px" }}>
                  <button type='submit' className="btn btn-danger" style={{ marginLeft: "30px" }}>حفظ</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <form onSubmit={(e) => HandleSavePassword(e)}>
        <div className="password-card p-4 " style={{
          height: 'auto',
          marginTop: '50px',
          borderRadius: '24px',
          border: '2px #4941A6 solid',
          backgroundColor: "",
          marginBottom: "20px"
        }}>
          <div style={{ direction: 'rtl', margin: "0", padding: "0", display: 'flex', alignItems: "center" }}>
            <div>
              <img src={lock} className="img-fluid rounded-circle" alt="صورة شخصية" style={{ width: '16px', height: '15px', color: "#A6A0F4" }} />
            </div>
            <h4 className="" style={{ marginRight: "8px", color: "#A6A0F4", padding: "0", marginBottom: "0", fontSize: "18px", fontWeight: "600px" }}>كلمة المرور</h4>
            {
              PasswordAlert ?
                <div class=" alert-primary " style={{
                  backgroundColor: "#ACEADF", height: "41px", display: "flex", alignItems: "center", borderRadius: "10px", marginRight: "20px",
                }}>
                  <div className='d-flex ' style={{ alignItems: "center", marginRight: "17px", width: '30vw' }}>
                    <img src={success} className="img-fluid rounded-circle" alt="صورة شخصية" style={{ width: '10px', height: '10px' }} />
                    <div>
                      <p style={{ margin: "0", padding: "0", color: "#000000", fontSize: "14px", fontWeight: "600px", marginRight: "10px" }}>تم حفظ التغييرات بنجاح</p>
                    </div>
                  </div>
                </div>
                : ""}

            {
              errorMessagePass ?
                <div class=" alert-primary " style={{
                  backgroundColor: "#F68C8C", height: "41px", display: "flex", alignItems: "center", borderRadius: "10px", marginRight: "20px",
                }}>
                  <div className='d-flex ' style={{ alignItems: "center", marginRight: "17px", width: '30vw' }}>
                    <img src={success} className="img-fluid rounded-circle" alt="صورة شخصية" style={{ width: '10px', height: '10px' }} />
                    <div>
                      <p style={{ margin: "0", padding: "0", color: "white", fontSize: "14px", fontWeight: "600px", marginRight: "10px" }}>{responseErrorMesage} </p>
                    </div>
                  </div>
                </div>
                : ""}

          </div>
          <div className="row mt-4">
            <div className="col-md-4 form-group pt-3">
              <label htmlFor="currentPassword" style={{
                color: layoutBackground === "#0E0A43" ? "white" : "black"
              }}>كلمة المرور الحالية</label>
              <input onChange={getInputPasswor} type="password" name='current_password' className="form-control" style={{ marginTop: "7px" }} required placeholder='***************' />
            </div>
            <div className="col-md-4 form-group pt-3">
              <label htmlFor="newPassword " style={{
                color: layoutBackground === "#0E0A43" ? "white" : "black"
              }}>كلمة المرور الجديدة</label>
              <input onChange={getInputPasswor} type="password" name='password' id="newPassword" className="form-control" style={{ marginTop: "7px" }} required placeholder='***************' />
            </div>
            <div className="col-md-4 form-group pt-3">
              <label htmlFor="confirmPassword" style={{
                color: layoutBackground === "#0E0A43" ? "white" : "black"
              }}>تأكيد كلمة المرور الجديدة</label>
              <input onChange={getInputPasswor} type="password" name='password_confirmation' className="form-control" style={{ marginTop: "7px" }} placeholder='***************' required />
            </div>
            <div className="col-md-12 mt-3 " style={{ direction: "ltr" }}>
              <button type='submit' className="btn btn-danger">حفظ التغييرات</button>
            </div>
          </div>
        </div>
      </form>

      <div className="container py-5 mb-2 d-flex align-items-center justify-content-center flex-column">
        <div className="" style={{ width: "85%", paddingTop: "4.25px" }}>
          <div className="d-flex align-items-center justify-content-between" style={{ width: "100%" }}>
            <div>
              <img src={Homeicon} alt="HomeIcon" style={{ backgroundColor: "transparent" }} />
              <label className="px-2 fs-4" htmlFor="plans" style={{ color: layoutBackground === "#0E0A43" ? "white" : "black" }}> تفاصيل الباقة</label>
            </div>
            <button
              className='btn rounded-3 px-4 me-3 '
              data-bs-toggle="modal"
              data-bs-target="#plans"
              style={{ color: layoutBackground === "#0E0A43" ? "white" : "black", border: "2px solid #C01F59" }}
            >
              اشترك بباقاتنا الان                                  </button>
          </div>
          <Link
            className="btn"
            to="#"
            style={{
              backgroundColor: "transparent",
              color: layoutBackground === "#0E0A43" ? "white" : "#0E0A43",
              fontSize: "18px"
            }}
          >
          </Link>

          {data.length > 0 ? (
            <table className='tabelstudent' style={{ width: "100%" }}>
              <thead>
                <tr style={{
                  color: layoutBackground === "#0E0A43" ? "#FE4F60" : "black",
                }}>
                  <th>اسم الباقة</th>
                  <th>الامتحانات </th>
                  <th>الاسئلة المتاحة</th>
                  <th> الامتحانات المستخدمة </th>
                  <th> تاريخ الاشتراك  </th>
                  <th>  طريقة الدفع  </th>
                  <th>  رقم العملية  </th>
                </tr>
              </thead>
              <tbody style={{
                color: layoutBackground === "#0E0A43" ? "white" : "black"
              }}>
                {Array.isArray(data) && data.length > 0 ? data.map(({ id, name, allow_question, allow_exam, status, pivot }, index) => (
                  <tr key={index} style={{
                    backgroundColor: index % 2 === 0 ? (layoutBackground === "#0E0A43" ? "#1d195d" : "#FCFCFC") : (layoutBackground === "#0E0A43" ? "#090631" : "#DADADA")
                  }}>
                    <td>{name}</td>
                    <td>{allow_exam}</td>
                    <td>{allow_question}</td>
                    <td>{pivot.exam_used}</td>
                    <td>{pivot.subscribe_type}</td>
                    <td>{pivot.type}</td>
                    <td>{pivot.payment_id}</td>

                  </tr>
                )) : (
                  <tr>
                    {/* <td colSpan="5">No data available</td> */}
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <div colSpan="" className='text-center' style={{ width: "100%", color: layoutBackground === "#0E0A43" ? "white" : "black" }}>لا يوجد باقات</div>
          )}

        </div>
      </div>
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {/* <div className="modal fade bg-danger managerFade d-flex  justify-content-center align-items-center mt-5" id="plans" tabIndex="-1" aria-labelledby="addManagerModalLabel" aria-hidden="true" style={{ width: "100%" }}> */}
        {/* <div className="  modaleSize1 "> */}
          {/* <div className="modal-content managerContent  modaleSize2"> */}
            <div className="modal fade managerFade " id="plans" tabIndex="-1" aria-labelledby="addManagerModalLabel" aria-hidden="true" style={{ paddingTop:"45px" }} align="center" >
        <div className="modaleSize1 mt-2 rounded-3 shadow">
          <div className="modal-content managerContent modaleSize2 rounded-3  ">
            <div className="d-flex  close p-3"  >
              <button type="button" className="btn p-0 "  style={{backgroundColor:"white",color:"red",borderRadius:"50%", width:"30px", height:"30px" }} data-bs-dismiss="modal" aria-label="Close"><i className="fas fa-xmark fs-4 text-center p-0 pt-1"></i></button>
            </div>

            <Section61 className="Section61 pt-4 " ref={sec6} align="start" style={{fontSize:"14px"}}>
              <h3 className="Bold text-center"><span style={{ color: "#FF8A00" }}>اختر نوع الباقة</span></h3><br />
              <DivSection61 className=" container d-flex align-items-center  justify-content-  flex-column">
                <div className="boxrow1 row  d-flex align-items-start justify-content-evenly" style={{ backgroundColor: "transparent" }}>
                  <div hidden={checkteacher} className="boxpre1 p-2 col-md-3 shadow  " style={{ backgroundColor: "#8C57FB" }}>
                    <h3 className="fonto Bold text-start" style={{ color: "#FE4F60" }}><span>{teacher_data.data[0].name}</span></h3>
                    <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {teacher_data.data[0].price}</span></h3>
                    <div className="boxchil1 text-white ps-5 " dir="rtl">
                      <div className="d-flex align-items-start">
                        <img className="checkicone" src={park_check} alt="check" />
                        <p>{teacher_data.data[0].description}</p>
                      </div>
                      <p><img className="checkicone" src={park_check} alt="check" />عدد الأسئلة : {teacher_data.data[0].allow_question} </p>
                      <p><img className="checkicone" src={park_check} alt="check" /> عدد الامتحانات : {teacher_data.data[0].allow_exam}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
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
                    <div className="boxchil1 text-white ps-5" dir="rtl">
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
                    <div className="boxchil1 text-white ps-5" dir="rtl">
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

              <DivSection61 className=" container mt-3 d-flex align-items-center justify-content-center flex-column pt-4" style={{fontSize:"14px"}}>
                {/* <h4 className="teacher1box Bold " ><span style={{ color: "#FE4F60" }}> ( الطلاب ) </span></h4><br /> */}
                <div className="boxrow1 row d-flex align-items-start justify-content-evenly" style={{ backgroundColor: "transparent" }} >
                  <div hidden={checkstudent} className="boxpre1  p-2 col-md-3 shadow  " style={{ backgroundColor: "#8C57FB" }}>
                    <h3 className="fonto Bold text-start" style={{ color: "#FE4F60" }}><span>{student_data.data[0]?.name}</span></h3>
                    <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {student_data.data[0]?.price}</span></h3>
                    <div className="boxchil1 text-white ps-5" dir="rtl">
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
                    <div className="boxchil1 text-white ps-5 " dir="rtl">
                      <div className="d-flex align-items-start ">
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
                    <h3 className="fonto Bold text-start" style={{ color: "#FE4F60" }}><span>{student_data.data[2]?.name}</span></h3>
                    <h3 className="fonto Bold text-start" style={{ color: "black" }}><span className="fs-5">$ </span><span className="Bold" > {student_data.data[2]?.price}</span></h3>
                    <div className="boxchil1 text-white ps-5" dir="rtl">
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


          </div>
        </div>
      </div>

      <div className="modal fade managerFade" id="bayment" tabIndex="-1" aria-labelledby="addManagerModalLabel" aria-hidden="true" style={{ zIndex: "999999999999999999999999999999999999999999999999999" }} >
        <div className="modal-dialog modal-dialog-centered managergDialog modaleSize ">
          <div className="modal-content managerContent">
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
    </>
  )
}
const DivSection61 = styled.div``;
const Section61 = styled.section``;

export default EditStudentProfaile;