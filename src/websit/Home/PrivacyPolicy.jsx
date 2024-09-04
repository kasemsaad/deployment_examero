


import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import './HomeStyle.css';
import right from "../../assets/icons/Home/mdi_success-circle-outline.svg";
import fluent from "../../assets/icons/Home/fluent-mdl2_commitments.svg";
import lucide_git from "../../assets/icons/Home/lucide_git-pull-request-create-arrow.svg";
import arro from "../../assets/icons/Home/Arrow 7.svg";
import park_check from "../../assets/icons/Home/icon-park_check-correct.svg";
import ImgProfile from "../../assets/image/home/Group 322.svg";
import ImgProfile2 from "../../assets/image/home/Group 323.svg";
import logo from "../../assets/icons/Home/لوجو examero-01 2.svg";


function PrivacyPolicy () {
   

    return (
        <>
          <div dir="rtl" className="p-2" style={{marginLeft:'2rem',marginRight:'2rem'}}>
    <img src={logo} className="img-fluid" alt="صورة شخصية" />              
</div>
<div dir="rtl" className="p-2" style={{marginLeft:'2rem',marginRight:'2rem'}}>
    <h1 style={{ fontWeight: 'bold', fontSize: '24px', lineHeight: '32px' }}>
        سياسة الخصوصية لمنصة Examero
    </h1>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        آخر تحديث: [21/07/2024]
    </p>
    
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        مرحبًا بكم في Examero، المنصة المتخصصة في توفير أدوات إنشاء الاختبارات والتدريب عليها للطلاب والمعلمين في الأردن. نحن ملتزمون بحماية خصوصيتكم وضمان أمن معلوماتكم الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا للمعلومات واستخدامها وحمايتها عند استخدامكم لمنصتنا.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    1. المعلومات التي نجمعها</p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    1.1 المعلومات الشخصية</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - الطلاب:<br />
        عند اشتراكك في باقة ما، نقوم بجمع بعض المعلومات الشخصية الأساسية، مثل اسمك، بريدك الإلكتروني، والصف الدراسي. يتم استخدام هذه المعلومات لتخصيص تجربتك وتقديم المحتوى المناسب لك.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - المعلمين:<br />
        عند إنشاء حساب، نقوم بجمع اسمك، بريدك الإلكتروني، والانتماء المدرسي. هذه المعلومات ضرورية لإدارة اشتراكك والوصول إلى بنك الأسئلة وأدواتنا الأخرى.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    1.2 معلومات الدفع</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - نقوم بجمع تفاصيل الدفع الخاصة بك لمعالجة اشتراكك في خدمتنا. يتضمن ذلك طريقة الدفع. نحن لا نخزن معلومات الدفع على خوادمنا؛ تتم معالجة جميع عمليات الدفع من خلال خدمة آمنة تابعة لطرف ثالث.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    1.3 بيانات الاستخدام</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - قد نقوم بجمع بيانات حول كيفية استخدامك لمنصتنا، بما في ذلك الاختبارات التي تجريها، وعدد مرات استخدامك لخدماتنا، وأي تفاعلات لديك مع المحتوى الخاص بنا. يساعدنا هذا في تحسين خدماتنا وتقديم تجربة مستخدم أفضل.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    2. كيفية استخدامنا لمعلوماتك</p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    2.1 للطلاب</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - لتوفير الوصول إلى اختبارات التدريب بناءً على الباقة التي تختارها.<br />
        - لتتبع تقدمك وتقديم ملاحظات حول أدائك.<br />
        - لتحسين منصتنا وتخصيص المحتوى ليلبي احتياجاتك التعليمية بشكل أفضل.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    2.2 للمعلمين</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - للسماح لك بإنشاء وإدارة وتحميل الاختبارات من بنك الأسئلة الخاص بنا.<br />
        - لتتبع استخدامك للمنصة وتزويدك بموارد ودعم إضافي.<br />
        - لتمكينك من إدارة اشتراكك والوصول إلى الميزات المتميزة.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    2.3 الاستخدام العام</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - للتواصل معك بشأن التحديثات والميزات الجديدة والمعلومات المهمة المتعلقة بحسابك.<br />
        - لمعالجة المدفوعات وإدارة الاشتراكات.<br />
        - لتحسين منصتنا وضمان أنها تلبي احتياجات مستخدمينا.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    3. مشاركة البيانات والكشف عنها</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - لا نقوم بمشاركة معلوماتك الشخصية مع أطراف ثالثة، باستثناء ما هو ضروري لتوفير خدماتنا أو الامتثال للالتزامات القانونية أو حماية حقوقنا. تتم معالجة معلومات الدفع بشكل آمن من قبل مقدمي خدمات الدفع الخارجيين، ولا نقوم بتخزين هذه البيانات.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    4. أمان البيانات</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - نستخدم تدابير أمان قياسية لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الكشف أو التعديل أو التدمير. على الرغم من جهودنا لحماية بياناتك، لا يمكن لأي نظام أن يضمن الأمان الكامل، ونشجعك على حماية بيانات اعتماد حسابك.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>5. حقوقك واختياراتك</p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    5.1 الوصول والتحديث</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - لديك الحق في الوصول إلى معلوماتك الشخصية وتحديثها في أي وقت من خلال تسجيل الدخول إلى إعدادات حسابك.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    6. تغييرات على سياسة الخصوصية هذه</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب قانونية أو تشغيلية أو تنظيمية. سنقوم بإعلامك بأي تغييرات جوهرية من خلال نشر السياسة المحدثة على موقعنا وتوضيح تاريخ آخر تحديث.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
    8. اتصل بنا</p>
    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        - إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو ممارسات البيانات الخاصة بنا، يرجى التواصل معنا من خلال صفحة الدعم الخاصة بنا.
    </p>

    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '29.98px' }}>
        باستخدامك لمنصة Examero، فإنك توافق على سياسة الخصوصية هذه وتوافق على الممارسات الموضحة هنا.
    </p>
