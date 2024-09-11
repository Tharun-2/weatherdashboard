import requests
import json
import win32com.client as wincom
speak = wincom.Dispatch("SAPI.SpVoice")


city = input("Enter the name of City you want to know weather of: ")

url = f"https://api.weatherapi.com/v1/current.json?key=4cd4af965f1f4dc2b1944517240509&q={city}"

r = requests.get(url)

wdic = json.loads(r.text)
print(wdic["current"]["temp_c"])
print(wdic["current"]["temp_f"])
print(wdic["current"]["condition"]["text"])
print(wdic["current"]["wind_mph"])
print(wdic["current"]["wind_kph"])

text1 = f"the weather of {city} is {wdic['current']['temp_c']}degree celsius"
text2 = f"the weather of {city} is {wdic['current']['temp_f']}degree fahrenheit"
text3 = f"the condition of {city} is {wdic['current']['condition']['text']}"
text4 = f"the wind condition of {city} is {wdic['current']['wind_mph']} miles per hour"
text5 = f"the wind condition of {city} is {wdic['current']['wind_kph']} kilometers per hour"

speak.Speak(text1)
speak.Speak(text2)
speak.Speak(text3)
speak.Speak(text4)
speak.Speak(text5)