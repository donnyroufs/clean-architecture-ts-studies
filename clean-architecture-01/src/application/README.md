# Application Layer

- Is part of Core.
- Defines Application Business Rules
- Has a dependency on Domain
- Is allowed to have external Dependencies
- Is not allowed to expose the Domain Entities; Needs to create it's own request/response Models

## References

### Core

When referencing Core we are talking about the Domain and Application layers.

### Application Business Rules

// TODO

### Request & Response Models

A model is a simple Data Transfer Object(DTO) to send data to the Infra and Web Layers
