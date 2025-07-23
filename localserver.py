

from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# Serve index.html at root
@app.route('/')
def root():
    return send_from_directory('.', 'index.html')

# Serve all other static files (html, css, js, images, etc.)
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    # 0.0.0.0 makes the server available on the local network
    app.run(host='0.0.0.0', port=5000, debug=True)


