#!/bin/sh

if [ "$IMAGE_NAME" = "" ]; then
  echo "IMAGE_NAME env variable is empty. Exiting."
  exit 1
fi

if [ "$GOOGLE_PROJECT_ID" = "" ]; then
  echo "GOOGLE_PROJECT_ID env variable is empty. Exiting."
  exit 1
fi

# Authenticate to Google Container Registry
gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://gcr.io

# Builds Docker image
docker build -t ${IMAGE_NAME} .

if [ "$CIRCLE_BRANCH" = "issue_55" ]; then
  echo "Deploying application to Staging environment"

  # Injects firebase DB file
  echo $FIREBASE_DB_STAG | base64 -di > src/db/firebaseDB/keys/index.js

  # Tags newly created image
  docker tag ${IMAGE_NAME} gcr.io/${GOOGLE_PROJECT_ID}/${IMAGE_NAME}:stag
  
  # Pushes image to Container Registry
  docker push gcr.io/${GOOGLE_PROJECT_ID}/${IMAGE_NAME}:stag
  
  # Deploys application
  gcloud --quiet compute ssh stick-sessions --zone us-east1-b -- 'cd /home/app && ./restart_server_stag.sh'
elif [ "$CIRCLE_BRANCH" = "master" ]; then
  echo "Deploying application to Production environment"

  # Injects firebase DB file
  echo $FIREBASE_DB | base64 -di > src/db/firebaseDB/keys/index.js

  # Tags newly created image
  docker tag ${IMAGE_NAME} gcr.io/${GOOGLE_PROJECT_ID}/${IMAGE_NAME}:${CIRCLE_SHA1}
  docker tag ${IMAGE_NAME} gcr.io/${GOOGLE_PROJECT_ID}/${IMAGE_NAME}:latest

  # Pushes image to Container Registry
  docker push gcr.io/${GOOGLE_PROJECT_ID}/${IMAGE_NAME}:${CIRCLE_SHA1}
  docker push gcr.io/${GOOGLE_PROJECT_ID}/${IMAGE_NAME}:latest

  # Deploys application
  gcloud --quiet compute ssh stick-sessions --zone us-east1-b -- 'cd /home/app && ./restart_server.sh'
fi
