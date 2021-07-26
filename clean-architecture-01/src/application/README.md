# Application Layer

- Is part of Core.
- Defines Application Business Rules
- Has a dependency on Domain
- Is not allowed to expose the Domain Entities; Needs to create I/O Ports (DTOs/Models)
- Uses interactors to communicate with the outer Layers.
- Uses the **IPresenter** interface to allow the outer layers to add their custom mapping.

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

An interactor should always have an input and output port to communicate with the outer layers and it ~~requires~~ a Presenter.

#### Input Port

Technically it's an **interface** that the outer world can use to map the required data that we need. However since we are in TypeScript land we can't do much with interfaces
therefore I have decided to use classes instead. This way we can add data annotations when required.

Uncle Bob also mentioned that you can decide to use function arguments or POJOs. However I think this is very case specific!

In short an Input Port is yet another model(DTO) that we need to decouple the delivering mechanisms(e.g WebAPI, WebUI, ConsoleApp) from the Core.

#### Output Port

Pretty much the reverse of an Input Port.

#### IPresenter

```ts
export interface IPresenter<I, O = unknown> {
  present(payload: I): O
}
```

The ultimate goal of a Presenter is to decouple the Application from a Delivery Mechanicsm(e.g Web). The Web will use it to map from the `output port` to it's own contract/view model/dto and then return it. I also **think** that it's perfectly valid to shape it even more. E.g. for a web api you might want the presenter to return a http response. (data + statusCode...)

## Questions

- Do we need to create an interface for useCases? Since application has Application specific business rules which to me sounds like we _might_ want different use-cases?
