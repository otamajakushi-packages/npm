# otamajakushi

Otamajakushi is a library which parses OTM-JSON (OneToMany-JSON)

## Installation

```sh
npm i otamajakushi
```

## Sample

```ts
import * as fs from 'fs';
import OTMJSON from 'otamajakushi';

const json = fs.readFileSync('./dictionary.json', 'utf8');
const dictionary = OTMJSON.parse(json);
console.log(dictionary.words.length); // Print the number of words in the dictionary
```

See also [otamajakushi-sample (Japanese)](https://github.com/skytomo221/otamajakushi-npm-sample)

## Version

### Version 1.1.0

- Add "zpdicOnline"

### Version 1.0.0

- Release Otamajakushi
