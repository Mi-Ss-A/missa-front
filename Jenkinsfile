pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "been980804/wibee-frontend:test-1"
        DOCKER_CREDENTIALS = credentials('docker-token')
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
                    docker.withRegistry('', DOCKER_CREDENTIALS) {
                        def app = docker.build("${DOCKER_IMAGE}", "-f Dockerfile .")
                        app.push()
                    }
                }
            }
        }

        stage('Update K8S Manifest') {
            steps {
                dir('k8s-manifest') {
                    git url: DEPLOYMENT_REPO, branch: 'test', credentialsId: GIT_CREDENTIALS
                    sh '''
                    sed -i "s|image: .*$|image: ${DOCKER_IMAGE}|" front-end/deployment.yaml
                    git config user.name "been980804"
                    git config user.email "dlgusqls980804@naver.com"
                    git commit -am "Update image to ${DOCKER_IMAGE}"
                    git push origin main
                    '''
                }
            }
        }
    }
}