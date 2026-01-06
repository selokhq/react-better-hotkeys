import sys
import os
from playwright.sync_api import sync_playwright

if len(sys.argv) != 4:
    print("Usage: python export_element_to_pdf.py <html_path> <element_id> <output_pdf>")
    sys.exit(1)

html_path = os.path.abspath(sys.argv[1])
element_id = sys.argv[2]
output_pdf = sys.argv[3]

if not os.path.isfile(html_path):
    raise FileNotFoundError(html_path)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(
        viewport={"width": 1920, "height": 1080},  # desktop scale
        device_scale_factor=1
    )

    page.goto(f"file://{html_path}")
    page.wait_for_load_state("networkidle")

    element = page.query_selector(f"#{element_id}")
    if not element:
        raise ValueError(f"Element with id '{element_id}' not found")

    box = element.bounding_box()
    if not box:
        raise RuntimeError("Failed to compute element bounding box")

    pdf_width = f"{box['width']+5}px"
    pdf_height = f"{box['height']+5}px"

    # Isolate element visually
    # page.evaluate(
    #     """
    #     ([id]) => {
    #         document.body.style.margin = '0';
    #         document.body.innerHTML = '';
    #         const el = document.getElementById(id);
    #         document.body.appendChild(el);
    #     }
    #     """,
    #     [element_id]
    # )

    page.pdf(
        path=output_pdf,
        width=pdf_width,
        height=pdf_height,
        print_background=True,
        page_ranges="1"
    )

    browser.close()