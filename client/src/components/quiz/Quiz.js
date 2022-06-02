import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Quiz({ auth: { user } }) {
    const [data2, setData2] = useState([])
    const [data, setData] = useState([])
    const [types, setTypes] = useState([])
    console.log("user", user)
    useEffect(() => {
        axios.get('/api/quiz/get-types')
            .then((body) => setTypes(body.data))
            .catch(err => console.log(err))
    }, [])
    // useEffect(() => {
    //     console.log("here")
    //     data.forEach((item) => {
    //         if (types.indexOf(item.type)===-1) {
    //             console.log(item.type)
    //             let val = [...types , item.type]
    //             setTypes(val)
    //         }
    //     })
    // }, [data])

    useEffect(() => {
        console.log("USER HERE ",user)
        axios.post('/api/quiz/get-results', user)
            .then((body) => {setData2(body.data)})
            .catch(err => console.log(err))
    }, [user])
    useEffect(() => {
        console.log(types)
    }, [types])
    return (
        <>

            <div className="container m-3">
                <h1 className='large text-primary p-3'>Skill Quiz</h1>
                <div className='dash-buttons p-3' >
                    {types.map((item) => {
                        
                        return <Link to={`/quiz-page/${item}`} className='btn btn-light'>
                            <i className='fas fa-user-circle text-primary'></i>{item}
                        </Link>
                    })}
                </div>


                <h2>Quiz Results</h2>
                {data2.length > 0 && <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Quiz Type</th>
                            <th scope="col">Status</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data2.map((item) => {
                            return (<tr>
                                <th scope="row">{data2.indexOf(item)+1}</th>
                                <td>{item.type}</td>
                                <td>{item.percentage >= 50 ? "Passsed" : "Failed" }</td>
                                <td>
                                    <div className="progress">
                                        <div className={`progress-bar ${item.percentage>=50? 'bg-success' :'bg-danger'}`} role="progressbar" style={{ width: `${item.percentage}%`}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">{`${item.percentage}%`}</div>
                                    </div>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>}
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Quiz);