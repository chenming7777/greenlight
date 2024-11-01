#In this code it will automatically convert the pdf files to markdown files and then it will use the RAG-based Q&A system to answer the questions based on the context of the pdf files.
# You need to have a directory that can contain the pdf files and the output will be saved in the output_markdown directory.
# Do not need the input this will directly take the pdf files and convert them to markdown files and then answer the questions based on the context of the pdf files.
# This code will also generate the markdown file from the pdf and save it into the output_markdown directory.


import nest_asyncio
from llama_parse import LlamaParse
from llama_index.core import Document
import os
import glob
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

# Apply nest_asyncio to allow asynchronous operations in Jupyter notebooks
nest_asyncio.apply()

# Load environment variables
load_dotenv()

# Configure Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
llamaParse_api=os.getenv("LLAMA_CLOUD_API_KEY")

# Initialize LlamaParse
parser = LlamaParse(
    api_key=llamaParse_api,
    result_type="markdown",
    verbose=True,
)

def combine_pdf_pages(file_path):
    parsed_pages = parser.load_data(file_path)
    combined_text = "\n\n".join([page.text for page in parsed_pages])
    combined_metadata = {
        "source": file_path,
        "file_name": os.path.basename(file_path),
        "page_count": len(parsed_pages)
    }
    return Document(text=combined_text, metadata=combined_metadata)

def load_and_combine_pdfs(directory):
    combined_documents = []
    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            file_path = os.path.join(directory, filename)
            combined_documents.append(combine_pdf_pages(file_path))
    return combined_documents

def save_to_markdown(documents, output_directory):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    for doc in documents:
        base_file_name = os.path.splitext(doc.metadata['file_name'])[0]
        output_file_path = os.path.join(output_directory, f"{base_file_name}.md")
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(doc.text)
        print(f"Saved {output_file_path}")

def get_markdown_text(markdown_files):
    text = ""
    for file_path in markdown_files:
        with open(file_path, 'r', encoding='utf-8') as file:
            text += file.read() + "\n\n"
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embeddings)
    vector_store.save_local("faiss_index")

def get_conversation_chain():
    prompt_template = """
    You are a helpful AI assistant tasked with answering questions based on the provided context. Your goal is to understand the user's intent and provide accurate, detailed information.
    Instructions:
        1. Carefully analyze the user's question and the provided context.
        2. If the exact answer is in the context, provide a detailed response with all relevant information.
        3. If the exact answer is not in the context, but you can infer or deduce a reasonable answer based on the available information, provide that answer while clearly stating that it's based on inference from the context.
        4. If the question is related to the topic but not directly answered in the context, provide any relevant information from the context that might be helpful, and suggest how the user might rephrase their question to get a more specific answer.
        5. If the question is completely unrelated to the context or cannot be answered based on the available information, politely state that the answer is not available in the given content and suggest what kind of information might be needed to answer the question.
        6. Always prioritize accuracy over completeness. It's better to provide partial correct information than to guess or provide incorrect information.

        Context:
        {context}

        User Question:
        {question}

        Your detailed response:
"""

    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)
    chain = get_conversation_chain()
    response = chain.invoke(
        {"input_documents": docs, "question": user_question}
        , return_only_outputs=True)
    print("Reply:", response["output_text"])

def main(user_question):

    # Load and combine PDFs
    pdf_directory = "./farmE_backend/report_database"
    documents = load_and_combine_pdfs(pdf_directory)

    print(f"Loaded {len(documents)} documents.")
    for doc in documents:
        print(f"Document: {doc.metadata['file_name']}, Pages: {doc.metadata['page_count']}")

    # Save combined text to Markdown files
    markdown_output_directory = "./farmE_backend/output_markdown"
    save_to_markdown(documents, markdown_output_directory)

    # Process markdown files
    markdown_files = glob.glob(os.path.join(markdown_output_directory, "*.md"))
    if not markdown_files:
        print(f"No markdown files found in {markdown_output_directory}")
        return

    print(f"Processing {len(markdown_files)} markdown files...")
    raw_text = get_markdown_text(markdown_files)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    print("Processing complete.")

 
    user_input(user_question)



