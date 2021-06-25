# aulim(아주대학교 학교생활 )

## Introduction

대학 생활에 있어서 학과 공부는 필수적이다. 정해진 시간에 수업을 듣고 과제를 제출하며, 퀴즈나 중간/기말고사를 준비한다. 그 과정에서 아래와 같은 어려움을 겪고 있다. 

  1. 공지사항을 미처 확인하지 못하는 경우이다. PC를 사용하면서, 아주 Bb에 올라온 공지사항을 확인하기 위해서는 사용자가 직접 해당 과목을 찾아 확인을 해야 한다. 

2. 동영상 강의를 학생이 스스로 시간을 내어 학습해야 함에 따라 효율적인 시간 관리를 위한 학습 계획 수립이 필요하다. 그러나, 대부분의 학생들은 시간 관리에 어려움을 겪고 있다. 

 3. 다른 사람과 스터디 등의 이유로 공통된 공강시간을 알고 싶을 때 불편함이 있다. 인원 수가 늘어날수록, 사용자가 직접 공강시간을 비교하기에는 매우 번거롭다.

 위 문제들을 해결하기 위해 활동 스트림 제공, 학습 계획표 추천, 공강시간 추출 등의 기능을 모두 통합하는 서비스 제공한다. 이러한 기능들을 통해서 아주대학교 학생들의 학교 생활에 밀접한 도움이 되기를 바란다.

## Development

- 필요한 SW
```
Node js 14.17.0 version
Mysql community 8.0.24 version
Python 
Chrome driver version 89 / 9

```

- 모든 dependency 설치
```
npm install
npm install nodemon
npm install websocket
```

- Python 인코딩 설정
```
환경변수 설정 -> 시스템 변수
변수 이름 : PYTHONIOENCODING
변수 값 : utf-8
```

- 초기 데이터 베이스 구축

```
1. cmd 실행
2. mysql -u root -p 입력
3. mysql password 입력
4. source talbe.sql 입력

현재 코드는 database user는 root, password는 1234로 작성되어있음
다른 user name이나 password를 사용 시 database.js에서 user와 password 변경 필요
```

- 서버 실행
```
cmd 에서 AULIM Directory로 접근 후

nodemon app.js 입력
```

- 시스템 접속
```
서버를 실행 한 후 
http://localhost:3000/ 로 접속
```

## Contact
이창엽 : dlckdduq97@gmail.com
신승헌 : gody8756@ajou.ac.kr
이재협 : jae213@ajou.ac.kr
김진수 : wlstnsp1@ajou.ac.kr
양준길 : wnsrlf0721@ajou.ac.kr