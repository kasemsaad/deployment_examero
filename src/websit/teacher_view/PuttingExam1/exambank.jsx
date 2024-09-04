
import React, { useEffect, useMemo, useState } from "react";
import MyTable3 from "../../../common/Table/tableexam";
import FooterOfUserFP from "../../../dashboard/components/UsersPages/FooterOfUsers/FooterOfUsers";
import { Link, useLocation } from "react-router-dom";
import Api_website from "../../../utlis/axios_utils_websit";
import Api_dashboard from "../../../utlis/axios_utils_dashboard";

import { useSelector } from "react-redux";
import plus from '../../../assets/icons/teacherview/Vector (2).svg';
import testt from '../../../assets/icons/teacherview/wpf_create-new.svg';
import qq1 from '../../../assets/icons/teacherview/Frame 140.svg'

import qq from '../../../assets/icons/teacherview/sss.svg'

export const ExamBankTeacher = () => {
  const header = {
    // name1: "اسم الامتحان",
    name2: "الفصل الدراسي",
    name3: "اسم الصف",
    name4: "اسم المبحث",
    name5:"التحميل",
  };  
  const baseURL = `${Api_dashboard.defaults.baseURL}`;

  const getSemesterMessage = (semster) => {
    if (!semster || semster.length < 2) return null;

    let semester = "";

    switch (semster[0]) {
      case 1:
        semester = "الاول";
        break;
      case 2:
        semester = "الثاني";
        break;
      default:
        semester = semster[1];
        break;
    }

    return <span>{semester}</span>;
  };

  const layoutBackground = useSelector((state) => state.dark.lay);
  // const icon = { eye: true };

  const [rowData, setRowData] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [idOfDeleteItem, setIdOfDeleteItem] = useState("");
  const [showOpenemisData, setshowOpenemisData] = useState("");
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [metaFPagination, setMetaFPagination] = useState({});
  const pageSize = 10;

  const newData = useMemo(() => {
    return data.map(({ id, mediaPdf, semster, group, subject, mediaQuestionPath, mediaAnswerPath }, index) => {
      const questionPdf = mediaPdf.find(pdf => pdf.meddiable_type === "App\\Models\\TeacherExam" && pdf.name.includes("Question"));
      const answerPdf = mediaPdf.find(pdf => pdf.meddiable_type === "App\\Models\\TeacherExam" && pdf.name.includes("Answer"));

      return {
        id,
        serial: (currentPage - 1) * pageSize + index + 1,
        semster: getSemesterMessage(semster),
        groupName: group?.name || "",
        SubjectName: subject?.name || "",
        downloadLinks: (
          <div className="d-flex align-items-center justify-content-center">
            <a
              href={`${baseURL}${mediaQuestionPath}${questionPdf ? questionPdf.name : ""}`}
              download
              style={{
                textDecoration: "none",
                color: "#A6A0F4",
                marginLeft: "10px",
                border: "1px solid #A6A0F4",
                borderRadius: "5px",
              }}
            >
              <p style={{ paddingLeft: '7px', paddingRight: '7px',marginBottom:'5px' }}>الإمتحان</p>
            </a>
            <a
              href={`${baseURL}${mediaAnswerPath}${answerPdf ? answerPdf.name : ""}`}
              download
              style={{
                textDecoration: "none",
                color: "#A6A0F4",
                marginLeft: "10px",
                border: "1px solid #A6A0F4",
                borderRadius: "5px",
              }}
            >
              <p style={{ paddingLeft: '7px', paddingRight: '7px' ,marginBottom:'5px'}}>الإجابات</p>
            </a>
          </div>
        ),
      };
    });
  }, [data, currentPage]);


  useEffect(() => {
    setFilteredManagers(newData);
  }, [newData]);

  useEffect(() => { 
    fetchAllData();
  }, [currentPage]);
  const handleShowOpenemisById = async (row) => {
    document.body.style.removeProperty("overflow");
    try {
      
      const response = await Api_website.get(`/teachers/exams/${row.id}`);
      setshowOpenemisData(response.data.data.Exams);
    } catch (err) {
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await Api_website.get(`/teachers/exams?page=${currentPage}`);
      const allData = response.data.data.Exams || [];
      
      const pagination = response.data.data.meta?.pagination || {};
      setData(Array.isArray(allData) ? allData : []);
      setMetaFPagination(pagination);
    } catch (err) {

    }
  };

 

  const handleNext = () => {
    if (currentPage < metaFPagination.last_page) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalPages = metaFPagination.last_page;
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="container-manger min-vh-100 w-100">
        <div style={{ width: "85%", margin: "auto" }} className="cont">
          <div
            className='headdd pb-4 p-1 d-flex justify-content-between'
            style={{
              backgroundColor: layoutBackground === "#0E0A43" ? "#0E0A43" : "#ECECEC",
              color: layoutBackground === "#0E0A43" ? "white" : "black",
              fontSize: "24px",
            }}
          >             
            <div className='col-12 mt-3 d-flex' style={{ alignItems: "center" }}>
              <div className="" style={{ width: "5.333333%" }}>
                <img src={testt} className="img-fluid" alt="صورة شخصية" />
              </div>
              <div className='col-6'>
                <p style={{ margin: '0', padding: "0", color: "#FFFFFF", fontSize: '24px' }}>
                إنشاء الامتحان للمعلم      
                  </p>
              </div>
            </div>
          </div>

          <div className="new-feature-section" style={{ padding: "10px", marginBottom: "15px", marginTop: "5px", borderRadius: "8px", border: "2px solid #A6A0F4" }}>
            <div className="d-flex justify-content-between align-items-center">
           <div>
            <span >
            <img src={qq} className="img-fluid" alt="صورة شخصية" />              </span>
              <span style={{ fontSize: "15px", fontWeight: "bold", color: '#A6A0F4',paddingRight :'2px'}}>
              ميزة جديدة تم إضافتها خصيصًا لك، تعرف على ميزة تعديل الامتحانات التي تم إنشاؤها.
                            </span></div>
              <button onClick={handleToggle} style={{ color: 'white', background: "none", border: "none", cursor: "pointer" }}>
                {isExpanded ? "▲" : "▼"}
              </button>
            </div>
            {isExpanded && (
              <div style={{ marginTop: "10px" }}>
                <p>نود أن نعلمك بميزة جديدة رائعة تمت إضافتها إلى موقعنا التعليمي. وهي "تعديل الامتحان".</p>
                <p>الآن يمكنك تعديل الأسئلة في الامتحانات التي قمت بإنشائها  !   ببساطة، قم بالضغط على زر "تعديل الامتحان" وستتمكن من استبدال الأسئلة، وضبط درجات الصعوبة، وتحديد نوع السؤال كما تشاء مع العلم انه سيتم خصم امتحان من باقة الامتحانات المتبقية الموجودة لديك .</p>
                <p>هذه الميزة تهدف إلى تسهيل عملية تحديث الامتحانات وتخصيصها وفقًا لاحتياجاتك التعليمية واحتياجات طلابك.</p>
                <p>فريق الدعم في [ Examero ] يتمنى لك تجربة ممتعة مع هذه الميزة الجديدة. ولا تتردد في الاتصال بنا إذا كان لديك أي استفسارات أو اقتراحات.</p>
                <p>أطيب التحيات،</p>
                <p style={{ color: '#FF8A00' }}>فريق الدعم - Examero</p>
              </div>
            )}
          </div>

          <div className="new-feature-section" style={{ padding: "10px", marginBottom: "15px", marginTop: "5px", borderRadius: "8px", border: "2px solid #A6A0F4" }}>
            <div className="d-flex justify-content-between align-items-center">
           <div>
            <span >
            <img src={qq} className="img-fluid" alt="صورة شخصية" />              </span>
              <span style={{ fontSize: "15px", fontWeight: "bold", color: '#A6A0F4',paddingRight :'2px'}}>
              لا أعرف كيف أقوم بانشاء الإمتحان
                            </span></div>
                            <div>
                            <img src={qq1} className="img-fluid" alt="صورة شخصية" />              
                            </div>
              
            </div>


            
          </div>

          <div className="d-flex mb-4 justify-content-between">
            <div style={{ background: '#FE4F60', borderRadius: '19px', textDecoration: 'none', marginLeft: '5px', marginRight: '5px' }} className="p-2">
              <span className='header1_enter_data_teach_view65' style={{ color: 'white' }}> الإمتحانات التي تم إنشاؤها </span>
            </div>
            <Link
              to="/teacher/PuttingExam1"
              style={{ background: '#C01F59', borderRadius: '19px', textDecoration: 'none' }}
              className="p-2"
            >
              <img
                src={plus}
                alt="Icon"
                className='header1teacherview-iconuu'
                style={{ width: '10%', marginLeft: '10px' }}
              />
              <span className='header1_enter_data_teach_view65' style={{ color: 'white' }}>إنشاء امتحان</span>
            </Link>
          </div>

          <div style={{ width: "100%", overflow: "auto", height: "400px" }}>
            <MyTable3
              header={header}
              body={filteredManagers}
              handelShow={handleShowOpenemisById}
              customRender={(row, headerKey) => {
                switch (headerKey) {
                  case "name4":
                    return <td>{row.unitName}</td>;
                  
                  case "name5":
                    return (
                     <></>
                    );
                  case "name3":
                    return <td>{row.SubjectName}</td>;
                  default:
                    return headerKey === "id" ? null : <td>{row[headerKey]}</td>;
                }
              }}
            />
          </div>

          <FooterOfUserFP
            handelNext={handleNext}
            handelPrev={handlePrev}
            currentPage={currentPage}
          />
          
        </div>
      </div>
    </>
  );
};

