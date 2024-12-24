import '../../Main.css'
import Spinner from 'react-bootstrap/Spinner';
import ReactMarkdown from 'react-markdown';
import CustomCarousel from './CustomCarousel';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';

const LLM = ({ showSpinner, singleResponse }) => {

    const exportToPDF = () => {
        const input = document.querySelector('.message-container'); 
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('CareerTrail_Result.pdf');
        });
    };

    return (
        <div id='details' className="section-right custom-shadow">
            <div className='llm-container' >
                {singleResponse?.length === 0 ? (
                    showSpinner ? (<div className='d-flex justify-content-start align-items-center' ><Spinner animation="grow" />Loading...</div>)
                        : (<CustomCarousel />)
                ) : (
                    <>
                        <div className='llm-responses p-2' >
                            {singleResponse?.Type === "Analysis" && <div className="message-container custom-shadow mb-3">
                                <img src="/CareerTrail_logo.jpg" width={80} height={80} 
                                alt="Logo" />
                                <div className='message-container-text' >
                                <h3>CAREERTRAIL</h3>
                                    <h3>Skill Gaps: </h3>
                                    <ReactMarkdown >{singleResponse.SkillsGaps}</ReactMarkdown>
                                    <br></br>
                                    <h3>Recommended Course: </h3>
                                    <ReactMarkdown >{singleResponse.RecommendedCourse}</ReactMarkdown>
                                    <br></br>
                                    <h3>Recommended Certificates: </h3>
                                    <ReactMarkdown >{singleResponse.RecommendedCertificates}</ReactMarkdown>
                                    <br></br>
                                    <h3>Relevant Projects: </h3>
                                    <ReactMarkdown >{singleResponse.ReleventProjects}</ReactMarkdown>
                                    <Button variant="success" onClick={exportToPDF} className="w-50 submit-btn btn-shadow">
                                      Download as PDF
                                    </Button>
                                </div>
                            </div>}
                            {singleResponse?.Type === 'Career' && <div className="message-container custom-shadow mb-3">
                                <img src="/CareerTrail_logo.jpg" width={80} height={80} alt="Logo" />
                                <div className='message-container-text' >
                                    <h3>Recommended Career Path:</h3>
                                    <ReactMarkdown  >{singleResponse.recommendedPaths}</ReactMarkdown>
                                    <Button variant="success" onClick={exportToPDF} className="w-50 submit-btn btn-shadow ">
                                      Download as PDF
                                    </Button>
                                </div>
                            </div>}
                            {singleResponse?.Type === "Recommend" && <div className="message-container custom-shadow mb-3">
                                <img src="/CareerTrail_logo.jpg" width={80} height={80} alt="Logo" />
                                <div className='message-container-text' >
                                    <h3>Recommended Skills to learn</h3>
                                    <ReactMarkdown>{singleResponse.SkillsRoadMap}</ReactMarkdown>
                                    <Button variant="success" onClick={exportToPDF} className="w-50 submit-btn btn-shadow">
                                      Download as PDF
                                    </Button>
                                </div>
                            </div>}
                            {singleResponse?.Type === "Mock" && <div className="message-container custom-shadow mb-3">
                                <img src="/CareerTrail_logo.jpg" width={80} height={80} alt="Logo" />
                                <div className='message-container-text' >
                                    <h3>Mock Interview</h3>
                                    <h3>Questions</h3>
                                    <ReactMarkdown>{singleResponse.Questions}</ReactMarkdown>
                                    <h3>Example Answers</h3>
                                    <ReactMarkdown>{singleResponse.answers}</ReactMarkdown>
                                    <Button variant="success" onClick={exportToPDF} className="w-50 submit-btn btn-shadow">
                                      Download as PDF
                                    </Button>
                                </div>
                            </div>}
                        </div>
                        {showSpinner && <div className='d-flex justify-content-start align-items-center' ><Spinner animation="grow" />Loading...</div>}
                    </>
                )}
            </div>
        </div >
    )
}

export default LLM
