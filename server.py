from http.server import SimpleHTTPRequestHandler, HTTPServer

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == '/projects':
            self.path = '/projects.html'
        elif path == '/':
            self.path = '/index.html'

        return super().do_GET()

# Run the server
PORT = 8000
print(f"Starting server on http://localhost:{PORT}")
with HTTPServer(("localhost", PORT), CustomHandler) as httpd:
    httpd.serve_forever()
