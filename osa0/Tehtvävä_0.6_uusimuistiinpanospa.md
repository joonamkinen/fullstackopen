```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 created
    deactivate server
    
    Note right of browser: New note was send with javascript and it prevents page reloading and draws notes list again

```