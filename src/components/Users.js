// useState와 useEffect로 데이터 로딩하기
import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    // 상태관리
    // 1.요청의 결과
    // 2.로딩상태
    // 3.에러
    const [ users, setUsers ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] =useState(null);
    // 한번만 요청
    const fetchUsers = async ()=>{
        try {
            // 요청이 시작할 때에는 error와 users를 초기화
            setError(null);
            setUsers(null);
            // loading상태를 true로 변경
            setLoading(true);
            // 요청한 데이터는 response.data안에 있습니다.
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        }
        catch(e){
            setError(e);
        }
        setLoading(false);
    }
    // useEffect 컴포넌트가 렌더링 되는 시점에 요청을 시작
    useEffect(()=>{
        fetchUsers();
    },[])
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!users) return null;
    return (
        <div>
            <ul>
                {users.map(user=>(
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                )    
                )}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default Users;