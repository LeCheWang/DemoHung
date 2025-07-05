function welcomeContent(verifyLink) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
            a {
                background-color: blue;
                border-radius: 20px;
                padding: 20px;
            }

            body {
                width: 500px;
                margin: 0 auto;
                padding: 10px;
            }
            </style>
        </head>
        <body>
            <h1>Xin chào mừng đến với MANH HUNG STORE</h1>
            <a href="${verifyLink}" target="_blank">Verify</a>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero expedita
            doloremque molestiae, provident voluptate odit veniam consequatur sunt
            nemo perspiciatis obcaecati magnam repellendus in, eveniet debitis ad
            dolor vel nostrum.
            </p>
        </body>
        </html>
    `;
}

module.exports = welcomeContent;
