# pip install -U llama-index --upgrade --no-cache-dir --force-reinstall
# pip install llama-parse

import nest_asyncio
from llama_parse import LlamaParse
from llama_index.core import Document
import os

nest_asyncio.apply()

parser = LlamaParse(
    api_key="llx-Fk3WEojfAxzEaG6LlQYjsII2m5ubQ2wY1lWkAZI7bzgWST41",
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

# Load and combine PDFs
documents = load_and_combine_pdfs("./farmE_backend/report_database")

print(f"Loaded {len(documents)} documents.")
for doc in documents:
    print(f"Document: {doc.metadata['file_name']}, Pages: {doc.metadata['page_count']}")

# Save combined text to Markdown files
save_to_markdown(documents, "./farmE_backend/output_markdown")
