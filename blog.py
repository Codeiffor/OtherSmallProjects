from flask import Flask, render_template, request
app=Flask(__name__)

@app.route('/')
def blog():
    return render_template('index.html')

@app.route('/post', methods=['GET', 'POST'])
def post():
    temp=request.form['content']
    return temp