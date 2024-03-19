from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def form():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Store the form data in a Python dictionary
    data = {
        'name': request.form['name'],
        'phone': request.form['phone'],
        'service': request.form['service'],
        'email': request.form['email'],
        'message': request.form['message']
    }
    print(data)  # Print the data to the console
    return 'Form submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)
