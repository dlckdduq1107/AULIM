# aulim

## Development
- 모든 dependency 설치

- 필요한 SW
```
Node js 14.17.0 version
Mysql community 8.0.24 version
Python 
Chrome driver version 89 / 9

```

- npm package install
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
최초 한번만 실행하면됨
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