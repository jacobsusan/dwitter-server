DWITTER-SERVER
==============

Tech Stack : Node.js

Framework : Express.js


API Specification
=====

Sign Up
-------
API Description     : Create/Add a new dweeter

Url                 : `http://localhost:3002/signup`

Request Method      : `POST`

Requesty Headers    : `Content-Type: application/json`

Request Body        : 
```json
{
    "username": "popeye",
    "fullName": "Popeye",
    "password": "popeye"
}
```

Response Status Code: `201 Created`

Response Body       : 
```json
{
    "id": 4,
    "username": "popeye",
    "fullName": "Popeye",
    "createdAt": "2021-04-18T11:05:16.745Z",
    "updatedAt": "2021-04-18T11:05:16.745Z"
}
```


Login
-----
API Description     : Log into the system using username and password

Url                 : `http://localhost:3002/login`

Request Method      : `POST`

Requesty Headers    : `Content-Type: application/json`

Request Body        : 
```json
{
    "username": "popeye",
    "password": "popeye"
}
```

Response Status Code: `200 OK`

Response Body       : 
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0"
}
```

Get User Details
----------------
API Description     : Get the details of a dweeter

Url                 : http://localhost:3002/api/v1/users/popeye 
                      (format : /api/v1/users/:dweeterUserName)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json{
                        "id": 4,
                        "username": "popeye",
                        "fullName": "Popeye",
                        "createdAt": "2021-04-18T11:05:16.745Z",
                        "updatedAt": "2021-04-18T11:05:16.745Z"
                    }```


GET FEED/DWEETS FROM FOLLOWERS
------------------------------
API Description     : Get all the dweets from  followers

Url                 :  http://localhost:3002/api/v1/users/4/feeds
                      (format : /api/v1/users/:userId/feeds)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                        "id": 1,
                        "fullName": "polo",
                        "username": "polo",
                        "dweetText": "Polo's first Dweet",
                        "dweetImg": "https://media.giphy.com/media/63I6FXZTXks2A/giphy.gif",
                        "createdAt": "2021-04-18 11:05:35.778 +00:00"
                    }, {
                        "id": 2,
                        "fullName": "Bugs Bunny",
                        "username": "bunny",
                        "dweetText": "Bugs Bunny's first Dweet",
                        "dweetImg": "https://media.giphy.com/media/sNccmbnI77b71ij1aJ/giphy.gif",
                        "createdAt": "2021-04-18 11:06:35.571 +00:00"
                    }, {
                        "id": 3,
                        "fullName": "Charlie Brown",
                        "username": "char",
                        "dweetText": "Charlie Brown's first Dweet",
                        "dweetImg": "",
                        "createdAt": "2021-04-18 11:06:54.767 +00:00"
                    }]```
 

SEARCH DWEETERS
---------------
API Description     : Search for a Dweeter (using a part of either username or full name)

Url                 : http://localhost:3002/api/v1/users/search/dweeter?searchText=po
                      (format : /api/v1/users/search/dweeter?searchText=:searchText)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                        "id": 1,
                        "username": "polo",
                        "fullName": "polo",
                        "createdAt": "2021-04-18T11:04:09.262Z",
                        "updatedAt": "2021-04-18T11:04:09.262Z"
                    }, {
                        "id": 4,
                        "username": "popeye",
                        "fullName": "Popeye",
                        "createdAt": "2021-04-18T11:05:16.745Z",
                        "updatedAt": "2021-04-18T11:05:16.745Z"
                    }]```
 

FOLLOW ANOTHER DWEETER
----------------------
API Description     : Follow another Dweeter

Url                 : http://localhost:3002/api/v1/users/4/following
                      (format : /api/v1/users/:userId/following)

Request Method      : POST

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Request Body       : ```json{
                        "userId": 1
                    }```
                    (where "userId" in body is the Id of the Dweeter whom the userId(follower) in url want to follow )

Response Status Code: 201 Created

Response Body       : ```json{
                        "id": 12,
                        "userId": 1,
                        "followerId": "4",
                        "updatedAt": "2021-04-18T11:11:18.886Z",
                        "createdAt": "2021-04-18T11:11:18.886Z"
                    }```


GET LIST OF FOLLOWERS
---------------------
API Description     : Get list of followers

Url                 : http://localhost:3002/api/v1/users/4/followers
                      (format : /api/v1/users/:userId/followers)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                        "followerId": 1
                    },
                    {
                        "followerId": 3
                    },
                    {
                        "followerId": 4
                    }]```

GET LIST OF USERS I FOLLOW
--------------------------------
API Description     : Get list of followers

Url                 : http://localhost:3002/api/v1/users/4/following
                      (format : /api/v1/users/:userId/following)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                        "userId": 1
                    }, {
                        "userId": 2
                    }, {
                        "userId": 3
                    }, {
                        "userId": 4
                    }]```

SEARCH DWEETS
-------------
API Description     : Search for any existing dweets containing the search text

