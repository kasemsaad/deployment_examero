
import React, { useEffect, useRef, useState } from 'react';
import './ExamPage.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link, useNavigate } from 'react-router-dom';
import Api_website from '../../../utlis/axios_utils_websit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import homeLogo from './لاؤلآلآ.jpg';
import leftLogo from './WhatsApp Image 2024-07-31 at 12.56.09_2c113d77.jpg';
import ReactCardSlider from 'react-card-slider-component';
let count=2;
function ExamPdf_dash() {
  const navigate = useNavigate();
  const flag = localStorage.getItem("allow")
  if (flag !== "1") {
    navigate("/")
  }

  const [dataQuestion1, setdataQuestion1] = useState([]);
  const [dataQuestion2, setdataQuestion2] = useState({});
  const [dataQuestion3, setdataQuestion3] = useState({});
  const [headerData1, setHeaderData1] = useState({});
  const [headerData2, setHeaderData2] = useState({});
  const [headerData3, setHeaderData3] = useState({});
  const [headerData4, setHeaderData4] = useState({});
  const [subjectid, setsubjectid] = useState(null);
  const [idGroup, setidGroup] = useState(null);
  const [idsemester, setidsemester] = useState(null);
  const [totalpage, settotalpage] = useState("");


  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const Errornotify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const docString = localStorage.getItem("doc");
    if (docString) {
      try {
        const docJson = JSON.parse(docString);
        setHeaderData1(JSON.parse(docJson[0]));
        setHeaderData2(JSON.parse(docJson[1]));
        setHeaderData3(JSON.parse(docJson[2]));
        setHeaderData4(JSON.parse(docJson[3]));
      } catch (error) {
        console.error("Error parsing doc:", error);
      }
    }

    const allString = localStorage.getItem("all");
    if (allString) {
      try {
        const allJson = JSON.parse(allString);
        allJson.forEach(item => {
          try {
            const parse2 = JSON.parse(item);
            const parse3 = JSON.parse(parse2.السؤال);
            setdataQuestion1(prevState => [...prevState, item]);
            setdataQuestion2(parse2);
            setdataQuestion3(parse3);
          } catch (error) {
            console.error("Error parsing question item:", error);
          }
        });
      } catch (error) {
        console.error("Error parsing all:", error);
      }
    }
  }, []);
  const downloadPdf = async () => {
    const divsToCapture = document.querySelectorAll('.container-examee');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const padding = 5; // Padding in mm for all sides
    const imgWidth = 210 - 2 * padding; // A4 width in mm minus left and right padding
    const pageHeight = 297 - 2 * padding; // A4 height in mm minus top and bottom padding
    
    for (let i = 0; i < divsToCapture.length; i++) {
      const div = divsToCapture[i];
  
      // Capture div as canvas with consistent scaling
      const canvas = await html2canvas(div, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let position = padding; // Start position with top padding
      let heightLeft = imgHeight;
  
      // Split the image into multiple pages if necessary
      while (heightLeft > 0) {
        if (position !== padding) {
          pdf.addPage(); // Add a new page for overflow content
        }
        const pageHeightToUse = Math.min(heightLeft, pageHeight);
        pdf.addImage(imgData, 'PNG', padding, position, imgWidth, pageHeightToUse);
        heightLeft -= pageHeightToUse;
        position = padding; // Reset position for the next page with top padding
      }
  
      if (i < divsToCapture.length - 1) {
        pdf.addPage(); // Add a new page for the next div
      }
    }
  
    // Save the PDF
    pdf.save('exam.pdf');
  };
  

  const getSubjectId = () => {
    let jsonArray = [localStorage.getItem("doc1")];
    function parseArray(array) {
      return array.map(item => {
        if (typeof item === 'string') {
          try {
            return JSON.parse(item);
          } catch (e) {
            console.error('Error parsing JSON:', e, 'Raw item:', item);
            return null;
          }
        }
        return item;
      });
    }

    let parsedArray = parseArray(jsonArray);
    if (parsedArray[0] && parsedArray[0][2]) {
      setsubjectid(JSON.parse(parsedArray[0][2]).idSubjectid);
      setidGroup(JSON.parse(parsedArray[0][2]).idGroup);
      setidsemester(JSON.parse(parsedArray[0][1]).semester);
    } else {
      navigate('/dashboard/Put1');
    }
  }

  useEffect(() => {
    getSubjectId();
  }, []);


  const [mediaQuestion, setMediaQuestion] = useState(null);
  const [mediaAnswer, setMediaAnswer] = useState(null);


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'mediaQuestion') {
      setMediaQuestion(files[0]);
    } else if (name === 'mediaAnswer') {
      setMediaAnswer(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('mediaQuestion', mediaQuestion);
    formData.append('mediaAnswer', mediaAnswer);
    formData.append('group_id', idGroup);
    formData.append('subject_id', subjectid);
    formData.append('semster', idsemester);


    Api_website.post('/teachers/store-exam-info', formData)
      .then((response) => {
        console.log("success")
        notify("تم الحفظ بنجاح")
      })
      .catch((error) => {
        Errornotify("لم يتم حفظ الملفات")
      });

  }
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Retrieve the preview from sessionStorage
    const previewData = localStorage.getItem('preview');
    setPreview(previewData);
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////// 
  const draggables = document.querySelectorAll('.draggable')
  const containers = document.querySelectorAll('.container-exame')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        // Check if afterElement is valid
        if (afterElement.parentNode === container) {
          container.insertBefore(draggable, afterElement)
        } else {
          container.appendChild(draggable)
        }
      }
    })
  })

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }
  const [divs, setDivs] = useState([]);

  const handleCreateDiv = () => {
    setDivs([...divs, { id: divs.length, content: `Div ${divs.length + 1}` }]);
  };

  const handleDeleteDiv = (id) => {
    setDivs(divs.filter((div) => div.id !== id));
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const MAX_HEIGHT = 1634; // Maximum allowed height for the container
  const containerRef = useRef(null);
  const [items, setItems] = useState([]);
  const handleDrop = (event) => {
    event.preventDefault();



    const newItem = event.dataTransfer.getData("text");
    const tempElement = document.createElement("div");
    tempElement.className = "draggable";
    tempElement.style.visibility = "hidden";
    tempElement.innerText = newItem;
    containerRef.current.appendChild(tempElement);
    containerRef.current.removeChild(tempElement);
    setItems([...items, newItem]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };


  const [overflowStates, setOverflowStates] = useState({});

  useEffect(() => {
    const myDivs = document.querySelectorAll('.myDiv');
    const checkOverflow = () => {
      const newOverflowStates = {};
      myDivs.forEach((myDiv, index) => {
        const isOverflow = myDiv.scrollHeight > myDiv.clientHeight;
        newOverflowStates[index] = isOverflow;
      });

      setOverflowStates(newOverflowStates);

      if (Object.values(newOverflowStates).some(isOverflow => isOverflow)) {
        setTimeout(() => {
          Errornotify("تم إمتلاء الصفحه يرجي الإضافه في صفحه اخري");
        }, 200);
      }
    };

    const resizeObserver = new ResizeObserver(checkOverflow);

    myDivs.forEach(myDiv => {
      resizeObserver.observe(myDiv);
    });

    return () => {
      myDivs.forEach(myDiv => {
        resizeObserver.unobserve(myDiv);
      });
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <ToastContainer position='top-center' />
      <div className="container container-exame  rounded-4 py-3 my-5 shadow" style={{ height: "40vh", overflowY: "auto" ,backgroundColor:"rgb(224, 224, 224)"}} >

        {
          JSON.parse(localStorage.getItem("examQuestions")).map((item, index) => {
            return (
              <div key={index} className="exam-question  container-exame"   >

                <div  className=" draggable" draggable="true"><span style={{textDecoration:"underline" ,fontWeight:"bold" ,fontSize:"24px"}}>{index + 1}) {item.addressQuestion} <span> : </span>
                  <span>({item.markQuestion}) points</span><br /></span>
                </div>
                {(item.questionContent).map((markquestion, index) =>
                  <div className="exam-answer " key={index} >
                    <div className=" draggable" draggable="true" style={{fontSize:"21.33px"}}>{index + 1}) {markquestion.name}</div>
                    <div className="d-flex my-2 draggable" draggable="true">
                      {(markquestion.options).map((option, index) => (
                        <div className='' key={index} style={{fontSize:"21.33px",padding:"0px 80px"}}>
                          {index + 1}
                          <span>) </span>
                          {option.option}
                          <br />
                        </div>
                      ))}
                    </div>
                  </div>

                )}
              </div>
            )

          })
        }
      </div>
      {/* ///////////////////////////header//////////////////////////////////////// */}

      <div
        className="container container-exame myDiv  container-examee"
        style={{
          height: `${MAX_HEIGHT}px`, position: "relative",
          border: '1px solid black',
          width:"1145px"
        }}
      >
        <div className='section1  pt-2 ' style={{ width: "100%", position: "relative", top: "0", right: "0" }}>
          <div className="exam-header row"  dir="rtl">
            <div className="exam-logo col-md-4 pt-4">
              <img hidden={!headerData3.showJordanianLogo} src={leftLogo} alt="logo" />
            </div>
            <div className="exam-title col-md-4 " align="center">
              <div className="exam-logo">
                <img src={homeLogo} alt="logo" />
              </div>
            </div>
            <div className="exam-logo col-md-4 pt-4" align="end">
              {preview !== null ? <img src={preview} alt="logo" /> : ""}
            </div>
          </div>

          <div className="exam-content" dir="ltr" >
            <div dir="ltr" align="center" className="exam-info" >
            <span style={{fontWeight:"bold"}}>{headerData1.institution}</span><br />
              Directorate:  <span style={{fontWeight:"bold"}}>{headerData1.directorate}</span><br />
              School:  <span style={{fontWeight:"bold"}}>{headerData1.school}</span><br />
              {headerData1.examName} {parseInt(headerData2.semester) === 1 ? <span style={{fontWeight:"bold"}}>First Semester</span>  : parseInt(headerData2.semester) === 2 ? <span style={{fontWeight:"bold"}}>Second Semester</span>  : ""}  <span style={{fontWeight:"bold"}}>{headerData2.curriculum}</span>
            </div>
            <div dir="ltr" className="exam-details d-flex justify-content-between">
              <div dir="ltr" align="start">
                Class and Section: <span style={{fontWeight:"bold"}}>{headerData2.examName}</span><br />
                Subject: <span style={{fontWeight:"bold"}}>{headerData3.subjectname}</span><br />
                Student's name:<span style={{fontWeight:"bold"}}> .....................</span>
              </div>
              <div dir="ltr" align="start">
                Date: <span style={{fontWeight:"bold"}}>{headerData2.dayAndDate}</span><br />
                Exam Duration:<span style={{fontWeight:"bold"}}> {headerData2.examDuration} minutes only </span><br />
              </div>
            </div>
          </div>

          <div dir="ltr" className="exam-note  pb-3" hidden={!headerData3.showApperanceNotice}>

          <span style={{fontSize:"21.33px", fontWeight:"bold"}}>Important Note: Answer all the following questions ({headerData3.questionCount}) knowing that the number of exam pages is ({count})</span> 
          </div>
        </div>


      </div>
      {/* ///////////////////////////create pages//////////////////////////////////////// */}

      {/* <div className="div-container container bg-danger exam-container container-examee"> */}
      {divs.map((div) => (
  <div key={div.id}>
        <i 
      onClick={() => {
        handleDeleteDiv(div.id);
        count--;
      }
      }
      className="fas fa-xmark mt-3 px-2"
      style={{marginLeft:"170px", padding: "6px",  borderRadius:'50%' ,backgroundColor:"#4941A6",color:"white"}} // Optional: adjust the margin as needed
    >
    </i>
    <div
      className="generated-div container myDiv container-exame container-examee my-2"
      ref={containerRef}
      style={{
        height: `${MAX_HEIGHT}px`,
        position: "relative",
        border: "1px solid black",
        width:"1145px"

      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Inner content of the div */}
    </div>

  </div>
))}
          <div className="container  my-2  d-flex justify-content-center">
            <button className='btn bold rounded-3 m-0 p-0' 
            onClick={()=>{
              handleCreateDiv() 
                     count++}}
                     style={{ width:"1145px" ,backgroundColor:"#4941A6", color:"white"}}>Create page</button>
        </div>

      {/* </div> */}
      
      {/* ///////////////////////////footer//////////////////////////////////////// */}
      <div       
      className="container  exam-container container-examee"
      style={{ height: `${MAX_HEIGHT}px`, position: "relative"  , width:"1145px"    }}

      >
 <div 
     ref={containerRef}
     className="container container-exame myDiv"
     style={{ height: `${MAX_HEIGHT-170}px`, position: "relative" , width:"1145px"    }}
     onDrop={handleDrop}
     onDragOver={handleDragOver} 
     dir='ltr'
     align="start"
     >
       
      </div>

        <div className="exam-footer   m-0 p-0  "    style={{ width: "100%",height:"120px", position: "relative", bottom: "0", right: "0", borderTop:"1px solid" }} >
          <div className="exam-end pt-3">
            {headerData4.finishExam}
          </div>
          <div className="exam-wish">
            {headerData4.Message}
          </div>
          <div dir='ltr' className="exam-teacher">
            Teacher's name: {headerData4.teachername}
          </div>
        </div>

      </div>

{/* //////////////////////////////////////download///////////////////////////////////////////////////// */}
     
      <div dir="rtl" className="p-0 ">
        <div className='d-flex align-items-center justify-content-center p-5'>
          <Link hidden={true} to={`/dashboard/Put5/${parseInt(headerData3.questionCount) + 1}`}>
            <button className="btn_putting_exam2_after text-white py-0 m-0 mt-3 mx-2 p-5">
              Previous
            </button>
          </Link>
          <Link to={"/ExamePdfsolution"}>
            <button className="btn_putting_exam2_after text-white py-0 m-0 mt-3 mx-2 p-5" style={{backgroundColor:"#4941A6"}}>Questions Answer page</button>
          </Link>
          <Link>
            <button className="btn_putting_exam2_after text-white py-0 m-0 mt-3 mx-2 p-5" style={{backgroundColor:"#4941A6"}} onClick={downloadPdf}>Download</button>
          </Link>
          <Link>
            <button className="btn_putting_exam2_after text-white py-0 m-0 mt-3 mx-2 p-5" style={{backgroundColor:"#4941A6"}} data-bs-toggle="modal" data-bs-target="#logout">save</button>
          </Link>
        </div>
      </div>

      <div className="modal fade DElementFade" id="logout" tabIndex="-1" aria-labelledby="deleteElementModalLabel" aria-hidden="true">
        <div className="modal-dialog DElementDialog modal-dialog-centered ele_2">
          <div className="modal-content DElementContent modal-backdrop1">
            <div className="modal-body DElementBody text-center">
              <p className="modal-title DElementTitle pt-5" id="deleteElementModalLabel">Upload files</p>
              <Row className="mt-5">

                <Col xs={12} sm={6}>
                  <Form.Group controlId="formFileUpload">
                    <div className="d-flex align-items-center justify-content-center iciio">
                      <Form.Label className="mr-2">Questions file</Form.Label>
                    </div>
                    <div className="custom-file-input-wrapper">
                      <Form.Control
                        type="file"
                        name="mediaQuestion"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="custom-file-input" // Ensure this class is defined in your CSS
                      />

                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group controlId="formFileUpload">
                    <div className="d-flex align-items-center justify-content-center iciio">
                      <Form.Label className="mr-2">Answers file</Form.Label>
                    </div>
                    <div className="custom-file-input-wrapper" encType="multipart/form-data">
                      <Form.Control
                        type="file" name="mediaAnswer" accept=".pdf" onChange={handleFileChange}
                      />

                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className="modal-footer DElementFooter">
              <div>
                <button type="button" className="btn btn-danger cancel-btn DElementSave mx-1" data-bs-dismiss="modal" onClick={handleSubmit}>
                  ok
                </button>
                <button type="button" className="btn-secondary cancel-btn DElementCancel mx-1" data-bs-dismiss="modal">
                  cansel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
}

export default ExamPdf_dash;
