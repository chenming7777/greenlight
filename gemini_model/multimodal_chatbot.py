import google.generativeai as genai
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from PIL import Image
import json
import base64
import io
import os
from dotenv import load_dotenv
import getpass



# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = getpass.getpass(os.getenv("GOOGLE_API_KEY"))

# Initialize the Gemini Pro Vision model
model = genai.GenerativeModel('gemini-1.5-flash')

# Set up shared conversation memory
shared_memory = ConversationBufferMemory()

# Create a template for the model
template = """
You are a solar energy expert designed to assist farmers in the agrivoltaics industry, which combines agriculture with renewable energy generation. 
Your primary responsibilities include:
    Analyzing Graphs: You are proficient in interpreting various types of data visualizations related to solar energy production, weather patterns, and agricultural yield. You can provide detailed explanations and insights based on these graphs to help farmers optimize their operations.
    Monitoring Solar Panel Conditions: You have extensive knowledge about solar panel technology, maintenance, and performance. You can assess the condition of solar panels, identify potential issues, and suggest appropriate maintenance or troubleshooting steps to ensure optimal energy generation.
    Solving Farmer's Doubts: You are an expert in both agriculture and renewable energy. You can answer farmers' questions related to crop management under solar panels, the impact of solar shading on different types of crops, and strategies to maximize both agricultural yield and energy production. You offer practical advice and tailored solutions to help farmers achieve sustainable and efficient farming practices.
Your goal is to support farmers in integrating solar energy with agriculture, ensuring that they can benefit from increased energy production while maintaining or enhancing their agricultural output.
You should always provide detailed and informative responses to the farmers' questions, helping them understand the complex relationship between solar energy and agriculture.

User's input: {input}

Previous conversation:
{chat_history}

Your response:
"""

prompt = PromptTemplate(
    input_variables=["input", "chat_history"],
    template=template
)

def process_input(user_input, image_data=None):
    # Get the chat history
    chat_history = shared_memory.load_memory_variables({})['history']
    
    # Generate the full prompt using the template
    full_prompt = prompt.format(input=user_input if user_input else "Analyze the provided image", chat_history=chat_history)
    
    # Prepare the input for the model
    model_input = [full_prompt]
    
    # If image data is provided, add it to the input
    if image_data:
        try:
            image = Image.open(io.BytesIO(base64.b64decode(image_data)))
            model_input.append(image)
        except Exception as e:
            return {"error": f"Error processing image: {str(e)}"}
    
    # Generate content
    response = model.generate_content(model_input)
    
    # Update the shared memory
    shared_memory.save_context({"input": user_input if user_input else "Image analysis"}, {"output": response.text})
    
    return {"response": response.text}

def main(json_input):
    try:
        # Parse the JSON input
        data = json.loads(json_input)
        user_input = data.get("text_input")
        image_data = data.get("image")
        
        # Process the input
        result = process_input(user_input, image_data)
        
        # Return the result as JSON
        return json.dumps(result)
    except json.JSONDecodeError:
        return json.dumps({"error": "Invalid JSON input"})
    except Exception as e:
        return json.dumps({"error": str(e)})

# This model can aceept image, text and both image and text.
# It will accept the input in the form of JSON and return the response in the form of JSON.
# format is as follows:
# ({"text_input": "Analyze the efficiency graph.",
# "image": encoded_image}), jpg and png is fine
# Example usage
if __name__ == "__main__":
    # Text-only input
    text_only_input = json.dumps({
        "text_input": "What are the best practices for maintaining solar panels in an agricultural setting?"
    })
    print("Text-only response:", main(text_only_input))
    
    # Image-only input (assuming you have a base64 encoded image)
    with open("./gemini_model/test.png", "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    image_only_input = json.dumps({
        "image": encoded_image
    })
    print("Image-only response:", main(image_only_input))
    
    # Text and image input
    with open("./gemini_model/image.png", "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    text_and_image_input = json.dumps({
        "text_input": "Analyze the efficiency graph.",
        "image": encoded_image
    })
    print("Text and image response:", main(text_and_image_input))