Url                 : http://localhost:3002/api/v1/users/search/dweet?searchText=dweet
                      (format : /api/v1/users/search/dweet?searchText=:searchText)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                        "id": 1,
                        "fullName": "polo",
                        "username": "polo",
                        "dweetText": "Polo's first Dweet",
                        "dweetImg": "https://media.giphy.com/media/63I6FXZTXks2A/giphy.gif",
                        "createdAt": "2021-04-18 11:05:35.778 +00:00"
                    }, {
                        "id": 2,
                        "fullName": "Bugs Bunny",
                        "username": "bunny",
                        "dweetText": "Bugs Bunny's first Dweet",
                        "dweetImg": "https://media.giphy.com/media/sNccmbnI77b71ij1aJ/giphy.gif",
                        "createdAt": "2021-04-18 11:06:35.571 +00:00"
                    }, {
                        "id": 3,
                        "fullName": "Charlie Brown",
                        "username": "char",
                        "dweetText": "Charlie Brown's first Dweet",
                        "dweetImg": "",
                        "createdAt": "2021-04-18 11:06:54.767 +00:00"
                    }]```
 

LIKE A DWEET
------------
API Description     : React/Like a dweet

Url                 : http://localhost:3002/api/v1/users/reactions/1
                      (format : /api/v1/users/reactions/:dweetId)

Request Method      : POST

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Request Body        : ```json{
                        "reactorId": "4"
                    }```
                    (Where "reactorId is the Id of the person reacting/liking a dweet)

Response Status Code: 201 Created

Response Body       : ```json{
                        "id": 1,
                        "dweetId": "1",
                        "reactorId": "4",
                        "reactionType": "like",
                        "updatedAt": "2021-04-18T11:14:24.789Z",
                        "createdAt": "2021-04-18T11:14:24.789Z"
                    }```
 

GET LIKE DETAILS ON A DWEET
---------------------------
API Description     : Get the details of reactions/likes on a dweet.Returns the people who liked the dweet with time.

Url                 : http://localhost:3002/api/v1/users/reactions/2
                      (format : /api/v1/users/reactions/:dweetId)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                        "id": 3,
                        "fullName": "polo",
                        "username": "polo",
                        "reactorId": 1,
                        "createdAt": "2021-04-18 11:16:07.070 +00:00"
                    }, {
                        "id": 4,
                        "fullName": "Popeye",
                        "username": "popeye",
                        "reactorId": 4,
                        "createdAt": "2021-04-18 11:16:26.462 +00:00"
                    }]```
 

COMMENT ON A DWEET
------------------
API Description     : Comment on a dweet

Url                 : http://localhost:3002/api/v1/users/comments/3
                      (format : /api/v1/users/comments/:dweetId)

Request Method      : POST

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Request Body        : ```json{
                        "commenterId": "4",
                        "commentText": "Hello Charlie, good dweet"
                    }```

Response Status Code: 201 Created

Response Body       : ```json{
                        "id": 4,
                        "dweetId": "3",
                        "commenterId": "4",
                        "commentText": "Hello Charlie, good dweet",
                        "updatedAt": "2021-04-18T11:21:30.120Z",
                        "createdAt": "2021-04-18T11:21:30.120Z"
                    }```
 

GET ALL COMMENTS ON A DWEET
--------------------------
API Description     : Get all comment details ona  dweet

Url                 : http://localhost:3002/api/v1/users/comments/2
                      (format : /api/v1/users/comments/:dweetId)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                        "id": 1,
                        "fullName": "polo",
                        "username": "polo",
                        "commenterId": 1,
                        "commentText": "Hey Bunny !! This is a good Dweet - Polo",
                        "createdAt": "2021-04-18 11:15:58.577 +00:00"
                    }, {
                        "id": 2,
                        "fullName": "polo",
                        "username": "polo",
                        "commenterId": 1,
                        "commentText": "Well Done !!",
                        "createdAt": "2021-04-18 11:16:05.343 +00:00"
                    }, {
                        "id": 3,
                        "fullName": "Popeye",
                        "username": "popeye",
                        "commenterId": 4,
                        "commentText": "Hey Bunny ...how are you?",
                        "createdAt": "2021-04-18 11:17:29.870 +00:00"
                    }]```

GET ALL DWEETS FROM A USER
--------------------------
API Description     : Get all dweets from a user

Url                 : http://localhost:3002/api/v1/users/4/dweets
                      (format : /api/v1/users/:userId/dweets)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json[{
                            "id": 4,
                            "userId": 4,
                            "dweetText": "Hello Everyon, Popoye here!!",
                            "dweetImg": "",
                            "createdAt": "2021-04-18T11:25:01.875Z",
                            "updatedAt": "2021-04-18T11:25:01.875Z"
                        },   {
                            "id": 5,
                            "userId": 4,
                            "dweetText": "How are you !!",
                            "dweetImg": "",
                            "createdAt": "2021-04-18T11:25:07.948Z",
                            "updatedAt": "2021-04-18T11:25:07.948Z"
                        }]```
 
 GET A PARTICULAR DWEET FROM A USER
-----------------------------------
API Description     : Get all dweets from a user

Url                 : http://localhost:3002/api/v1/users/4/dweets/5
                      (format : /api/v1/users/:userId/dweets/:dweetId)

Request Method      : GET

Requesty Headers    : Content-Type: application/json
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjE4NzQxNTc2fQ.GRsG-2RhepQQsQb6EA_bS2wZDWqYh6F3eFZuISckAR0

Response Status Code: 200 OK

Response Body       : ```json{
                        "id": 5,
                        "userId": 4,
                        "dweetText": "How are you !!",
                        "dweetImg": "",
                        "createdAt": "2021-04-18T11:25:07.948Z",
                        "updatedAt": "2021-04-18T11:25:07.948Z"
                    }```

 


