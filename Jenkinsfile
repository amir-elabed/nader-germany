pipeline {
   environment {
    imageName = "conectiverse"
    branchName = "${GIT_BRANCH}"
    dockerImage = ''
    containerName='conectiverse'
  }
  agent any
  stages {
   stage('Building image') {
      when {
        expression { ["main"].contains(branchName) == true  }
      }
      steps{
    checkout scm
        script {
          sh "docker image prune -a"
          dockerImage = docker.build("${imageName}-${branchName}", "--network host --build-arg env=${branchName} .")

        }
      }
    }
    stage('Push Image') {
      when {
        expression { ["main"].contains(branchName) == true  }
      }
      steps{
        script {
          docker.withRegistry( 'https://docker.tn.oxa.cloud', 'docker-registry' ) {
             dockerImage.push('latest')
          }
        }
      }
    }
       stage('Deploy Container') {
      when {
        expression { ["main"].contains(branchName) == true  }
      }
      steps{
        script {
        sshagent (credentials: ['docker-engine']) {
          withCredentials([usernamePassword(credentialsId: 'docker-registry', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
         sh "scp docker-compose.yml root@node11603-conectiverse-prod.tn.oxa.cloud:/root"
         sh "ssh -o StrictHostKeyChecking=no root@node11603-conectiverse-prod.tn.oxa.cloud 'docker-compose rm -svf ${containerName}-${branchName}; docker system prune -a --volumes -f; docker login https://docker.tn.oxa.cloud -u ${USERNAME} -p ${PASSWORD}; docker pull docker.tn.oxa.cloud/${imageName}-${branchName}; docker-compose up -d ${containerName}-${branchName}'"
}
  }
  }

    }
  }
}
}


