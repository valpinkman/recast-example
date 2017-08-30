# RECAST.AI API DISCOVERY

This little project is a playground for me to play around with the recast.ai API.

## INSTALL
You must have `node >= 8` with `yarn` or `npm` installed.

```bash
$ git clone git@github.com:valpinkman/recast-example.git
$ cd recast-example
$ yarn # or npm install (the package trianglify throws some errors with yarn but they are not important!)
$ yarn dev # or npm run dev
```

Go to http://localhost:3000 to try it out.

## TOKEN

Inside `./config.js` there is a variable with the access token. Replacing it will allow the UI to be used by any bot.  
/!\ watch out though, only text responses will be avaible.

## TECHNOS 

Built with Next.js, React, firebase and Recast.ai