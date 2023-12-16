import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { PacmanLoader, ScaleLoader } from 'react-spinners';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Refs for the user details container and the selected user element
    const userDetailsRef = useRef(null);
    const selectedUserRef = useRef(null);

    useEffect(() => {
        // Using Axios to fetch data
        axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false on error as well
            });
    }, []);

    useEffect(() => {
        // Scroll to the top of the user details when selected user changes
        if (userDetailsRef.current && selectedUserRef.current) {
            userDetailsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [selectedUserId]);

    const handleDetails = (id) => {
        console.log(id, "iddddddddddd");
        setSelectedUserId(id);
    };

    return (
        <Container>
            {/* User List Div----- */}
            <Row className='p-4 p-md-0 p-lg-0 d-flex' style={{ marginTop: "10px", border: "1px solid red" }}>
                <Col xs={6} style={{ border: "2px solid green" }}>
                    <div style={{ backgroundColor: "#C5DFFF" }}>
                        <p className='text-center fs-3'>User List</p>
                    </div>

                    {loading ? (
                        // Display Spinner while loading data
                       
<ScaleLoader className='d-flex justify-content-center align-items-center'  size={1009}  style={{marginTop:'100px',marginBottom:"30px"}} color="blue " />
                    ) : (
                        users.map(user =>
                            <div
                                key={user.createdAt}
                                onClick={() => handleDetails(user.id)}
                                ref={selectedUserId === user.id ? selectedUserRef : null}
                                style={{
                                    backgroundColor: selectedUserId === user.id ? "#9BD3FF" : "#ECECEC",
                                    cursor: 'pointer',
                                }}
                                className='d-block d-md-flex d-lg-flex align-items-center gap-3 mt-3'
                            >
                                <p> <img style={{width:"80px" , height:"80px" ,borderRadius:"50px"}} src={ user.avatar} alt="Image not Found" /></p>
                                <p>{user.profile.firstName} {user.profile.lastName}</p>
                            </div>
                        )
                    )}
                </Col>

                {/* User Details Div----- */}
                <Col xs={6}>
                
                        <div ref={userDetailsRef}>
                            <div style={{ backgroundColor: "#C5DFFF" }}>
                                <p className='text-center fs-3'>User Details</p>
                            </div>
                            {selectedUserId && (   <div>
                            {users.filter(userDtls => userDtls.id === selectedUserId)
                                .map(filteredUser => (
                                    <div key={filteredUser.createdAt}>
                                        <div>
                                            <p className='d-flex justify-content-center'><img style={{ height: "160px", width: "160px", borderRadius: "150px" }} src={ filteredUser.avatar}  alt="Image not Found" /></p>
                                            <p className='text-center'>{filteredUser.profile.username}</p>
                                        </div>
                                        <div style={{ backgroundColor: "#DBDBDB", border: "1px solid #6C6C6C", borderRadius: "5px" }}>
                                            <p className='p-4'>{filteredUser.Bio}</p>
                                        </div>
                                        <div>
                                            <p>Full Name</p>
                                            <p className='p-4' style={{ borderRadius: '8px', border: '1px solid #6C6C6C', background: '#DBDBDB' }}>{filteredUser.profile.firstName} {filteredUser.profile.lastName}</p>
                                        </div>
                                        <div>
                                            <p>Job Title</p>
                                            <p className='p-4' style={{ borderRadius: '8px', border: '1px solid #6C6C6C', background: '#DBDBDB' }}>{filteredUser.jobTitle}</p>
                                        </div>
                                        <div>
                                            <p>Email</p>
                                            <p className='p-4' style={{ borderRadius: '8px', border: '1px solid #6C6C6C', background: '#DBDBDB' }}>{filteredUser.profile.email}</p>
                                        </div>
                                    </div>
                                ))}
                          </div>
                            )}
                        </div>
              
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
