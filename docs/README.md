# 🚇 지하철 노선도 경로 조회 미션

- 등록된 지하철 노선도에서 경로를 조회하는 기능을 구현한다.

## 🚀 기능 요구사항

> 프리코스 3주차 미션에서 사용한 코드를 참고해도 무관하다.

1. HTML 마크업을 구성한다.
1. 초기 데이터 입력 받기

### 초기 설정

- 프로그램 시작 시 역, 노선, 구간 데이터를 초기 설정 해야 한다.
- 거리와 소요 시간은 양의 정수이며 단위는 km와 분을 의미한다.
- 아래의 사전 등록 정보로 반드시 초기 설정을 한다.

```
1. 지하철역으로 교대, 강남, 역삼, 남부터미널, 양재, 양재시민의숲, 매봉 역 정보가 등록되어 있다.
2. 지하철 노선으로 2호선, 3호선, 신분당선이 등록되어 있다.
3. 노선에 역이 아래와 같이 등록되어 있다.(왼쪽 끝이 상행 종점)
    - 2호선: 교대 - ( 2km / 3분 ) - 강남 - ( 2km / 3분 ) - 역삼
    - 3호선: 교대 - ( 3km / 2분 ) - 남부터미널 - ( 6km / 5분 ) - 양재 - ( 1km / 1분 ) - 매봉
    - 신분당선: 강남 - ( 2km / 8분 ) - 양재 - ( 10km / 3분 ) - 양재시민의숲
```

### 경로 조회 기능

<img src="/images/path_result.jpg" width="100%">

- 출발역과 도착역을 입력받아 경로를 조회한다.
- 경로 조회 시 총 거리, 총 소요 시간을 함께 출력한다.
- 경로 조회 시 `최단 거리` 또는 `최소 시간` 옵션을 선택할 수 있다.

### 예외 처리

- 출발역과 도착역은 2글자 이상이어야 한다.
- 존재하지 않는 역을 출발역 또는 도착역으로 입력할 수 없다.
- 경로 조회 시 출발역과 도착역이 같을 수 없다.
- 경로 조회 시 출발역과 도착역이 연결되지 않으면 경로를 조회할 수 없다.
- 그 외 정상적으로 프로그램이 수행되지 않은 경우 `alert`으로 에러를 출력한다.

<br>

## 💻 프로그래밍 실행 결과

### 경로 조회

<img src="/images/path_result.gif" width="100%">

## ✅ 프로그래밍 요구사항

### 길찾기 관련 기능

- 출발역을 입력하는 input 태그는 `departure-station-name-input` id 속성값을 가진다.
- 도착역을 입력하는 input 태그는 `arrival-station-name-input` id 속성값을 가진다.
- 최단거리, 최소시간을 선택하는 radio는 `search-type` name 속성값을 가진다.
  - **radio option의 default 값은 최단거리이다.**
- 길찾기 버튼은 `search-button` id 속성값을 가진다.
- 📝 결과는 `table`을 이용하여 보여준다.

## ❗️힌트

## 데이터 초기화

자바스크립트에서 데이터를 초기화하는 방법 중에 하나는 아래와 같이 data를 `export`하고, `import`하는 것이다.

```javascript
export const users = [
  {
    name: "Alt",
  },
  {
    name: "Jamie",
  },
  {
    name: "Sony",
  },
];

export const courses = [
  {
    name: "frontend",
  },
  {
    name: "backend",
  },
  {
    name: "iOS",
  },
  {
    name: "Android",
  },
];
```

위와 같이 데이터를 `export`하면 아래와 같이 데이터를 `import` 하여 사용할 수 있다.

```javascript
import { users, courses } from "./data.js";

function App() {
  this.users = users;
  this.courses = courses;
}
```

## 최단 경로 라이브러리

- `utils/Dijkstra.js` 라이브러리를 활용하면 간편하게 최단거리를 조회할 수 있다.
- 정점(Vertex)과 간선(Edge), 그리고 가중치 개념을 이용
  - 정점: 지하철역
  - 간선: 지하철역 연결정보
  - 가중치: 거리 or 소요 시간
- 최단 거리 기준 조회 시 가중치를 거리로 설정
- 최소 시간 기준 조회 시 가중치를 시간으로 설정

```javascript
import Dijkstra from "./utils/Dijkstra.js";
const dijkstra = new Dijkstra();

//dijkstra.addEdge("출발역", "도착역", 거리 또는 시간);
dijkstra.addEdge("V1", "V2", 2);
dijkstra.addEdge("V2", "V3", 2);
dijkstra.addEdge("V1", "V3", 100);

const result = dijkstra.findShortestPath("V1", "V3");
// result = ["V1", "V2", "V3"]
```