<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"><script>
<script>mermaid.initialize({startOnLoad:true});</script>

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: HTTP POST to the server adress new_note
    server->>browser: HTTP status code 302 (URL redirect)
    browser->>server:HTTP GET to address defned in header's Location, in this case /notes
    Browser reloads reload Notes page
    brower->>server: HTTP GET main.css, HTTP GET main.js,HTTP GET data.json
    server->>browser: the css, js and data.json files
```