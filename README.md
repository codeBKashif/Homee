## Description

This application built using NestJS, Prisma, GraphQL and Sqlite as DB and JWT is used for Authentication.
Images are added in public folder for the reference.
Node version required to run is Node 12 or above

## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ yarn start dev
```

## API Details

```bash
POST    localhost:3000/user/register
name
email
password
![register](./public/reister-user-1.png)
![Already Exist](./public/reister-user.png)


POST    localhost:3000/user/login
email
password
![login](./public/login.png)


POST    localhost:3000/apartment
city
country
rooms
building
lat
long
![Add Apartment](./public/add-apartment.png)

GET     localhost:3000/apartment?lat=33.6503977&long=72.9544382&city=islamabad&radius=20
lat
long
city
country
radius
![Get Apartments](./public/get-apartment.png)


POST     localhost:3000/user/favorite
apartmentId
![Add Favorite](./public/add-favorite.png)



GET     localhost:3000/user/favorite
![List Favorites](./public/get-favorite.png)

GraphQL Example
![GraphQL example](./public/graphQL.png)
```
