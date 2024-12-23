import React from 'react'
import '../../Main.css'
import { Button, Row, Col, Form } from 'react-bootstrap'


const Upload = ({ feature1, feature2, feature3, feature4, handleFileChange, handleSubmit, btnDisabled }) => {

    return (
        <div className="section-left">
            {}
            <h3
      style={{
        fontFamily: "MONTON,BLOCKLETTER,GABO",
        fontSize: '36px',
        background: 'linear-gradient(to right, #fff, #2c3e50)',
        WebkitBackgroundClip: 'text',
        color: '#224e87',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      }}
    >
      CareerTrail
    </h3>
            <div className='upload-container' >
                <div className='upload ' >
                <div >
                        <Row className="feature-choice" >
                            <Col xs={6} className="mb-3">
                                <Button className="w-100 submit-btn btn-shadow"
                                    onClick={feature1}
                                    disabled={btnDisabled}
                                >Analyse Resume</Button>
                            </Col>
                            <Col xs={6} className="mb-3">
                                <Button className="w-100 submit-btn btn-shadow"
                                    onClick={feature2}
                                    disabled={btnDisabled}>Mock Interview Questions</Button>
                            </Col>
                            <Col xs={6} className="mb-3">
                                <Button className="w-100 submit-btn btn-shadow"
                                    onClick={feature3}
                                    disabled={btnDisabled}>Career path suggestion</Button>
                            </Col>
                            <Col xs={6} className="mb-3">
                                <Button className="w-100 submit-btn btn-shadow"
                                    onClick={feature4}
                                    disabled={btnDisabled}>Skills Recommendation</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className='upload-icon-and-button' >
                        <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content form-submit mt-3' >
                            <Form.Group controlId="formFile" className="mb-1">
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                            <Button className='submit-btn btn-shadow mb-3' type='submit'>Upload Resume or CV </Button>
                        </Form>
                    </div>
                    <div className='upload-instructions' >
                        <ul>
                            <li>How to use :</li>
                            <li>Step 1 : Click on Choose File (choose .pdf file only)</li>
                            <li>Step 2 : Click on Upload button.</li>
                            <li>Step 3 : Choose any option from Above</li>
                            <li>Step 4 : Your results are sucessfully generated, scroll down to see.</li>
                            <li>Bonus : You can change the choosen option without repeating the steps.</li>
                        </ul>

                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Upload
