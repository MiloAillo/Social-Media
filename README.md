# Social Media
Originally created as a school assignment and turned to be a full blown project.
<br>
This repo contains a full-blown CRUD application with a Laravel API service and React, designed with scalable source code to make adopting new technologies easier, such as improved security measures.
<br>
## How-to install
soon...
<br>
## API Documentation
[Click here to see my API Documentation in Postman](https://www.postman.com/mischikomoe-3564223/workspace/sosmed)

Few Data Examples:
<br>
<br>
User Profile + Posts

```json
{
    "userData": {
        "id": 67,
        "username": "mischiko",
        "name": "Milo Aillo",
        "photo": "http://my.app/storage/pfp/32155eab-6f6a-409e-b1b5-aeb5f291eee1.jpg",
        "description": "just me being myself :<"
    },
    "follower": 12,
    "following": 29,
    "konten": [
        {
            "id": 3,
            "created_at": "2025-09-27 03:16",
            "tittle": "Oh haii!! My first post in this app :3c",
            "images": [
                "http://my.app/storage/post/1758986190569dd53d-6ea1-4f7b-81f9-1874c4bd0ac8.jpg",
                "http://my.app/storage/post/17589861902a74ed38-ea5d-4dd7-8051-24965ad2ec53.png",
                "http://my.app/storage/post/17589861902d6a71b0-11aa-427a-a3bf-c49891f6f1bd.jpg"
            ],
            "short_content": "This app is soo cool, it act just like another soscial media wow what a ban..."
        },
        {
            "id": 2,
            "created_at": "2025-09-27 03:18",
            "tittle": "Instagram Better!",
            "images": null,
            "short_content": "This app is too bitter to be called a social media app, back to instagr..."
        }
    ]
}
```
<br>
<p>Post Comment + Reply</p>

```json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "created_at": "2025-09-27 03:27",
            "userId": 67,
            "postId": 3,
            "comment": "oh my gosh! this is insane app, the design is so clean mhm..",
            "likes_count": 12,
            "users": {
                "id": 67,
                "username": "mischiko",
                "photo": "http://my.app/storage/pfp/32155eab-6f6a-409e-b1b5-aeb5f291eee1.jpg",
            },
            "replies": [
                {
                    "id": 1,
                    "created_at": "2025-09-27 03:28",
                    "userId": 67,
                    "commentId": 1,
                    "comment": "oh boy and the responsiveness too yumm",
                    "users": {
                        "id": 67,
                        "username": "mischiko",
                        "photo": "http://my.app/storage/pfp/32155eab-6f6a-409e-b1b5-aeb5f291eee1.jpg"
                    }
                }
            ]
        }
    ]
}
```
## PDM <i>(or erd idk which is which..)</i>
you can zoom in, its an SVG format :3c
![PDM](documentation/pdm.svg)
<i>Note: inaccuracy may occur, since it is exported directly from SQL Workbench</i>
<br>
## Frontend Demo
soon..
<br>
## Tech Stack
<ol>
  <li>Typescript: Javascript but better</li>
  <li>React: Main library for frontend</li>
  <li>React Router: For client-side dynamic routing</li>
  <li>Tailwind: No separate CSS file yay</li>
  <li>Axios: Making HTTP Request a little bit easier</li>
  <li>PHP: i hate php</li>
  <li>Laravel: GOATED backend framework</li>
  <li>Sanctum: A built-in Laravel Authentication i use</li>
  <li>MySQL: yes</li>
</ol>
