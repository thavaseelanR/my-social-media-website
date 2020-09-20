import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Box, Button, TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import './home.scss'
import LikeImage from '../../images/like.png';
import ShareImage from '../../images/share.png';
function Home(props) {
    const { sessionid, isUserAuthenticated } = props;
    const [userPostFinalData, setUserPostFinalData] = useState([]);

    // like-count

    const count = 0;
    const [like, setLike] = useState([]);
    debugger

    const groupedByRoomId = _.groupBy(like, f => f.id);

    const groupedMebersKey = Object.keys(groupedByRoomId);
    console.log(groupedMebersKey)
     const x = like && like.map(item => item.total_like);
     console.log(x);


    const userData = async () => {
        const url = "http://localhost:4000/get-users-post";

        const userPost = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })

        const realUserPost = await userPost.json();

        if (realUserPost !== "UN_AUTHED") {
            setUserPostFinalData(realUserPost);
            totalLike();
        }

    }

    useEffect(() => {
        if (isUserAuthenticated) {
            //  setInterval(() => {
            userData();
            //  }, 1000)

        } else {
            setUserPostFinalData([]);
        }
    }, [isUserAuthenticated]);


    const userLikeEvent = (index) => {
        return async function () {
            const url = 'http://localhost:4000/set-like-dislike-event';
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    postid: userPostFinalData[index].id,
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })

            const resLike = await res.json();
            if (resLike.status == 'success') {
                totalLike();
            }
        }

    }

    const totalLike = async () => {
        const url = 'http://localhost:4000/total-like';
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        const usersLike = await res.json();
        debugger
        if (usersLike.status.length >= 0) {
            setLike(usersLike.status)
        }
    }

    return (
        <div className="main-container">
            <h1>home page</h1>

            {
                userPostFinalData && userPostFinalData.map((items, index) => {

                    return (
                        <tr className="table-container" key={index}>
                            <h4>{index}</h4>
                            <th>NAME:</th><td>{items.username}</td>

                            <th>MESSAGE:</th><td>{items.text}</td>
                            <th>DATE:</th><td>{items.created_at}</td>
                            <div className="btn-conntainer">

                                <Button variant="contained" color="primary" className="like-btn" onClick={userLikeEvent(index)}> like
                                    <img src={LikeImage} alt="" className="imagesOne" style={{ width: '20px', paddingLeft: '10px' }} />
                                    {/* {x[index]} */}
                                    
                                </Button>
                                <Button variant="contained" color="primary" className="share-btn" > share
                                    <img src={ShareImage} alt="" className="imagesOne" style={{ width: '20px', paddingLeft: '10px' }} />
                                </Button>
                                <Button variant="contained" color="primary" className="command-btn">command</Button>
                            </div>
                        </tr>

                    )
                })
            }


        </div >
    )
}

const mapToStateProps = (state) => {
    return ({
        sessionid: state.authReducer.sessionId,
        isUserAuthenticated: state.authReducer.isUserAuthenticated
    })
}
export default connect(mapToStateProps, null)(Home);







