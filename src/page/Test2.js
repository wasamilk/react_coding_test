import React,{ useState, useRef, useCallback, useEffect } from 'react';

 
function Test2( props ){ 

    const nameRef = useRef(null); 

    const [toDoList, setToDoList] =  useState(
        [] 
    ); 
    
    // state의 속성변수들
    const [inputText, setInputText] =  useState('');
    const [nextId, setNextId] =  useState(toDoList.length+1);
 

    // 지역변수 textChange 선언하고 화살표함수를 저장하기. 
    const textChange = 
        useCallback(
            (e) => {
                // 지역변수 val 선언하고 웹상에 입력한 데이터 가져오기.
                let val = e.target.value; // 유효성체크를 위해 바로 setInputText에 넣지 않고 변수로 뺀다. 
                setInputText(val);
            }
            ,[] 
        );
        

    // 지역변수 add 선언하고 화살표함수를 저장하기
    // 화살표함수는 students 변수 안에 사용정 객체에 학생 정보를 추가하는 구문을 내포하고 있다.
    const add = (e) => {  
        let targetText = inputText; 
        // 입력데이터가 undefined이거나 null이면 ""로 갱신. 이후 String 메소드 호출 에러 방지
        if(targetText===undefined || targetText==null) {targetText = "";}  
            
        // 만약에 입력데이터가 없으면 경고하고 화살표함수 중단
        if(targetText==="" ){
            alert("할 일은 꼭 입력해주세요.");
            return;
        }        


        const new_toDo = toDoList.concat( {id:nextId, text:targetText} );
        
        //------------------------------------------
        //속성변수에 갱신해서 저장하기. 
        setToDoList( new_toDo );
        setNextId( nextId+1 );        
        setInputText( "" );  

 
        nameRef.current.focus();
    }

    // 내용 삭제 함수
    const remove = (toDo_id) => {
        const new_toDo = toDoList.filter(
            toDo => toDo.id!==toDo_id
        );  //괄호,블럭 생략한 filter함수
        setToDoList(new_toDo);
        nameRef.current.focus();
    }

    // 입력 시 enter로 전송 가능하게 설정
    const keyPress = e => {   
        if(e.key === 'Enter'){
            add();
        }  
    }

    // 
    const toDoListLi= toDoList.map(
        toDo =>
            <tr>
                <><td> {toDo.id} </td><td>{toDo.text}</td> <td> <button class='del' onClick={()=>{remove(toDo.id);}}>del</button></td> </>
            </tr>
    ).reverse();

    return (  
        <>
            <h1>TO DO</h1>
            <center>  
                    <table> 
                        <tr>
                            <td colSpan={3}>
                                {/* 내용 입력 받는 부분 */}
                                 <input  class='underline'
                                        type='text' 
                                        ref={nameRef} 
                                        value={inputText}  
                                        placeholder="input text"
                                        onChange = {textChange} 
                                        onKeyPress={keyPress} 
                                        list-style="none"/>&nbsp;
                                 <button class='add' onClick={add}>ADD</button>
                            </td>
                        </tr>
                        {/* 입력받은 내용 차례로 출력 */}
                        {toDoListLi} 
                    </table> 
            </center>    
        </>
    )
}

        

export default Test2;

