<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"><script>
<script>mermaid.initialize({startOnLoad:true});</script>

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->server: HTTP POST to the server adress new_note
    server->browser: HTTP status code 302 (URL redirect)
    browser->server:HTTP GET to address defned in header's Location, in this case /notes
    browser->server: reload Notes page
    browser->server: HTTP GET main.css
    browser->server: HTTP GET main.js
    browser->server: HTTP GET daya.json
```