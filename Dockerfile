# 단계 1: React 앱 빌드
FROM node:22.11.0 AS build

# 작업 디렉터리 설정
WORKDIR /app

# Docker 캐시를 활용하기 위해 패키지 파일만 복사
COPY package*.json ./

# 의존성 설치
RUN npm install --frozen-lockfile

# 애플리케이션의 나머지 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 단계 2: Nginx를 사용하여 React 앱 제공
FROM nginx:alpine

# 빌드 출력물을 Nginx의 기본 공개 디렉터리에 복사
COPY --from=build /app/build /usr/share/nginx/html

# nginx.conf 파일을 복사하여 Nginx 설정 적용
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 외부에서 컨테이너에 접근할 수 있도록 포트 80 노출
EXPOSE 80

# Nginx 서버 시작
CMD ["nginx", "-g", "daemon off;"]
