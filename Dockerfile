# 단계 1: React 앱 빌드
FROM node:22.11.0 AS build

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일만 먼저 복사 (캐싱 최적화)
COPY package*.json ./

# 의존성 설치
RUN npm install --frozen-lockfile

# 애플리케이션 소스 복사
COPY . .

# React 앱 빌드
RUN npm run build

# 단계 2: Nginx를 사용하여 React 앱 제공
FROM nginx:alpine

# Nginx 기본 디렉터리에 빌드 결과물을 복사
COPY --from=build /app/build /usr/share/nginx/html

# 커스텀 Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 외부 접근을 허용할 포트 설정
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
