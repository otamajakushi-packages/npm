# otamajakushi

Otamajakushiは、OTM-JSON（OneToMany-JSON）を解析するライブラリです。

## サンプルプログラム

```ts
import * as fs from 'fs';
import OTMJSON from 'otamajakushi';

const json = fs.readFileSync('./dictionary.json', 'utf8');
const dictionary = OTMJSON.parse(json);
console.log(dictionary.words.length); // 辞書の単語数を調べる
```

## Version

### Version 1.0.0

- Otamajakushi リリース
