# Application Layer

- Is part of Core.
- Defines Application Business Rules
- Has a dependency on Domain
- Is allowed to have external Dependencies
- Is not allowed to expose the Domain Entities; Needs to create it's own request/response Models
- Uses interactors to communicate with the outer Layers.

## References

### Core

When referencing Core we are talking about the Domain and Application layers.

### Application Business Rules

// TODO

### Request & Response Models

A model is a simple Data Transfer Object(DTO) to send data to the Infra and Web Layers

### Interactors

An interactor in this context is a use-case, however I can only assume that when you want to combine multiple use-cases together
you could implement a service that uses those. Whether that's the right "approach" in Uncle Bob's eyes...

An interactor should always have an input and output port to communicate with the outer layers.

#### Input Port

Basically the goal of an Input Port is to tell the user that we expect some form of data. This can be a POJO, simple arguments or a better approach in my opinion a strict Request Model.

#### Output Port

Pretty much the reverse of an Input Port.

## Questions

- Could we define seperate classes for I/O ports, so that we can handle the mapping there instead of in the use-case?
