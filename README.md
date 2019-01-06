# phrasalExpressions
Helps to create regular expressions in typescript from phrases.

! Still in dev.

**Table of Contents**

- [Phrasal Expressions for Typescript](#)
  - [Installation](#installation)
  - [Basic Usage](#basic-usage)

## Installation

This library only works with typescript. Ensure it is installed:

```bash
npm install typescript -g
```

To install phrasalExpressions:

```bash
npm install phrasalExpressions --save
```

## Basic Usage

```typescript
import {Phrexp} from "phrasalExpressions";

//  Regexp to match e character
const regexp1: Regexp = new Phrexp()
                            .findChar('e')
                            .toRegExp();

// Regexp for exactly 3 repetitions of an alphanumeric followed by a tab
const regexp2: RegExp = new Phrexp()
      .beginRepetition(3, 3)
      .findChar('alphanumeric').endRepetition().findChar('tab')
      .toRegExp();
```



