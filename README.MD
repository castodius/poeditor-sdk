# About

This is a wrapper around [POEDitor API V2](https://poeditor.com/docs/api). POEditor is a localization service provider. This SDK aims to simplify the process of automating administration of projects, terms, translations and contributors.

## Installation

In your NPM project run:

```
npm install poeditor-sdk --save
```

### Usage

In order to use the SDK you will need a POEditor API key. Visit [Account Settings](https://poeditor.com/account/api) in order to generate/grab your API key.

In code you simply create a new client and use it:

```typescript
import { POEditor } from 'poeditor-sdk'

const foo = async () => {
  const client = new POEditor('YOUR_KEY_HERE')

  const project = await client.addProject({
    name: 'My amazing project',
    description: 'An optional description'
  })

  await client.addLanguage({
    id: project.id,
    language: 'en'
  })

  // Do more things here!
}
```

### Features

Development of this package is still ongoing. If you are reading this version 1.x has not yet been released. Current features:

* Complete Typescript client. Full interfaces available for all requests.
* Complete documentation of all parameters for all requests as well as output fields.

Upcoming features:
* Full integration test coverage

### Reporting issues

If you wish to report an issue or a make a feature request head to this project's [Issues page](https://github.com/castodius/poeditor-sdk/issues).