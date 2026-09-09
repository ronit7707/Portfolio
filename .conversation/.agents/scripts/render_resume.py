import fitz
from pathlib import Path

pdf_path = Path("attached_assets/NEW_RESUME_1788984725953.pdf")
out_dir = Path(".agents/outputs/resume_pages")
out_dir.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"pages={doc.page_count}")
for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    output = out_dir / f"page-{index + 1}.png"
    pix.save(output)
    print(f"rendered={output} size={pix.width}x{pix.height}")