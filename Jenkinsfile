pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "been980804/wibee-frontend:test-3"
        DEPLOYMENT_REPO = 'https://github.com/Mi-Ss-A/wibeechat-argocd-config'
        GIT_CREDENTIALS = credentials('git-token')
    }

    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker image & Push') {
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", 'docker-token') {
                        def app = docker.build("${DOCKER_IMAGE}", "-f Dockerfile .")
                        app.push()
                    }
                }
            }
        }

        stage('Update K8S Manifest') {
            steps {
                dir('k8s-manifest') {
                    git url: DEPLOYMENT_REPO, branch: 'test', credentialsId: 'git-token'
                    sh '''
                    sed -i "s|image: .*$|image: ${DOCKER_IMAGE}|" front-end/deployment.yaml
                    git config user.name "been980804"
                    git config user.email "dlgusqls980804@naver.com"
                    git commit -am "Update image to ${DOCKER_IMAGE}"
                    git push https://${GIT_CREDENTIALS_USR}:${GIT_CREDENTIALS_PSW}@github.com/Mi-Ss-A/wibeechat-argocd-config test
                    '''
                }
            }
        }
    }
}