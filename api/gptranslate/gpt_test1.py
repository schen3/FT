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
