# FloppyBirdFromScratch
플로피 버드 게임 직접 제작하기

![Floppy Bird Gameplay](https://user-images.githubusercontent.com/44242823/138229190-466cb18d-0dad-46c0-b111-cb3847bcc8de.png)

## 빌드 및 실행
	npm install 
	npm run build
	npm start
	브라우저로 localhost:3000 접속

## 업데이트
### #3 201021
- 배경 이미지, 타겟 이미지 추가
- 이미지 애니매이션 
- 타이머 핸들러가 제거되지 않아서 생긴 문제 해결
- 소리 추가
- 키보드 스페이스바 컨트롤
### #2 201021
- 땅 제작 
- 스코어를 벽이 사라진 경우에서 피한 경우에 증가로 변경
- 이미지 폴더 추가
- 타이머가 초기 화면에서부터 시작되어 있는 버그 수정
### #1 211020
- 타켓 중력 작용과 점프
- 움직이는 벽
- 충돌
- 게임 상태: 초기, 플레이 중, 게임 오버
