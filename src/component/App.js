import {service} from "../service/service";
import React, {useEffect, useRef, useState} from "react";
import './App.css';
import {Alert, Button} from "react-bootstrap";

function App() {
    const [show, setShow] = useState(false)
    const [org, setOrg] = useState({
        organization: [],
        find: "hello",
        error: null
    })
    const fetchOrganization = async () => {
        await service.getOrganizations(org.find)
            .then(res => setOrg({...org, organization: res}))
            .catch(e => setOrg({...org, error: e}))
        console.log(org)
    }

    const onNameChange = (e) => {
        setOrg({ ...org, find: e.target.value });
    };


    useEffect(() => {
        fetchOrganization()
    }, [])

    useEffect(() => {
       if (org.error !== null){
           setShow(true)
       }
    },[org.error] )

    return (
        <div className="App">
            <header className="App-header">


                <>
                    <Alert show={show} variant="success" style={{width: "100%"}}>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            {org.error}
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShow(false)} variant="outline-success">
                                Close!
                            </Button>
                        </div>
                    </Alert>
                </>



                <input type="text" onChange={onNameChange} />
                <button onClick={fetchOrganization}>Fetch Organisation</button>
                {org.organization ? org.organization.map((organ, index) => {
                    const {name, watchers, forks, open_issues, license, id} = organ
                    return (
                        <ul key={index}>
                            <li key={id}>
                                {name},
                                {watchers},
                                {forks},
                                {open_issues},
                                {/*{license ? license : ''}*/}
                            </li>
                        </ul>


                    )
                }) : ''}
            </header>
        </div>
    );
}

export default App;
