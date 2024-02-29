# Game Store API

## Table of Contents

1. [Description](#description)
2. [Setup](#setup)
3. [API](#api)
   1. [User](#1-user)
      1. [GET /list](#11-get-list)
      2. [POST /user/login](#12-post-userlogin)
      3. [POST /user/singin](#13-post-usersingin)
   2. [Game](#2-game)
      1. [POST /create](#21-post-create)

## Description

Techs:

- Node.js - JavaScript runtime
- PrismaJs - ORM
- Express - Web Framework

## Setup

Server is running on port 3000
install dependencies

```bash
npm install
```

create database

```bash
npx prisma migrate dev --name init
```

run the server

```bash
npm run dev
```

## API

### 1. /user

#### 1.1 GET /list

List all users and games

- **Request**
  - Headers
    - Authorization: string

#### 1.2 POST /user/login

Login a user

- **Request**
  - Body
    - email: string
    - password: string

```json
{
  "email": "felipe@unoeste.com",
  "password": "123456"
}
```

#### 1.3 POST /user/singin

Create a new user

- **Request**
  - Body
    - email: string
    - password: string
    - name: string
    - gender: string
    - authType: string
    - birthday: DateTime/string

```json
{
  "name": "murillo wolf",
  "email": "wolf@example.com",
  "password": "qwerty",
  "gender": "male",
  "authType": "common",
  "birthday": "Mon May 19 1997 00:00:00 GMT-0300 (Brasilia Standard Time)"
}
```

### 2. /game

#### 2.1 GET /list

List all games

- **Request**
  - Headers
    - Authorization: string

#### 2.2 POST /create

Create a new game

- **Request**
  - Body
    - name: string
    - description: string
    - price: number
    - categories: string[]

```json
{
  "name": "GTA V",
  "description": "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the first main entry in the Grand Theft Auto series since 2008's Grand Theft Auto IV.",
  "price": 99.99,
  "avaliable": true,
  "authorEmail": "felipe@unoeste.com"
}
```
