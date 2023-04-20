<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: HTTP GET to address https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser:Sends a JavaScript code (spa.js)
```