# Expense Track WEBSITE

## Introduction

When you develop a Django application, you usually start the server
using:

``` bash
python manage.py runserver
```

This starts Django's **development server**, which is perfect for
learning and testing. However, when deploying your application for real
users (production), Django recommends using either a **WSGI** or an
**ASGI** server.

## Why Doesn't Django's Development Server Work in Production?

The development server is designed only for developers. It provides
features like: - Automatic code reloading - Detailed error pages - Easy
debugging

It is **not optimized** for: - High traffic - Security - Performance -
Managing multiple worker processes

Instead, production deployments use dedicated application servers.

## What is WSGI?

**WSGI** stands for **Web Server Gateway Interface**.

It is a standard that allows a web server to communicate with a Python
web application such as Django.

### Request Flow Using WSGI

``` text
User
 │
 ▼
Browser
 │
 ▼
Nginx
 │
 ▼
Gunicorn (WSGI Server)
 │
 ▼
Django
 │
 ▼
Database
```

Steps: 1. User opens the website. 2. Browser sends an HTTP request. 3.
Nginx receives the request. 4. Nginx forwards it to Gunicorn. 5.
Gunicorn passes it to Django using the WSGI interface. 6. Django
processes the request. 7. Django queries the database if needed. 8.
Response travels back to the browser.

### Common WSGI Servers

-   Gunicorn
-   uWSGI
-   mod_wsgi (Apache)

## What is ASGI?

**ASGI** stands for **Asynchronous Server Gateway Interface**.

ASGI supports both synchronous and asynchronous requests, making it
suitable for: - WebSockets - Real-time chat - Notifications - Live
dashboards - Streaming responses

### Request Flow Using ASGI

``` text
User
 │
 ▼
Browser
 │
 ▼
Nginx
 │
 ▼
Uvicorn (ASGI Server)
 │
 ▼
Django (ASGI)
 │
 ▼
Database
```

## Why Was ASGI Introduced?

WSGI was designed for traditional request-response applications.

Modern applications often need to: - Keep connections open - Wait for
external APIs - Handle many simultaneous users - Push live updates

ASGI enables these scenarios.

## Synchronous vs Asynchronous

### WSGI (Synchronous)

``` text
Customer 1 → Chef cooks → Customer 2 waits
```

### ASGI (Asynchronous)

``` text
Customer 1 waits for oven
↓
Chef starts Customer 2
↓
Returns to Customer 1
```

## WSGI vs ASGI

  ------------------------------------------------------------------------
  Feature                          WSGI                ASGI
  -------------------------------- ------------------- -------------------
  Full Form                        Web Server Gateway  Asynchronous Server
                                   Interface           Gateway Interface

  Request Type                     Synchronous         Synchronous +
                                                       Asynchronous

  Supports Async Views             No                  Yes

  Supports WebSockets              No                  Yes

  Popular Server                   Gunicorn            Uvicorn
  ------------------------------------------------------------------------

## What is Nginx?

Nginx is a web server and reverse proxy.

Responsibilities: - Receive HTTP requests - Serve static files - SSL
termination - Load balancing - Forward requests to Gunicorn/Uvicorn

## Gunicorn

Gunicorn is a WSGI application server that: - Runs Django - Creates
worker processes - Handles incoming requests

## Uvicorn

Uvicorn is an ASGI application server that: - Runs async Django
applications - Supports WebSockets - Is also used with FastAPI and
Starlette

## Which One Should You Use?

### WSGI

Use when: - Traditional Django applications - CRUD-based websites - No
async requirements

Typical stack:

``` text
Nginx
↓
Gunicorn
↓
Django
```

### ASGI

Use when: - Async views - WebSockets - Chat apps - Notifications -
Streaming

Typical stack:

``` text
Nginx
↓
Uvicorn
↓
Django
```

## Django Project Files

    project/
    ├── settings.py
    ├── urls.py
    ├── wsgi.py
    └── asgi.py

-   **wsgi.py** → Used with Gunicorn (WSGI)
-   **asgi.py** → Used with Uvicorn (ASGI)

## Summary

-   WSGI is the traditional interface for synchronous Django
    applications.
-   ASGI is the modern interface supporting synchronous and asynchronous
    applications.
-   Gunicorn is a WSGI server.
-   Uvicorn is an ASGI server.
-   Nginx sits in front of Gunicorn/Uvicorn and handles client
    connections efficiently.
-   `python manage.py runserver` should only be used during development.
