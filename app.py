from flask import Flask, request, send_file, render_template
from PyPDF2 import PdfReader
from io import StringIO, BytesIO
import os
import openai
import time
import datetime

# below is the gpt core code
# TODO: need to save in a seperate file and import to here
class GPTranslation():
    def __init__(self, translate_from, translate_to, start = 0, output_bilangual=False):
        self.translate_from = translate_from
        self.translate_to = translate_to
        self.output_bilangual = output_bilangual
        self.start = start
        self.result = []


    def translate_text(self, text):
        openai.organization = "org-JDyxXlrzUEMeY5tHJYE2lBzC"
        openai.api_key = open("key.txt").read().strip()
        ready_text = 'Translate the following '+ self.translate_from +' text to '+ self.translate_to +'\n'+ text
        completion = openai.ChatCompletion.create(model = 'gpt-3.5-turbo', 
                                            messages = [
                                                        {'role':'user', 'content':ready_text},
                                                        ])
        return completion.choices[0]['message']['content'] # type: ignore 
    


app = Flask(__name__)


@app.route('/upload', methods=['post']) # type: ignore
def upload_file():
    print('process started')
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file'
    if file and file.filename.endswith('.txt'): # type: ignore
        # with  open(file) as fp:
        contents = file.read().decode() # use .decode to convert to sting 
        result = []
        for entry in contents.split('\n'):
            print(type(entry))
            if any (i.isalpha() for i in entry):
                result.append(entry)
        # start point should be a variable                
        start_point = 0
        text_io = BytesIO()
        while start_point < len(result):
            # HOW TO PASS BELOW VARIABLES
            app = GPTranslation('English', 'Simplified Chinese', start_point, True)
            total_len = len(result)
            for count, i in enumerate(result[app.start:app.start+10]):
                t = app.translate_text(i)
                if app.output_bilangual:
                    text_io.write(f"{i}\n".encode())
                    text_io.write(f"{t}\n".encode())
                    print('trans_bilangual'+'Part '+str(count+app.start)+ '/' +str(total_len)+' finished')
                    # str to byte, byte to str
                else:
                    text_io.write(f"{t}\n".encode())
                    print('single_langual'+'Part '+str(count+app.start)+ '/' +str(total_len)+' finished')
            start_point += 10
            now = datetime.datetime.now()
            print("Current date and time:", now,'sleeping for 10 seconds')
            time.sleep(10)
        text_io.seek(0)
        return send_file(text_io, as_attachment=True, download_name = 'output.txt')    



    if file and file.filename.endswith('.pdf'): # type: ignore
        # if to save file
        # file.save('/path/to/save/directory/' + file.filename)
        reader = PdfReader(file) # type: ignore
        
        number_of_pages = len(reader.pages)
        text = ""
        for i in range(number_of_pages):
            page = reader.pages[i]
            
            text += page.extract_text()

        text_io = BytesIO()
        text_io.write(text.encode())
        text_io.seek(0)
        return send_file(text_io, as_attachment=True, download_name = 'output.txt')
@app.route('/')
def upload_form():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
