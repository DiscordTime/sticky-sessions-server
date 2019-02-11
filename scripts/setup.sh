#!/bin/sh

if [ "$GCLOUD_SERVICE_KEY" = "" ]; then
  echo "GCLOUD_SERVICE_KEY env variable is empty. Exiting."
  exit 1
fi

if [ "$GOOGLE_PROJECT_ID" = "" ]; then
  echo "GOOGLE_PROJECT_ID env variable is empty. Exiting."
  exit 1
fi

# Set service account key
echo $GCLOUD_SERVICE_KEY | base64 -di > ${HOME}/gcloud-service-key.json

# Authenticate gcloud
gcloud auth activate-service-account --key-file=${HOME}/gcloud-service-key.json

# Set project ID
gcloud --quiet config set project ${GOOGLE_PROJECT_ID}
