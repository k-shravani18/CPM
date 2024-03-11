pipeline {
    agent any
    environment {
        HTTP_PROXY = 'http://185.46.212.90:80'
        HTTPS_PROXY = 'http://185.46.212.90:443'
        NO_PROXY = '10.1.80.162:8082,api.kubernetes.abg.com:6443'
    }
    stages {
        stage('Stage 1 - Code Checkout') {
            steps {
                checkout changelog: false, poll: false, scm: scmGit(branches: [[name: 'feature/dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'cpm-dev-git-personal-token', url: 'https://gitlab.adityabirla.com/gitlab-instance-70324716/cpm.git']])
            }
        }
        stage('Stage 2 - Code Test') {
            steps {
                echo "Testing the code using sonarqube"
            }
        }
        stage('Stage 3 - Application Build') {
            steps {
                sh 'podman build -t 10.1.80.162:8082/abgrepo/cpm-dev:latest . '
            }
        }
        stage('Stage 4 - Push Application Image to JFrog') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jfrog-container-registry', variable: 'jfrog')]) {
                        sh 'podman login -u admin -p $jfrog 10.1.80.162:8082'
                        sh 'podman push 10.1.80.162:8082/abgrepo/cpm-dev:latest'
                    }    
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMvakNDQWVhZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJek1EVXlOVEV5TlRjeE5sb1hEVE16TURVeU1qRXlOVGN4Tmxvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBSnRBCmF2Q1dVSlkxWjVKM1E1K0hpUnR2QTVDMDM1amQzZ1E3eFRyYWlGQTM0cmh2YUgwZVplb2poK3cwdjN5VEZMNTcKQzZ0QVRDaFpDYk5veFpPQnBETGdSTUh5Z0J0M1pTOUh4eFhoZnlxV2xETEhNK2hiMCs5MFZRMFJpQnFqbEs4bwo0YnpWMVFYa1M0Q21CYjN5ZmxJa1NEdDJhSGhDRjJLejYyUjE0WUVNWmZrbWRmdEJXclFIRmtlTXV6RFhDQ0pGCk81UXQ0a2JvZFJUUnhvMzc2eTBXQ1JXK1MwMTVRc3RYNmJuclNoeXJITGdBUThVbDNERDJxeklBMnNjajF6MXgKQWxYQlhYVEU5bUovY28zZERDZTZodXZyeEU5UGZwT2w5ampMSlM5RVp5SE96T3Y2akVhTWcxZXZOdFpMKzRuVAphd3BId2FDSzlhakliMVYzSFBjQ0F3RUFBYU5aTUZjd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZNVmhEZFVVVzN1OVduOUl0WWdnOXhGdzdMajJNQlVHQTFVZEVRUU8KTUF5Q0NtdDFZbVZ5Ym1WMFpYTXdEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBRU1odDliUjE1MTRHZ1IrSTh1OApuSEZPb0t1Qk9OOGsyZ2c2dGZGVTBCQ0RvU0NleXFHVXhzVmJHVWU1cWtvRlBEeWg3bllpS0loVUVXWE1YWEdzClNrNndXRGhPcEZ5MnFIYlluenRuZ2FjR3UvNFk4MTNUQ245ejQ1dlFxTEZndXpnK1pEb2Z0MURBaHBuUUVMNU8KN2xZTDVrQktUdGl1S0dZaHR5V3R1NTJUM29XNnRuT21UNDVpa1REakJZV004NExVd3lTNzZLUGtvTGpMNnVxdAp6alk1ZEl5b201R3lCQXo5Y0p4Ty9kOXRCSWVWQ0tocGtuUjRCckhFYU5hOUV0aW1jWGpYaXdWSmNGeWdSSDVDCnpaVm8rY3RNbjd5YktNMUswcjkwWjIrYmVYRVRidW1YNHdCVHJFb0l0b0N1MEh4TncrK3loNERjU3JFUS92VXcKUE5JPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==', credentialsId: 'kubeconfig-admin-abg', serverUrl: 'https://api.kubernetes.abg.com:6443') {
		            sh 'kubectl -f cpm-dev-app.yml apply'
                }
            }
        }
    }
}

