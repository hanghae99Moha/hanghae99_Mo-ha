# :hearts: Moha_MiniProject

---

프로젝트 설명!

## :sunglasses: Team

전국 각지의 간단한 숙박업소 리뷰사이트 입니다.

항상 숙소 검색과 후기 찾으시느라 어려움을 느끼시는 분들을 위한 서비스!!
각 지역의 숙소 이용객들이 올려 놓은 후기로 정보를 얻고
내가 가본 좋은 숙소 후기를 올려 정보를 공유 할 수 있습니다.

---

### Frontend(React)

- 박민우(팀장)
- 한상원

### Backend(Spring)

- 최현민
- 권윤주

---

### 개발기간

---

2022년 04월 7일 ~2022년 04월 14일

## :earth_asia: Website

http://minipjtmoha.s3-website.ap-northeast-2.amazonaws.com/

---

### :tv: Youtube

https://www.youtube.com/watch?v=km06qKrVcD4

## :balloon: Notion Link

https://www.notion.so/10-S-A-147a28176c934f57b91cfeb22da2e982

---

링크

## :speech_balloon: \***\*Project Collaboration Process\*\***

---

- \***\*Front-end 기술 스택 및 개발 환경\*\***

  - Javascirpt
  - React
  - Redux
  - AWS S3

- \***\*Back-end 기술 스택 및 개발 환경\*\***
  - java
  - spring boot
  - Mysql
  - AWS EC2
  - JPA
  - JWT

---

- **API 설계**
  | 데이터 테이블 | 기능 | METHOD | URL | request | response | 비고 |
  | ------- | ----------------------------------- | ---------- | ------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
  | 회원 정보 | 회원가입 | POST | /api/signup | {<br>userId:<br>password:<br>nickname:<br><br>} | {<br>‘ok’: true,<br>message: ‘회원가입 성공’<br>}<br>OR<br>{<br>‘ok’: false,<br>message:’회원가입 실패’<br>} | |
  | | 로그인 | POST | /api/login<br><br>아래와같이 변경<br><br>/api/loginView | {<br>userId:<br>password:<br>nickname:<br><br>} | token:<br><br>{<br>'ok':true,<br>message:’로그인 성공’<br>}<br>OR<br>{<br>‘ok’: false,<br>message:’로그인 실패’<br>} | |
  | | 아이디 중복 검사 | POST | /api/idCheck | {<br>userId:<br>} | {<br>return: false<br>}<br>아이디 중복 되지 않으면 true | |
  | | 로그인 여부 확인 | GET | /api/idlogin | | {<br>userInfo:{<br>userId: userId<br>}<br>} | |
  | | 로그아웃 | GET | /api/idCheck | | redirect:/login (replace in react) | |
  | | 로그인 정보 불러오기 | GET | /api/auth | | {<br>'ok': true,<br>result:<br>\[{<br>nickname:<br>}\]<br>} | |
  | | | | | | | |
  | 메인 페이지 | 게시글 조회<br>(메인 페이지 슬라이더 섹션, 게시글 리스트) | GET | /api/posts | | {<br>'ok': true,<br>message:<br>result:<br>\[{<br>postId:<br>title:<br>desc:<br>imageUrl:<br>category:<br>createdAt:<br>modifiedAt:<br>}\]<br>} | |
  | | 게시글 작성 | /api/posts | /api/posts | {<br>title:<br>desc:<br>imageUrl:<br>category:<br>name:<br>} | {<br>‘ok’: true,<br>message: ‘생성 성공’<br>}<br>OR<br>{<br>‘ok’: false,<br>message:’생성 실패’<br>} | |
  | | 게시글 상세 조회 | GET | /api/posts/{id} | | {<br>‘ok’: true,<br>result:<br>\[{<br>postId:<br>title: contents:<br>imageUrl:<br>category:<br>createdAt:<br>modifiedAt:<br>}\]<br>} | postId → id 변경 |
  | | 게시글 수정하기 | PUT | /api/posts/{id} | {<br>title:<br>desc:<br>imgUrl:<br>category:<br>} | {<br>‘ok’: true,<br>message: ‘수정 성공’,<br>}<br>OR<br>{<br>‘ok’: false,<br>message:’수정 실패’<br>} | |
  | | 게시글 삭제하기 | DELETE | /api/posts/{id} | {<br>postId:<br>} | {<br>‘ok’: true,<br>message: ‘삭제 성공’<br>}<br>OR<br>{<br>‘ok’: false,<br>message:’삭제 실패’<br>} | |
  | | | | | | | |
  | 댓글 | 댓글 작성 | POST | /api/comments | {<br>commentId:<br>comment:<br>} | {<br>‘ok’: true,<br>message: ‘생성 성공’<br>}<br>OR<br>{<br>‘ok’: false,<br>message:’생성 실패’<br>} | |
  | | 댓글 삭제 | DELETE | /api/comments/{id} | | {<br>‘ok’: true,<br>message: ‘삭제 성공’<br>}<br>OR<br>{<br>‘ok’: false,<br>message:’삭제 실패’<br>} |
- **Digram**
  ![Untitled](https://user-images.githubusercontent.com/61370487/163331912-e9758246-9535-406b-a369-328d3b9619d8.png)
- **Troubleshooting**
  - JWT
  - 이미지 업로드 기능 구현중 React에서 Spring으로 이미지 파일을 보낼 때 formData로 보내주어야 Spirng에서 multipart/formdata로 받을수 있었다.
  - 위 기능 구현 중 발생한 오류중 하나로, file은 제대로 전송이 되지만 text들은 서버에서 받지 못하는 상황이 발생했었고 방법을 찾아보니 Spring에서
    데이터를 받을 때, type을 정해주어야 하는 규칙이 있었다.
- **개인 회고**
