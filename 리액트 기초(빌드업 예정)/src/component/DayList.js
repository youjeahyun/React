import dummy from "../db/data.json" //더미데이터가져오기

export default function DayList() {
    console.log(dummy);
    return <ul className="list_day">
        {dummy.days.map(day => ( //맵을 배열을 받아서 또다른 배열을 반환해줌, 반환되는 배열은 jsx로 작성
            <li key={day.id}>Day {day.day}</li> //키는 React가 어떤 아이템이 바뀌었는 지, 혹은 추가되었는 지,
            // 혹은 삭제되었는 지를 인식하는 데 도움을 줍니다.요소에 안정적인 ID를 제공하려면 배열 내부 요소에 키를 주어야합니다.



        ))}


    </ul>;
}