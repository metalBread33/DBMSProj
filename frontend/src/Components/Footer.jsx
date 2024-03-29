import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col>
                <div style={{ bottom: 0, textAlign: 'center', fontSize: 17, right: 0, left: 0}}>
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
