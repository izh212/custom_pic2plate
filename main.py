import requests
from io import BytesIO
from PIL import Image
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
from keras.models import load_model

# Preprocessing function
def preprocess_image(image, target_size):
    image = image.resize(target_size)
    image_array = img_to_array(image)
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# Prediction function
def predict_image_from_url(image_url, model, target_size, selected_classes) -> str:
    response = requests.get(image_url)
    if response.status_code != 200:
        raise ValueError(f"Failed to fetch image. HTTP status code: {response.status_code}")
    
    img = Image.open(BytesIO(response.content))
    processed_image = preprocess_image(img, target_size)
    prediction = model.predict(processed_image)
    dish = selected_classes[np.argmax(prediction)]
    return dish

# Load the trained model
model_path = "./recipe-detector.keras"  # Update this path if your model is in a different location
model = load_model(model_path)

# Define the target size and the class labels
target_size = (256, 256)
selected_classes = [
    "Achari Gosht", "Aloo Gosht", "Aloo Ki Bhujia", "Anday Wala Burger",
    "Baingan Ka Bharta", "Bhuna Gosht", "Bihari Kebab", "Biryani",
    "Bun Kebab", "Butter Chicken", "Chana Chaat", "Chapli Kebab",
    "Chicken Handi", "Chicken Jalfrezi", "Chinioti Kunna", "Daal Chawal",
    "Dahi Bhalla", "Falooda", "Fish Tikka", "Gajar Ka Halwa"
]
selected_classes = selected_classes[:10]
# Example image URL for prediction
image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoDBt2CECWHLvV2bqtTYsSkB85Irmft5lNtQ&s"

# Predict and print the label
predicted_label = predict_image_from_url(image_url, model, target_size, selected_classes)
print(f"Predicted label: {predicted_label}")
