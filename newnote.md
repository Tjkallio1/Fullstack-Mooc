<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: HTTP POST to the server adress new_note
    the text written in the submit form is sent
    server->>browser: HTTP status code 302 (URL redirect)
    asks browser to do new request
    
    browser->>server: HTTP GET to case /notes
    address defined in header's Location
    
    browser->>server: HTTP GET main.css HTTP GET main.js 
    browser reloads reload Notes pageHTTP GET data.json
    server->>browser: sending the css js and data.json files
```