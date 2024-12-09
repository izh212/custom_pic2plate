import sys
import json
from keras.models import load_model
from PIL import Image
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
import sys
sys.stdout.reconfigure(encoding='utf-8')
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


def preprocess_image(image, target_size):
    image = image.resize(target_size)
    image_array = img_to_array(image)
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def predict_dish(image_path, model, target_size, selected_classes):
    image = Image.open(image_path)
    processed_image = preprocess_image(image, target_size)
    print(f"Processed image shape: {processed_image.shape}")
    prediction = model.predict(processed_image)
    dish = selected_classes[np.argmax(prediction)]
    return dish

if __name__ == "__main__":
    model_path = "../../recipe-detector.keras"
    target_size = (256, 256)
    selected_classes = [
        "Achari Gosht", "Aloo Gosht", "Aloo Ki Bhujia", "Anday Wala Burger",
        "Baingan Ka Bharta", "Bhuna Gosht", "Bihari Kebab", "Biryani",
        "Bun Kebab", "Butter Chicken"
    ]
    image_path = sys.argv[1]
    model = load_model(model_path)
    dish = predict_dish(image_path, model, target_size, selected_classes)
    print(json.dumps({"dish": dish}))
