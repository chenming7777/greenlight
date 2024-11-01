from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import glob

from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai

from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key = os.getenv("GOOGLE_API_KEY"))

MARKDOWN_DIR = r"C:\greenlight\gemini_model\output_markdown"

def get_markdown_text(markdown_files):
    text = ""
    for file_path in markdown_files:
        with open(file_path, 'r', encoding='utf-8') as file:
            text += file.read() + "\n\n"
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 10000, chunk_overlap = 1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embeddings)
    vector_store.save_local("faiss_index")

def get_conversation_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model = "gemini-pro", temperature = 0.3)
    prompt = PromptTemplate(template = prompt_template, input_variables= ["context","question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt = prompt)
    return chain

def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)
    chain = get_conversation_chain()
    response = chain.invoke(
        {"input_documents":docs, "question": user_question}
        , return_only_outputs=True)
    print("Reply:", response["output_text"])

def main():
    print("Chat with Markdown using Gemini")

    # Process markdown files
    markdown_files = glob.glob(os.path.join(MARKDOWN_DIR, "*.md"))
    if not markdown_files:
        print(f"No markdown files found in {MARKDOWN_DIR}")
        return

    print(f"Processing {len(markdown_files)} markdown files...")
    raw_text = get_markdown_text(markdown_files)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)
    print("Processing complete.")

    # Start Q&A loop
    while True:
        user_question = input("\nAsk a question (or type 'quit' to exit): ")
        if user_question.lower() == 'quit':
            break
        user_input(user_question)

if __name__ == "__main__":
    main()