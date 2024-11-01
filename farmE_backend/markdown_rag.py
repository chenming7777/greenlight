from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import glob
import json
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai

from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import uvicorn


load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key = os.getenv("GOOGLE_API_KEY"))

MARKDOWN_DIR = r"C:\greenlight\farmE_backend\output_markdown"

def get_markdown_text(markdown_files):
    text = ""
    for file_path in markdown_files:
        with open(file_path, 'r', encoding='utf-8') as file:
            text += file.read() + "\n\n"
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 40000, chunk_overlap = 1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embeddings)
    vector_store.save_local("faiss_index")

def get_conversation_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details\n\n
    Answer it in markdown format\n\n
    
    **Guidelines for Responses:**
    - Format your responses using **Markdown** syntax.
    - Use `*italic*` for emphasis and `**bold**` for strong emphasis.
    - Use headers (`# Header`) to organize content.
    - Create lists for structured information (`- Unordered list item` or `1. Ordered list item`).
    - Use inline code format (`` `inline code` ``) for technical terms or code snippets.\n\n    
    
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model = "gemini-1.5-flash", temperature = 0.3)
    prompt = PromptTemplate(template = prompt_template, input_variables= ["context","question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt = prompt)
    return chain
# error here in the code
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup event
    try:
        # Process markdown files
        markdown_files = glob.glob(os.path.join(MARKDOWN_DIR, "*.md"))
        if not markdown_files:
            raise HTTPException(status_code=404, detail=f"No markdown files found in {MARKDOWN_DIR}")

        raw_text = get_markdown_text(markdown_files)
        text_chunks = get_text_chunks(raw_text)
        get_vector_store(text_chunks)
        print("Vector store initialized.")
        yield
    finally:
        # Shutdown event (if needed)
        print("Application is shutting down.")

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask_question/")
async def ask_question(request: QuestionRequest):
    try:
        user_question = request.question
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
        docs = new_db.similarity_search(user_question)
        chain = get_conversation_chain()
        response = chain.invoke(
            {"input_documents": docs, "question": user_question},
            return_only_outputs=True
        )
        return JSONResponse(status_code=200, content={"response": response["output_text"]})
    except Exception as e:
        print(f"Error in ask_question: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return JSONResponse(status_code=500, content={"error": str(e)})
    

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Markdown Q&A API!"}

# Add lifespan to the FastAPI app
app.lifespan = lifespan

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8001)