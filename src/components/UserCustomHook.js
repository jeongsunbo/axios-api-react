import React,{ useState } from 'react';
import axios from 'axios';
import useAsync from './UseAsync';
import User from './User';

// async 함수, 콜백으로 전달 
// function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환합니다.
// 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로
// 값을 감싸 이행된 프라미스가 반환되도록 합니다.
async function getUsers(){
    // await는 async 함수 안에서만 동작합니다. await는 '기다리다’
    // response에 데이터를 받아올때 까지 기다림
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

const UserCustomHook = () => {
    const [userId, setUserId ] = useState(null); 
    const [state, refetch] = useAsync(getUsers,[],true);
    const {loading, data, error} = state;
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return <button onClick={refetch}>불러오기</button>; //처음에 안보이다가 버튼누르면 나옴
    return (
        <div>
            <ul>
                {data.map(user=>(
                    <li key={user.id} onClick={()=>setUserId(user.id)}>
                        {user.username} ({user.name})
                    </li>
                )    
                )}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {userId && <User id={userId}/>}
        </div>
    );
};

export default UserCustomHook;