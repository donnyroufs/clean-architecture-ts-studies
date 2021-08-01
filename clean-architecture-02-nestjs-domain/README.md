# Clean Architecture Case Study #2

This project will focus on:

### Domain

- Value Objects
- Enterprise vs Application business rules

#### Entities

- User

  - email (unique)
  - password
  - location
  - role

- Post

  - title
  - content
  - visibility

---

location:

- State
- Street

roles:

- Admin
- User

visibility:

- Public
- Hidden
- Private

#### Use Cases

- Create User
- Login
- Create Post
- Get A Post

### Frameworks

- Using NestJs

### Layers

- Understanding (having rules) what goes inside Infra and what goes inside Application

### Cleaner Code

- Result Pattern
- Going to move away from most of the namings inside the book
- Removing Presenters, I don't think they are neccesary.

### Other

- Perhaps implementing AutoMapper

---

After this project I will most likely dive into:

- CQRS
- Aggregates (or maybe even in this one)
- Using NX or Lerna/workspaces to move away from a monolith
