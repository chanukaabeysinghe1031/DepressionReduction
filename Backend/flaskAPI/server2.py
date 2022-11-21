from flask import Flask , jsonify , request
from tensorflow.keras.models import load_model
import base64
app = Flask(__name__)
import cv2
import numpy as np
from werkzeug.utils import secure_filename
import os
from PIL import Image
import io
from numpy import asarray
import tensorflow as tf
import urllib.request
from deepface import DeepFace
from PIL import Image
import pickle
import random

IMAGES_UPLOAD_DIRECTORY = r"./static/uploads"
app.config['UPLOAD_FOLDER']=IMAGES_UPLOAD_DIRECTORY
ALLOWED_FILE_TYPE = set(['jpg','jpeg','png'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_FILE_TYPE

def getModel():
    global model,model2,model3
    model=load_model('body_fat_model.h5')
    model2 = load_model('mood_detection_model.h5')
    model3 = load_model('NoShowModel.h5')
    print("*! Models are loaded")

print("========================== Loading custom model ===============================")
getModel()


@app.route('/',methods=['GET'])
def index():
    return jsonify({"API":"This is the python API for getting the predictions from the models"})

@app.route('/predictBodyFat',methods=['POST'])
def getBodyFatPrediction():
    data = request.get_json(force=True)
    encoded = data['modelInput']
    prediction = model.predict(encoded).tolist()
    response = {
        'prediction': prediction[0]
    }
    return jsonify(response), 201

@app.route('/predictMood',methods=['POST'])
def getMoodPrediction():
    data = request.get_json(force=True)
    encoded = data['moodImage']

    imageURL = "http://192.168.1.8:3006/uploads/"+encoded
    url = imageURL.replace(" ", "%20")
    print("URL",url)
    urllib.request.urlretrieve(url,"uploadedImage.jpeg")
    backends = ['opencv', 'ssd', 'dlib', 'mtcnn']
    detected_face = DeepFace.detectFace("uploadedImage.jpeg", detector_backend=backends[3])
    image = Image.open("uploadedImage.jpeg")
    response = {
        'prediction': encoded
    }
    detected_face = np.array(detected_face)
    print(detected_face.shape)
    if allowed_file(image.filename):
        data = asarray(image)
        resized_image = cv2.resize(np.array(data), (224, 224))
        newArray = []
        newArray.append(resized_image)
        newArray = np.array(newArray)
        pred = np.argmax(model2.predict(newArray))
        classes = ["Angry", "DisguAst", "Fear", "Happy", "Neutral", "Sad", "Surprise"]
        predictedMood = classes[pred]
        print(predictedMood)
        return jsonify({"PredictedMood": predictedMood}), 201

    return jsonify({"ERROR":"AN ERROR HAPPENED"}), 201

@app.route('/predictNoShow',methods=['POST'])
def getDoctorNoShow():
    data = request.get_json(force=True)
    encoded = data['modelInput']
    prediction = model3.predict(encoded).tolist()
    response = {
        'prediction': prediction[0]
    }

    return jsonify(response), 201

if __name__ == "__main__":
    app.run(debug=True,port=5005)
