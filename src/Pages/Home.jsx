import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(true);
 const brokenImg='https://i.ibb.co/C8QnRh2/img-not-found.png'|| 'No data SHow';
 
 const imgOnLoad=(e)=>{
    console.log(`sucess ${e.currentTarget.src} loaded.`);
    if(e.currentTarget.className !=='error'){
        e.currentTarget.className ="success"
    }
 };
 const imageOnError =(e)=>{
    e.currentTarget.src=brokenImg;
    e.currentTarget.className ="error"
 }

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
            <Row className='p-4 p-md-0 p-lg-0 d-flex' style={{ marginTop: "10px" }}>
                <Col xs={6} >
                    <div style={{ backgroundColor: "#C5DFFF" }}>
                        <p className='text-center fs-3 p-2'>User List</p>
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
                                className='d-block d-md-flex d-lg-flex align-items-center gap-3 mt-3 p-1 hover-black'
                            >
                                <p  className='mt-3 p-2 p-md-0 p-lg-0 '> <img style={{width:"50px" , height:"50px" ,borderRadius:"50px",border:"1px dotted green"}} onLoad={imgOnLoad} onError={imageOnError} src={ user.avatar} alt="No image here" /> </p>
                             {/* <p>  {user?.avatar ?  <img style={{width:"80px" , height:"80px" ,borderRadius:"50px"}} src={ user.avatar} alt="" /> : <img src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/339.jpg' /> }</p> */}
                                <p className='mt-3 p-2 p-md-0 p-lg-0'>{user.profile.firstName} {user.profile.lastName}</p>
                            </div>
                        )
                    )}
                </Col>

                {/* User Details Div----- */}
                <Col xs={6}>
                
                        <div ref={userDetailsRef}>
                            <div style={{ backgroundColor: "#C5DFFF" }}>
                                <p className='text-center fs-3 p-2'>User Details</p>
                            </div>
                            {selectedUserId && (   <div style={{border:"1px dotted pink"}} className='px-2 px-md-5 px-lg-5 '>
                            {users.filter(userDtls => userDtls.id === selectedUserId)
                                .map(filteredUser => (
                                    <div key={filteredUser.createdAt}>
                                        <div className='my-4'>
                                            <p className='d-flex justify-content-center'><img style={{ height: "130px", width: "130px", borderRadius: "150px",border:"1px dotted green" }} onLoad={imgOnLoad} onError={imageOnError} src={ filteredUser.avatar}  alt="Image not Found" /></p>
                                            <h6 className='text-center'>@ {filteredUser.profile.username}</h6>


                                        </div>
                                        <div className='mb-3' style={{ backgroundColor: "#DBDBDB", border: "1px solid #6C6C6C", borderRadius: "5px" }}>
                                            <p className='p-2 '> {filteredUser.Bio}</p>
                                        </div>
                                        <div>
                                            <p>Full Name</p>
                                            <p className='p-2' style={{ borderRadius: '8px', border: '1px solid #6C6C6C', background: '#DBDBDB',marginTop:"-10px", wordWrap: 'break-word' }}>{filteredUser.profile.firstName} {filteredUser.profile.lastName}</p>
                                        </div>
                                        <div>
                                            <p>Job Title</p>
                                            <p  className='p-2 ' style={{ borderRadius: '8px', border: '1px solid #6C6C6C', background: '#DBDBDB',marginTop:"-10px", wordWrap: 'break-word' }}>{filteredUser.jobTitle}</p>
                                        </div>
                                        <div>
                                            <p>Email</p>
                                            <p className='p-2  overflow-auto ' style={{ borderRadius: '8px', border: '1px solid #6C6C6C', background: '#DBDBDB', marginTop: '-10px', whiteSpace: 'nowrap', overflowWrap: 'break-word' }}>
  {filteredUser.profile.email}
</p>

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
