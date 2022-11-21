import cv2
import numpy as np
from werkzeug.utils import secure_filename
import os
from PIL import Image
import io
from numpy import asarray
import tensorflow as tf
from keras.models import load_model


model=load_model('best_model.h5')

image = Image.open('/Users/chanukaabeysinghe/Documents/Projects/MoodPrediction/test/happy/images.jpeg')
data = asarray(image)
print(data.shape)
resized_image = cv2.resize(np.array(data), (224, 224))
print(resized_image)
newArray = []
newArray.append(resized_image)
newArray = np.array(newArray)
print(newArray.shape)
prediction = model.predict(newArray)
print(prediction)
pred = np.argmax(prediction)

classes = ["Angry","Disguist","Fear","Happy","Neutral","Sad","Surprise"]

predictedMood = classes[pred]
print("Prediction : ",predictedMood)