## 리액트 boilerplate js 버전

### webpack 설정
webpack : 웹팩의 코어

webpack-cli : 터미널에서 웹팩 커맨드를 실행할 수 있도록 하는 도구

webpack-dev-server : 디스크에 저장되지 않는 메모리 컴파일을 사용하는 개발 서버

clean-webpack-plugin: 웹팩을 실행할 때마다 dist 폴더를 정리하는 플러그인

html-webpack-plugin: html 파일을 템플릿으로 생성할 수 있게 도와주는 플러그인

### babel 설정

babel/core : 기본적인 바벨로 최신 문법으로 변환해주는 역할을 한다.

babel/preset-env : 여러 환경에 맞게 JavaScript를 동작하게 해 준다.

babel/preset-react : 리액트를 위한 플러그인 모음

babel-loader : 바벨(babel)과 웹팩(webpack)을 연결해준다.
- json 은 기본적으로 처리가 가능하다.
- file loader : png, gif, jpg 처리
- raw loader : text 처리

### 리액트
styled-components  설치