</div>
<div dir="rtl" className="d-flex justify-content-end m-5">
    <Link   to="/"  className="btn" style={{ background:'#4941A6',paddingTop:'15px' ,paddingBottom:'15px',paddingLeft:'40px',paddingRight:'40px',borderRadius:'32.36px',color:'white',gap:'10px'}}>
    <span style={{paddingLeft:'15px',fontSize:'20px'}}> رجوع</span>
    <span>
    <img src={arro} className="img-fluid" alt="صورة شخصية" />              

    </span>
    </Link>
</div>

            <Footer className="footer " dir="rtl">
                <div className="row  footerrow d-flex  justify-content-center m-0">
                    <div className="col-md-4">
                        <h3><span className=" cgg" style={{ color: "#FFB419 " }} >Examero</span></h3>
                        <p className="cgg" style={{ color: "#ffff " }}>تقديم خدمات تعليمية وأكاديمية مميزة في مختلف المجالات لجميع الطلبة والباحثين في جميع المستويات التعليمية والأكاديمية</p>
                    </div>

                    <div className="colrow col-md-4"  >
                        <div className="cgg" style={{ display: "flex", justifyContent: "end", alignItems: "center", flexDirection: "column" }}>
                            <h3 className="p-0" style={{ display: "flex", justifyContent: "start", alignItems: "end" }}><span className="" style={{ color: "#FFB419" }} >روابط سريعة</span></h3>
                            <div className="" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <Link className="stylelink" to="/dashboard" >لوحة التحكم</Link>
                                <Link className="stylelink" to="/" >منصة الموظفين</Link>
                                <Link className="stylelink" to="/" >منصة تدريب المعلمين</Link>
                                <Link className="stylelink" to="/" >openeims منصة</Link>
                                <Link className="stylelink" to="/CreateTecherAccount" >إنشاء حساب</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 py-3 " style={{ display: "flex", flexDirection: "column" }} >
                        <h3><span className="cgg" style={{ color: "#FFB419", }}  >أرقامنا وعناوننا</span></h3>
                        <ul className="listfoter cgg">
                            <li className="bulits">عنوان : في قلب كل معلم</li>
                            <li className="bulits">هاتف : 00962781466490</li>
                            <li className="bulits">الايميل : examero.123@Support.Com</li>

                        </ul>
                    </div>
                </div>
            </Footer>
            {/* <div className=" d-flex align-items-center justify-content-between"  style={{ backgroundColor:"#4941A6"}}> */}

            <div className="px-4 pt-1 " style={{ borderTop: "2px solid #ffff", backgroundColor: "#4941A6", color: "white" }} >
                <div className="row p-0  m-0 d-flex align-items-center justify-content-center" dir="rtl" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="col-md-4 text-end"   >
                        <p>© 2024 Examero. All Rights Reserved</p>
                    </div>
                    <div className="col-md-4 text-center"  >
                        <p>© 2024 Examero. All Rights Reserved</p>
                    </div>
                    <div className="col-md-4 text-start"  >
                        <p>© 2024 Examero. All Rights Reserved</p>

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
    );
}
const Section = styled.section``;
const DivSection1 = styled.div``;
const Sectioncontent1 = styled.div``;
const SectionImage1 = styled.div``;
// const Button = styled.button``;
const Section2 = styled.section``;
const Douts = styled.div``;
const DivSection2 = styled.div``;
const Sectioncontent2 = styled.div``;
const SectionImage2 = styled.div``;
// const Button2 = styled.button``;
const Section3 = styled.section``;
const DivSection3 = styled.div``;
const Section4 = styled.section``;
const DivSection4 = styled.div``;
const Section5 = styled.section``;
const DivSection5 = styled.div``;
const Section6 = styled.section``;
const DivSection6 = styled.div``;
const Footer = styled.section``;
export default PrivacyPolicy;
