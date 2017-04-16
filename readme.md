## [Perfomance review] Validate script tags

### What does the result look like?
```bash
pkondratenko:~/projects/experimental/booking-perfomance-optimization (*)
> yarn start
yarn start v0.18.1
$ node ./index.js

Samples to process: 3.

Process sample #0.
https://www.booking.com...
  Fetching page body...
  Detecting script tags and applying filters...
  Processing the scripts (total found: 8)...
  Process the script
  https://t-ec.bstatic.com/static/js/jquery_ecv6/d3b95adc5b7f1f532b9fe6c2675c888bb224a54f.js
    Original file size: 124.177 KB.
    Compressed file size: 102.733 KB.
    Saved after compression: 21.444 KB (17%).

  Process the script
  https://t-ec.bstatic.com/static/js/core-deps_ecv6/9625eb01c7b01c9457ad285023bd3af35c5c162b.js
    Original file size: 70.84 KB.
    Compressed file size: 58.316 KB.
    Saved after compression: 12.524 KB (18%).

  Process the script
  https://s-ec.bstatic.com/static/js/main_ecv6/785177983c63988e32492c0659125dfd72b618e4.js
    Original file size: 628.782 KB.
    Compressed file size: 558.562 KB.
    Saved after compression: 70.22 KB (11%).

  // ...
You can save after compression 209.228 KB (11%).

// ...

Samples processed: 3.

Done in 54.17s.
```


### Installation
### 0. Use needed node.js version
```
nvm use
```

### 1. Install dependencies
```
yarn
```

Or via npm:
```
npm i
```

### 2. Run setup configuration
```
yarn run setup
```

### 3. Fill the config.local.js with your settings
By default there is settings for booking.com (main page, search results and search result).

### 4. Run test
```
yarn start
```
