from flask import Flask, request, jsonify
from keras.models import load_model
from PIL import Image
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array

app = Flask(__name__)

# Load model once when the API starts
model_path = "./recipe-detector.keras"
target_size = (256, 256)
selected_classes = [
    "Achari Gosht", "Aloo Gosht", "Aloo Ki Bhujia", "Anday Wala Burger",
    "Baingan Ka Bharta", "Bhuna Gosht", "Bihari Kebab", "Biryani",
    "Bun Kebab", "Butter Chicken"
]
model = load_model(model_path)

def preprocess_image(image, target_size):
    image = image.resize(target_size)
    image_array = img_to_array(image)
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

def predict_dish(image):
    processed_image = preprocess_image(image, target_size)
    prediction = model.predict(processed_image)
    dish = selected_classes[np.argmax(prediction)]
    return dish

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    file = request.files['image']
    try:
        image = Image.open(file)
        dish = predict_dish(image)
        return jsonify({"dish": dish}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
