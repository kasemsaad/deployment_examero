import React from 'react'
import FirstTriangle from '../components/FirstTriangle/FirstTriangle';
import SecondTriangle from '../components/SecondTriangl/SecondTriangle';
import { Link, useLocation } from 'react-router-dom';
import TableReward from '../../common/Table/tableReward/tableReward';
import html2pdf from 'html2pdf.js'; // استيراد مكتبة html2pdf.js
import TablePointAll from '../../common/Table/PointAllTable/pointAllTable';


export default function Point(props) {
    let header = {
        col1: "الرساله",
        col2: "   نوع الرساله",
        col3: "   النقاط  "
       
    }

    // if(props.teacherTableHead){
    //     delete header.col5
    // }

    const location = useLocation()
    const downloadPDF = () => {
        console.log("kkkkkkkk");
        const element = document.getElementById(props.documenDownlowd);
        html2pdf().from(element).save('reward.pdf');
    }

    return (
        <>
            <div className="container  pb-4" style={{ overflow: 'auto', marginTop: '18px', direction: 'rtl', border: "2px solid purble", borderRadius: "10px", width: "90%", margin: "auto", height: "auto",paddingBottom:"20px" }}>

                <div className=" modal-header mt-4" >
                    <h5  style={{ color: '#FF8A00', margin: "auto" }} className="modal-title" id="exampleModalLabel"> النقاط و المكافآت</h5>
                </div>
                <div style={{ width: "100%", height: "10px", borderBottom: "1px solid #A6A0F4", margin: "auto" }}>
                </div>


                


               
                <div className='mt-2' id={props.documenDownlowd}>
                    <TablePointAll header={header}
                        body={props.dataRender}
                        // flag={props.flag}
                        // checkboxHandler={props.checkboxHandler}
                        // dataCheckedRender={props.dataCheckedRender}
                        // checkallFn={props.checkAllHandler}
                        flagAdmin={props.flagAdmin}

                    />
                </div>

                {
                    props.flagNoContent ?<p style={{textAlign:"center"}}>لا توجد بيانات </p>:""
                }



                <div
                    style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        height: " 74px",
                        alignItems: "center",
                    }}
                    className="footer-manger"
                >
                    <button
                        type='button'

                        onClick={() => props.next()}
                        style={{
                            backgroundColor: props.totalPages===props.current_page ? "#120E4D":"#4941A6",
                            height: "26px",
                            width: "26px",
                            display: "flex",
                            fontSize: "18px",
                            fontWeight: "700",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                        }}
                    >
                        <p style={{ margin: "0", color: "white" }}>&gt;</p>
                    </button>
                    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          {Array.from({ length: props.totalPages }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundColor:  props.current_page === i + 1 ? "#4941A6 " : "#120E4D",
                height: "26px",
                width: "26px",
                display: "flex",
                fontSize: "18px",
                fontWeight: "700",
                alignItems: "center",
                justifyContent: "center",
                margin: "2px", // Added margin for better visual spacing
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
                    <button
                        type='button'
                        onClick={() => props.handelPrev()}
                        style={{
                            marginLeft: "5px",
                            backgroundColor: props.current_page ===1? "#120E4D":"#4941A6",
                            height: "26px",
                            width: "26px",
                            display: "flex",
                            fontSize: "18px",
                            fontWeight: "700",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                        }}
                    >
                        <p style={{ margin: "0", color: "white" }}>&lt;</p>
                    </button>
                </div>

            </div>


        









        </>
    )
}


