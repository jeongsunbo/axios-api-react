import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
// loading, data, error를 관리해주는 객체를 만든다.
const initialState = {
    loading: false,
    data: null,
    error: null
}
// 초기값, reducer함수생성
function reducer( state, action ){
    switch(action.type){
        case'LOADING':
        return {
            loading:true,
            data:null,
            error:null
        };
        case 'SUCCESS':
        return {
            loading:false,
            data:action.data,
            error:null
        };
        case 'ERROR':
        return {
            loading:false,
            data:null,
            error:action.error
        };
        default:
        return state;
    }
}

const PostsReducer = () => {
    const [ state, dispatch ] = useReducer( reducer, initialState );
    const fetchPosts = async () => {
        dispatch({ type:"LOADING" });
        try {
            // get : 데이터 조회
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            dispatch({ type: "SUCCESS", data: response.data });
        }
        catch(e){
            dispatch({ type:'ERROR', error:e });
        }
    }
    // useEffect 컴포넌트가 렌더링 되는 시점에 요청을 시작
    useEffect(()=>{
        fetchPosts();
    },[]);
    const { loading, data, error } = state;
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return (
        <div>
            <div>
                {data.map(post=>(
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
            <button onClick={fetchPosts}>다시 불러오기</button>
        </div>
    );
};

export default PostsReducer;