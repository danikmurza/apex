import {service} from "../service/service";
import React, {useEffect, useRef, useState} from "react";
import './App.css';
import {Alert, Button, Col, Row, Table} from "react-bootstrap";

function App() {
    const find = useRef('hello')
    const [show, setShow] = useState(false)
    const [org, setOrg] = useState({
        organization: [], find: "hello", error: null
    })
    const fetchOrganization = () => {
         service.getCompany(find.current)
            .then(res => setOrg({...org, organization: res}))
            .catch(e => setOrg({...org, error: e}))
        console.log(org)
    }

    const onNameChange = (e) => {
        find.current = e.target.value
    };


    useEffect(() => {
        fetchOrganization()
    }, [])

    useEffect(() => {
        if (org.error !== null) {
            setShow(true)
        }
    }, [org.error])

    const closeModal = () => {
        setShow(false)
        setOrg({...org, error: null})
    }

    return (<div className="container">
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



               <Row className="mt-5 mb-5">
                   <Col sm={8}>
                       <input type="text" onChange={onNameChange} className="input-group h-100"/>
                   </Col>
                   <Col sm={4}>
                       <button onClick={fetchOrganization} className="btn btn-outline-secondary w-100">find organisation</button>
                   </Col>
               </Row>

            {org.organization ? org.organization.map((organ, index) => {
                const {name, watchers, forks, open_issues, owner, id} = organ
                return (

                    <Table striped bordered hover key={id} >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Name Organization</th>
                            <th>Watchers</th>
                            <th>Forks</th>
                            <th>open_issues</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/*<li key={id}>*/}
                            <td>{index + 1}</td>
                            <td><img alt={name}  src={owner.avatar_url} width="80px" height="80px"/></td>
                            <td>{name}</td>
                            <td>{watchers}</td>
                            <td>{forks}</td>
                            <td>{open_issues}</td>
                            {/*</li>*/}
                        </tr>
                        </tbody>
                    </Table>)
            }) : ''}
        </header>
    </div>);
}

export default App;
