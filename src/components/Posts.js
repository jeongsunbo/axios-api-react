// useState와 useEffect로 데이터 로딩하기
import React,{ useState, useEffect } from 'react';
import axios from 'axios';

// 1.요청의 결과
// 2.로딩상태
// 3.에러


const Posts = () => {
    // 상태관리
    // 1.요청의 결과
    const [ posts, setPosts ] = useState(null);
    // 2.로딩상태
    const [ loading, setLoading ] = useState(false);
    // 3.에러
    const [ error, setError ] = useState(null);

    const fetchPosts = async () => {
        try{
            //요청을 시작할 때는 error와 posts를 초기화
            setError(null);
            setPosts(null);
            // loading상태를 true로 변경
            setLoading(true);
            // 요청한 데이터는 response.data안에 있음
            //get은 데이터 조회
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        }
        catch(e){
            setError(e);
        }
        setLoading(false);
    }
    // useEffect 컴포넌트가 렌더링 되는 시점에 요청을 시작
    useEffect(()=>{
        fetchPosts();
    },[])
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!posts) return null;
    return (
        <div>
            <div>
                {posts.map(post=>(
                    // key로 id를 받아야함
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
                <table>
                    <tr>
                        <th></th>
                    </tr>
                </table>
            </div>
            <button onClick={fetchPosts}>다시 불러오기</button>
        </div>
    );
};

export default Posts;