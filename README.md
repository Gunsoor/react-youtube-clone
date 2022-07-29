# 리엑트 노드 보일러 플레이트

## 기능

1. 회원가입
   MongoDB를 사용하여 유저 DB 관리
2. 로그인
   JWT 토큰을 DB에 저장하고 토큰값 검증
3. 로그아웃
   DB의 JWT 토큰 삭제
4. 권한
   node express 서버에서 auth 미들웨어를 통해 API 별 권한을 확인
