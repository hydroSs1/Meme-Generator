
import { useState } from "react";
import { Form, Button, Container, Row, Alert, Col } from 'react-bootstrap';
import React from 'react';
import ".././App.css";
import { Link } from 'react-router-dom';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const findFormErrors = () => {
    const errors = {};
    let emailRegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    if (!emailRegExp.test(username)) errors.username = "Email not valid!";
    if (username === '') errors.username = 'Cannot be blank!';
    if (password === '') errors.password = 'Cannot be blank!';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    const newErrors = findFormErrors();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      let loginStatus = await props.login(credentials);
      if (!loginStatus.success) {
        setLoginErrorMessage(loginStatus.errormsg);
      }
    }
  }

  return (
    <Container>
      <Row className="loginFormRow">
        <Col className="loginFormCol">
          <div className="loginFormLogo"><span>MemeHub</span></div>
          <Form className="loginForm">
            <Form.Group controlId='username'>
              <Form.Label>email</Form.Label>
              <Form.Control type='email' value={username} isInvalid={!!errors.username} onChange={ev => setUsername(ev.target.value)} />
              <Form.Control.Feedback type='invalid'> {errors.username} </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={password} isInvalid={!!errors.password} onChange={ev => setPassword(ev.target.value)} />
              <Form.Control.Feedback type='invalid'> {errors.password} </Form.Control.Feedback>
            </Form.Group>
            <Button onClick={handleSubmit} className="w-50 mx-auto d-block">Login</Button>

            {loginErrorMessage && <AlertLoginFailed msg={loginErrorMessage} />}
          </Form>
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Col></Col>
        <Col>
          <Link to="/">
            <Button>Back</Button>
          </Link>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

function AlertLoginFailed(props) {
  return (
    <Alert variant="danger" className="loginAlert">{props.msg}</Alert>
  )
}

export default LoginForm;