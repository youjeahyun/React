import dummy from "../db/data.json"

export default function Day() {
    const day = 1; // 1일차 영단어만 나옴, 2로바꾸면 2일차 영단어만나옴
    const wordList = dummy.words.filter(word => (
        word.day === day
    ))
    console.log(wordList)



    return (
        <>
            <table>
                <tbody>
                    {wordList.map(word => ( //키는 React가 어떤 아이템이 바뀌었는 지, 혹은 추가되었는 지, 
                        //혹은 삭제되었는 지를 인식하는 데 도움을 줍니다.요소에 안정적인 ID를 제공하려면 배열 내부 요소에 키를 주어야합니다.
                        <tr key={word.id}>
                            <td>{word.eng}</td>
                            <td>{word.kor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
