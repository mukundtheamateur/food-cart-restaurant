import React, { useState,useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import {login} from "../redux/slice/userSlice"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {isAuthenticated,error} = useSelector(state => state.user)

    const dispatch = useDispatch();

    useEffect(() => {
        if(isAuthenticated){
            window.location.href = '/';
        }
    }, [isAuthenticated]);

    const handleLogin = async(e) => {
        e.preventDefault();
        // Handle login logic here
        dispatch(login({email,password}))
    }

    return (
        <Container style={{margin:"auto",marginTop:"5vh"}}>
            <Row>
                <Col xs={12} md={6} style={{maxWidth:"400px",margin:"auto"}}>
                    <h2>Login</h2>
                    <Form onSubmit={handleLogin}>
                        {error && <p className='text-danger'>Invalid Credentials</p>}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='mt-3'>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;