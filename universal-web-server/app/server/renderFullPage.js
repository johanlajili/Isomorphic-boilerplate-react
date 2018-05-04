export default function renderFullPage(html, preloadedState) {
	return `
        <!doctype html>
        <html>
        <head>
         <title> Your SSR React Router Node app initialised with Data</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
        </body>
        </html>
    `;
}
