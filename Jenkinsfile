pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
        cron('H 2 * * *')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t adactin-playwright-automation .'
            }
        }

        stage('Run UI and API Tests') {
            steps {
                sh """
                    docker run --rm \
                        -v "${WORKSPACE}/allure-results:/app/allure-results" \
                        -v "${WORKSPACE}/test-results:/app/test-results" \
                        -v "${WORKSPACE}/logs:/app/logs" \
                        adactin-playwright-automation
                """
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh """
                    docker run --rm \
                        -v "${WORKSPACE}/allure-results:/app/allure-results" \
                        -v "${WORKSPACE}/allure-report:/app/allure-report" \
                        adactin-playwright-automation \
                        npx allure generate allure-results --clean -o allure-report
                """
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            archiveArtifacts artifacts: 'allure-report/**, test-results/**, logs/**', allowEmptyArchive: true
            cleanWs()
        }
    }
}
