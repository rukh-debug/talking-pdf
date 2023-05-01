# talking-pdf

A simple web app that takes pdf as input and let you talk with it through chat interface.

![Build Status](https://github.com/slithery0/talking-pdf/actions/workflows/nextjs.yml/badge.svg)

## How to use

Visit [https://talkingpdf.rubenk.com.np/](https://talkingpdf.rubenk.com.np/)

or Build it yourself

```
$git clone https://github.com/slithery0/talking-pdf
$cd talking-pdf
$npm install
$npm build && npm start
```

### Known Issues

- Long pdf files will throw error due to max token limit by OpenAI API (I believe that's what it is)
- Sometimes the pdf file is not rendered properly, depends on the pdf file itself

## License
"Do whatever the hell you want with this code." 

    - MIT License

## Security
Since it's totally client side, there is no security issue, except the fact that you are sending your pdf file to OpenAI, which is a third party service. So, if you are concerned about your privacy, don't use this app.

## Credits
openai for the awesome API

@mui/material for the awesome UI components

nextjs for the awesome framework
