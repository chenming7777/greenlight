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

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import PyPDF2
from io import BytesIO
from typing import List, Optional

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = getpass.getpass(os.getenv("GOOGLE_API_KEY"))

# Initialize the Gemini Pro Vision model
model = genai.GenerativeModel('gemini-2.0-flash')

# Set up shared conversation memory
shared_memory = ConversationBufferMemory()


# Create a template for the model
template = """
You are a specialized solar energy expert, EnergyAI.\n\n
Your primary mission include:
    Analyzing Graphs: You are proficient in interpreting various types of data visualizations related to solar energy production, weather patterns. You can provide detailed explanations and insights based on these graph.
    Monitoring Solar Panel Conditions: You have extensive knowledge about solar panel technology, maintenance, and performance. You can anticipate the condition of solar panel, 
    identify potential issue and suggest appropriate maintenance or troubleshooting steps to ensure optimal energy generation.
    Solving User Doubts: When a user presents a text, PDF or image, provide a detailed analysis of the its trend, pattern and anomaly related to energy production.
    If the user asked you absolute irrelevant message user say "I'm sorry, I'm dedicated for solar energy generation analysis. Please provide me with relevant information to analyze."
    Dont write too long\n\n

**Guidelines for Response:**
- Format your responses using **Markdown** syntax.
- Use `*italic*` for emphasis and `**bold**` for strong emphasis.
- Use headers (`# Header`) to organize content.
- Create lists for structured information (`- Unordered list item` or `1. Ordered list item`).
- Use inline code format (`` `inline code` ``) for technical terms or code snippets.\n\n

User's input: {input}

Previous conversation:
{chat_history}

Your response:
"""

prompt = PromptTemplate(
    input_variables=["input", "chat_history"],
    template=template
)

def extract_text_from_pdf(file_content):
    try:
        pdf_file = BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        reply = f"Error extracting text from PDF: {str(e)}"
        return reply

@app.post("/process_input/")
async def processing_input(
    text_input: Optional[str] = Form(None),
    images: Optional[List[UploadFile]] = File(None),
    pdfs: Optional[List[UploadFile]] = File(None)
):
    print(f"Received text_input: {text_input}")
    print(f"Received {len(images) if images else 0} images")
    print(f"Received {len(pdfs) if pdfs else 0} PDFs") 
    try:
        if images:
            for image in images:
                if not image.content_type.startswith('image/'):
                    raise HTTPException(400, f"File {image.filename} is not a valid image.")
        
        if pdfs:
            for pdf in pdfs:
                if pdf.content_type != 'application/pdf':
                    raise HTTPException(400, f"File {pdf.filename} is not a valid PDF.")
        
        json_input = {}

        if text_input:
            json_input["text_input"] = text_input

        if images:
            encoded_images = []
            for image in images:
                image_content = await image.read()
                encoded_image = base64.b64encode(image_content).decode('utf-8')
                encoded_images.append(encoded_image)
            json_input["images"] = encoded_images

        if pdfs:
            pdf_texts = []
            for pdf in pdfs:
                pdf_content = await pdf.read()
                pdf_text = extract_text_from_pdf(pdf_content)
                pdf_texts.append(pdf_text)

            combined_pdf_text = "\n\n".join([f"PDF {i+1} Content:\n{text}" for i, text in enumerate(pdf_texts)])

            if "text_input" in json_input:
                json_input["text_input"] += f"\n\n{combined_pdf_text}"
            else:
                json_input["text_input"] = combined_pdf_text

        if not json_input:
            return JSONResponse(status_code=400, content={"error": "No input provided. Please provide at least one of: text input, images, or PDFs."})

        # Process the input using the main function
        response = main(json.dumps(json_input))

        # Return the result as a JSON response
        return JSONResponse(status_code=200, content=json.loads(response))
    except Exception as e:
        print(f"Error in processing_input: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return JSONResponse(status_code=500, content={"error": str(e)})

def main(json_input):
    try:
        # Parse the JSON input
        data = json.loads(json_input)
        user_input = data.get("text_input", "")
        image_data = data.get("images", [])
        
        # Process the input
        result = process_input(user_input, image_data)
        
        # Return the result as JSON
        return json.dumps(result)
    except json.JSONDecodeError:
        return json.dumps({"error": "Invalid JSON input"})
    except Exception as e:
        return json.dumps({"error": str(e)})

def process_input(user_input, image_data=None):
    # Get the chat history
    chat_history = shared_memory.load_memory_variables({})['history']
    
    # Generate the full prompt using the template
    full_prompt = prompt.format(input=user_input if user_input else "Analyze the provided content", chat_history=chat_history)
    
    # Prepare the input for the model
    model_input = [full_prompt]
    
    # If image data is provided, add it to the input
    if image_data:
        try:
            for encoded_image in image_data:
                image = Image.open(io.BytesIO(base64.b64decode(encoded_image)))
                model_input.append(image)
        except Exception as e:
            return {"error": f"Error processing image: {str(e)}"}
    
    # Generate content
    response = model.generate_content(model_input)
    
    # Update the shared memory
    shared_memory.save_context({"input": user_input if user_input else "Content analysis"}, {"output": response.text})
    
    # Print the generated output
    print(f"Generated output: {response.text}")

    return {"response": response.text}

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Multimodal Chatbot!"}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)