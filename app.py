from flask import Flask,redirect,url_for,render_template # type: ignore
### WSGI App
app=Flask(__name__)

@app.route('/ss')
def welcome():
    return render_template('index.html')

@app.route('/success/<int:score>')
def success(score):
    return "Passed and marks are:"+ str(score)









if __name__=="__main__":
    app.run(debug=True)