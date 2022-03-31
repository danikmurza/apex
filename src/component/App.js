import {service} from "../service/service";
import React, {useCallback, useEffect, useRef, useState} from "react";
import './App.css';
import {Alert, Button, Col, Container, Row, Table} from "react-bootstrap";

function App() {
    const refContainer = useRef('');
    const [show, setShow] = useState(false)
    const [org, setOrg] = useState({
        organization: [], find: "hello", error: null
    })

    const onNameChange = (e) => {
        refContainer.current =e.target.value
    };

    const fetchOrganization = ()=>{
        service.getCompany({title: refContainer.current})
            .then(res => setOrg({...org, organization: res}))
            .catch(e => setOrg({...org, error: e}))
    }


    useEffect(() => {
        fetchOrganization()
        console.log("RENDER1")
    }, [refContainer.current])

    useEffect(() => {
        if (org.error !== null) setShow(true)
        console.log("RENDER2")
    }, [org.error])

    const closeModal = () => {
        setShow(false)
        setOrg({...org, error: null})
    }

    return (
        <div className="container">
        <header className="App-header">
            <>
                <Alert show={show} variant="success" style={{width: "100%"}}>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>
                        {org.error}
                    </p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={closeModal} variant="outline-success">
                            Close!
                        </Button>
                    </div>
                </Alert>
            </>
            <Container className="m-5 row">
               <Row>
                   <Col sm={8}>
                       <input type="text" onChange={onNameChange} className="input-group h-100"/>
                   </Col>
                   <Col sm={4}>
                       <button onClick={fetchOrganization} className="btn btn-outline-secondary">find organisation</button>
                   </Col>
               </Row>
           </Container>
            {org.organization !== [null] ? org.organization.map((organ, index) => {
                const {title, content, done, priority, avatar_url, id} = organ
                return (
                    <Table striped bordered hover key={id} >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Priority</th>
                            <th>Done</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td><img src={avatar_url} width="80px" height="80px"/></td>
                            <td>{title}</td>
                            <td>{content}</td>
                            <td>{priority}</td>
                            <td>{done.toString()}</td>
                        </tr>
                        </tbody>
                    </Table>)
            }) : ''}
        </header>
    </div>);
}

export default App;
