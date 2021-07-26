# Todos

- [x] Add Absolute Paths
- [ ] Read more and confirm the stuff I have (notes below)
- [ ] Add Validation
- [ ] Add AutoMapper?
- [ ] Add GetUserUseCase
- [ ] Document stuff and move on to 02?

---

## Folder Structure Wise

- What about implementations
- Should we really have a folder called interfaces? How do we tell another layer that this is something we expose to them?
- Types/Interfaces rule
- Meaning of a common folder
- What else could go inside Infra? Write some examples in the README.md
- You _can_ download dependencies for your Domain Layer

## Do we need both DI in App and Infra? Or should infra bootstrap it all and then web?

Application and Infra can have their own dependency injection!

## What about automapper? Or mappers in general

## How do we call validate on Domain Entities?

## Should Domain or Application expose the generic Repository pattern?

The repo interface should be exposed from Application and not Domain because the Application layer
is the one asking for some kind of implementation

## Exceptions or Result pattern?

---

Usecase makes use of plugins. Plugins are abstraction over libraries (Gateway).
