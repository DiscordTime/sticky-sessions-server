# Sticky Sessions Server

[![CircleCI](https://circleci.com/gh/DiscordTime/sticky-sessions-server.svg?style=svg)](https://circleci.com/gh/DiscordTime/sticky-sessions-server)

> Sticky Sessions is an application that helps medium to large teams to share and store their thoughts through digital-like retrospective sessions. This is the repository of the Server API.

## Build Setup

``` bash
# install dependencies
npm install

# serve at localhost:3000
npm start
```

## Docker Setup

There is also the option to build the application using Docker with the following command:

```
docker build -t sticky-server-api .
```

In order to run the application you can eith run:

```
docker run -it -p 3000:3000 --rm sticky-server-api
```

## Endpoints

#### **Get Sessions**
To be able to list all the sessions, we need to do a `GET` to the following endpoint:
```
/sessions/:id?
```
The `id` is optional but if it's defined, we will only have the `Session` which has this `id`.

#### **New Session**
To create a new `Session`, we do a `POST` to the following:
```
/sessions/
```
We also need to send the following information in a `JSON` format:
``` JSON
[
	"Loss & Pleasure (1)",
	"Gain & Pleasure (2)",
	"Loss & Pain (3)",
	"Gain & Pain (4)"
]
```
These are the `topics` which will be associated with the `session`.

*Note: For now, the `session` is scheduled to happen at the time of creation. Temporarily, we have another endpoint in which we can edit a `session` and consequently reschedule said `session`.*

#### **Edit Session**
To edit a `Session`, we do a `POST` to the following:
```
/sessions/:session_id
```
We need to send the following information in a `JSON` format
``` JSON
{
  "id": "<id of session>",
  "topics": "<topics of the session>",
  "timestamp": "<timestamp you want your session to happen>"
}
```


#### **Close Session**
To close a `Session`, we do a `POST` to the following:
```
/sessions/close/:id
```
Where `id` is the `id` of the `session` which you want to close.

#### **Add Note**
To add a new `Note` to a `Session`, we do a `POST` to the following:
```
/notes/
```
We need to send the following information in a `JSON` format:
``` JSON
{
  "topic" : "<topic which you want to add the note>",
  "session_id": "<id of session>",
  "user": "<name of the user that is adding the note>",
  "description": "<what you want to write>"
}
```

#### **Get Notes from Session**
To get all the `Notes` from a `Session`, we do a `GET` to the following:
```
/notes/:session_id
```
Where the `session_id` is the `id` of the `session` which you want all of the `notes` from.

#### **Edit Note**
To edit a `Note`, we do a `POST` to the following:
```
/notes/edit
```
We need to send the following information in a `JSON` format:
``` JSON
{
  "id": "<id of the note>",
  "topic" : "<topic which you want your note to be>",
  "session_id": "<id of session>",
  "user": "<name of the user>",
  "description": "<what you want to write>"
}
```

#### **Delete Note**
To delete a `Note`, we do a `DELETE` to the following:
```
/notes/:id
```
Where the `id` is the `id` of the `note` you want to delete.
