import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../main.css'

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col>
                <div style={{position:"absolute", bottom: 0, textAlign: 'center', fontSize: 20, right: 0}}>
                Note, this project is not affiliated with Publix; this is a class project. Calorie and other nutitional values may not be
                perfectly accurate. Please consult a nutritional specialist for accurate information
                </div>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
