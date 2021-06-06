### ecosystem.config.js 구성하기
```javascript
module.exports = {
  apps:[{
    name:'app',
    script:'yarn start',
    instances: 0, // 0 means making process the number of core. 
    exec_mode: 'cluster',
  }]
}
```

### pm2 명령어
1. 앱 시작하기 : `pm2 start ecosystem.config.js`
2. 프로세스 개수 조정하기 : `pm2 scale APP_NAME NUMBER`
3. 앱 중단하기 : `pm2 stop APP_NAME`
4. 앱 실행하기 : `pm2 reload APP_NAME`
5. 프로세스 상태 표시 : `pm2 list`
6. 프로세스 상세 모니터링 `pm2 monit`
   

### 로드 밸런싱
PM2의 클러스터는 분산컴퓨팅의 그 용어와 비슷한 역할을 하는데, 앱을 지정한 개수만큼 PM2에 등록하고 Load Balancing(LB) 를 통해 부하를 분산시켜준다. PM2의 LB 는 Round Robin(RR) 방식으로 동작함.

위와 같이 ecosystem.config.js를 통해 실행하거나.

아래와 같은 명령어로 실행 할 수 있다.

`pm2 start server.js --name "APP_NAME" -i NUMBER_OF_CLUSTERS -o ./test.log`