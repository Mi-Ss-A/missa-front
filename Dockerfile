# 단계 1: React 앱 빌드
FROM node:22.11.0 AS build

# 작업 디렉터리 설정
WORKDIR /app

# Docker 캐시를 활용하기 위해 패키지 파일만 복사
COPY package*.json ./

# 의존성 설치
# --frozen-lockfile : 기록된 의존성 버전 그대로 설치되도록 강제 (일관된 빌드 환경 보장)
RUN npm install --frozen-lockfile

# 애플리케이션의 나머지 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 단계 2: 경량 웹 서버를 사용하여 React 앱 제공
FROM nginx:alpine

# 이전 단계의 빌드 출력물을 Nginx의 기본 공개 디렉터리에 복사
COPY --from=build /app/build /usr/share/nginx/html

# 기본 Nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# 외부에서 컨테이너에 접근할 수 있도록 포트 80 노출
EXPOSE 80

# Nginx 서버 시작
CMD ["nginx", "-g", "daemon off;"]
