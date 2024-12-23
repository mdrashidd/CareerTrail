import { useState } from 'react'
import { Navbar, Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css'
import LLM from './Components/LLM/LLM';
import Upload from './Components/FileUpload/Upload';
import { endpoint } from './utils/Endpoint';
import axios from 'axios'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Home = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [showTextField, setShowTextField] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [singleResponse, setSingleResponse] = useState([])
    const [showSpinner, setShowSpinner] = useState(false)

    const [isExportToPDFEnabled, setexportToPDFEnabled]= useState(true)

    const Analysis = async () => {
        setShowTextField(false)
        setShowSpinner(true)

        try {
            await axios.post(`${endpoint}/ResumeAnalysis/getanalysis`).then((response) => {
                setSingleResponse(response.data)
            }).finally(() => {
                setShowSpinner(false)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an error while getting an analysis on the resume")
        }
    }

    const Mock = async () => {
        setShowTextField(true)
        setShowSpinner(true)
        try {
            await axios.post(`${endpoint}/ResumeAnalysis/getmockinterviews`).then((response) => {
                setShowSpinner(false)
                setSingleResponse(response.data)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an issue while generating mock interview questions")
        }
    }

    const Career = async () => {
        setShowTextField(false)
        setShowSpinner(true)
        try {
            await axios.post(`${endpoint}/ResumeAnalysis/getcareerpaths`).then((response) => {
                setShowSpinner(false)
                setSingleResponse(response.data)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an issue while getting career path suggestions")
        }
    }

    const Recommendation = async () => {
        setShowTextField(false)
        setShowSpinner(true)
        try {
            await axios.post(`${endpoint}/ResumeAnalysis/getskillsrecommendation`).then((response) => {
                setShowSpinner(false)
                setSingleResponse(response.data)
            })
        } catch (error) {
            setShowSpinner(false)
            console.log("There was an issue while getting career path suggestions")
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                setSelectedFile(file);
                console.log('PDF file uploaded:', file);
            } else {
                setSelectedFile(null);
                alert("The selected file is not a pdf.")
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);

        if (!selectedFile) {
            alert("No file selected.");
        } else {
            try {
                await axios.post(`${endpoint}/ResumeAnalysis/uploadResume`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((response) => {
                    alert(response.data);
                    setBtnDisabled(false)
                });
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('File upload failed.');
            }
        }
    };

    const exportToPDF = () => {
        const input = document.querySelector('.message-container'); 
    
        html2canvas(input, {
            scale: 2, // Increase scale for better quality
            useCORS: true, // Handle cross-origin images
            backgroundColor: null, // Preserve transparency or gradient background
            logging: false, // Reduce console logs
            scrollX: 0,
            scrollY: -window.scrollY, // Handle scroll offsets
            windowWidth: document.documentElement.offsetWidth, // Capture full width
            windowHeight: document.documentElement.offsetHeight // Capture full height
        })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('CareerTrail_Results.pdf'); // File name for download
        })
        .catch((err) => console.error('PDF Export Error:', err));
    };
    



    return (
        <>
            
                <div>
                    <Navbar className="bg-body-tertiary ">
                        <Container className='d-flex justify-content-center' >
                            <Navbar.Brand href="#home" >
                                <img
                                    alt="logo"
                                    src="./CareerTrail_logo.jpg"
                                    width={100}
                                    // height={30}
                                    className="d-block align-middle rounded-circle"
                                />
                            </Navbar.Brand>
                        </Container>
                    </Navbar>

                {/* New section below the navbar */}
                <div className='grid-container' >
                    <Row className='h-100'>
                        <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Upload feature1={Analysis} feature2={Mock} feature3={Career} feature4={Recommendation} handleFileChange={handleFileChange} handleSubmit={handleSubmit} btnDisabled={btnDisabled} setBtnDisabled={setBtnDisabled} />
                        </Col>
                        <Col className="d-flex justify-content-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <LLM showTextField={showTextField} showSpinner={showSpinner} singleResponse={singleResponse}
                            isExportToPDFEnabledDF={isExportToPDFEnabled} />
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

export default Home
