import csv
import pwd
import json
import requests
import codecs
import collections

from flask import Flask, url_for
from flask import json, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

options = {
    0: "test",
    1: "Make America Great Again, Make",
    2: "test",
    3: "test",
    4: "test",
    5: "test",
    6: "test",
    7: "test the might of the Jacky",
    8: "test",
    9: "test"
}

@app.route('/test', methods=["POST"])
def synclick():
    posted = request.get_data()
    request_json = request.json
    word = request_json['data']
    print(word)
    syns = get_synonyms(word)
    print(syns)
    return json.dumps(syns)

@app.route('/wcount', methods=["POST"])
def wcount():
    posted = request.get_data()
    request_json = request.json
    selection = request_json['data']
    raw = getraw(int(selection))
    text = re.sub(r'[^\w\s\']', '', raw)
    text = text.lower()
    words = text.split()
    # Count words
    counts = collections.Counter(words)
    return json.dumps(counts)

@app.route('/wordlist', methods=["POST"])
def wordlist():
    posted = request.get_data()
    request_json = request.json
    selection = request_json['data']
    raw = getraw(int(selection))
    text = re.sub(r'[^\w\s\']', '', raw)
    text = text.lower()
    words = text.split()
    return json.dumps(words)

def get_synonyms(word):
    r = requests.get("http://words.bighugelabs.com/api/2/f2c786918d5b0a290582a98495f63a6d/" + word + "/json")
    return r.json()

def getraw(a):
    return options[a-1]



if __name__ == '__main__':
    app.run()
