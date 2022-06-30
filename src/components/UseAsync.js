import { useReducer, useEffect } from 'react';
const initialState = {
    loading: false,
    data: null,
    error: null
}
function reducer( state, action ){
    switch(action.type){
        case 'LOADING':
        return {
            loading:true,
            data: null,
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
// useAsync함수는 callback으로 받아온 것(getUsers,빈배열)을 사용

// 에러 핸들링
// try와 catch문을 사용하면 스크립트가 죽지않고 에러처리가 가능함.
// try와 catch문을 사용해서 에러가 발생해도 다음거를 실행가능
// try{
// 	코드작성(에러가 발생하지 않으면 계속 )
// }
// catch(error){     //(error) 어떤 에러를 받았는지 잡아줌
// 	코드작성
// }

function useAsync(callback, deps = [], skip = false){
    const[state, dispatch] = useReducer(reducer, initialState);
    const fetchDate = async () => {
        dispatch({type:"LOADING"});
        try{
            const data = await callback(); // getUsers가 콜백에 담김
            dispatch({
                type:"SUCCESS",
                data: data
            })
        }
        catch(e){
            dispatch({
                type:"ERROR",
                error:e
            })
        }
    }
    useEffect(()=>{
        // skip이 true면 리턴 fetchDate()실행안됨
        if(skip) return;
        fetchDate();
        // eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
    }, deps);
    return[state, fetchDate];
}
export default useAsync;