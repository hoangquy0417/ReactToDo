pipeline {

  environment {
    dockerimagename = "tindev0702/react-todo"
    dockerImage = ""
    DOCKERHUB_CREDENTIALS = credentials('docker-account')
  }

  agent {
    kubernetes {
      yaml '''
      apiVersion: v1
      kind: Pod
      spec:
        serviceAccountName: jenkins-admin
        dnsConfig:
          nameservers:
            - 8.8.8.8
        containers:
        - name: docker
          image: docker:latest
          command:
          - cat
          tty: true
          volumeMounts:
          - mountPath: /var/run/docker.sock
            name: docker-sock
        - name: kubectl
          image: bitnami/kubectl:latest
          command:
          - cat
          tty: true
        securityContext:
          runAsUser: 0
          runAsGroup: 0
        imagePullSecrets:
          - name: regcred
        volumes:
          - name: docker-sock
            hostPath:
              path: /var/run/docker.sock
            '''
    }
  }

  stages {

    // stage('Checkout Source') {
    //   steps {
    //     checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'jenkins-demo', url: 'https://github.com/tindev0702/react-todo.git']])
    //   }
    // }
    
    // stage('Unit Test') {
    //   when {
    //     expression {
    //         return env.BRANCH_NAME != 'master';
    //     }
    //   }
      
    //   steps {
    //     sh 'echo Unit Test' 
    //   }
    // }

    // stage('Build image') {
    //   steps{
    //     container('docker') {
    //       script {
    //         sh 'docker build --network=host -t tindev0702/react-todo .'
    //       }
    //     }
    //   }
    // }

    // stage('Pushing Image') {
    //   steps{
    //     container('docker') {
    //       script {
    //         sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
    //         sh 'docker tag tindev0702/react-todo tindev0702/react-todo'
    //         sh 'docker push tindev0702/react-todo:latest'
    //       }
    //     }
    //   }
    // }

    stage('Deploying App to Kubernetes') {
      steps {
        container('kubectl') {
          withCredentials([file(credentialsId: 'kube-config', variable: 'TMPKUBECONFIG')]) {
            sh "cp \$TMPKUBECONFIG /.kube/config"
            sh 'kubectl apply -f deployment.yaml'
          }
        }
      }
    }
  }
}





// pipeline {
//   environment {
//     dockerimagename = "tindev0702/react-todo"
//     dockerImage = ""
//   }
//   agent {
//     kubernetes {
//       yaml '''
//         apiVersion: v1
//         kind: Pod
//         spec:
//           dnsConfig:
//             nameservers:
//               - 8.8.8.8
//               - 10.0.0.2
//           containers:
//           - name: maven
//             image: maven:alpine
//             command:
//             - cat
//             tty: true
//           - name: docker
//             image: docker:latest
//             command: ["tail", "-f", "/dev/null"]
//             imagePullPolicy: Always
//             volumeMounts:
//               - name: docker
//                 mountPath: /var/run/docker.sock # We use the k8s host docker engine
//           volumes:
//             - name: docker
//               hostPath:
//                 path: /var/run/docker.sock
//         '''
//     }
//   }
//   stages {
//     stage('Checkout Source') {
//       steps {
//         checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'jenkins-demo', url: 'https://github.com/tindev0702/react-todo.git']])
//       }
//     }
//     stage('Build image') {
//       steps {
//               container('docker') {
//                     sh 'docker build -t tindev0702/react-todo .'
//                 }
// //                 script {
// //                   sh 'docker build -t tindev0702/react-todo .'
// //                 }
//             }
//     }
//     stage('Pushing Image') {
//       environment {
//                registryCredential = 'dockerhub-credentials'
//            }
//       steps{
//         script {
//                  withCredentials([string(credentialsId: 'docker-account', variable: 'dockerhubpwd')]) {
//                     sh 'docker login -u tin.dev0702 -p ${dockerhubpwd}'
//                  }  
//                  sh 'docker push tindev0702/react-todo:latest'
//                 }
//       }
//     }
//     stage('Deploying React.js container to Kubernetes') {
//       steps {
//         script {
//           kubernetesDeploy(configs: "deployment.yaml", "service.yaml")
//         }
//       }
//     }
//   }
// }







