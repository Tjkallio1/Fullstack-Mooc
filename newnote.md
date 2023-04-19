<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: HTTP POST to the server address new_note
    server->>browser: HTTP status code 302 (URL redirect)
    
    browser->>server: HTTP GET to  location "/notes", the address defined in header
    
    browser->>server: HTTP GET main.css, HTTP GET main.js, HTTP GET data.json 
    server->>browser: sending the css js and data.json files
```