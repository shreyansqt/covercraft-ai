import chromium from "@sparticuz/chromium";
import { NextResponse } from "next/server";

const getPuppeteer = async () => {
  if (process.env.NODE_ENV === "development") {
    const puppeteer = await import("puppeteer");
    return { puppeteer, chromium: null };
  } else {
    const puppeteer = await import("puppeteer-core");
    return { puppeteer, chromium };
  }
};

export async function POST(request: Request) {
  try {
    const { content, fileName } = await request.json();
    const { puppeteer } = await getPuppeteer();

    // Add Tailwind CSS and Avenir font styles to the content
    const contentWithStyles = `
      <style>
        @font-face {
          font-family: 'Avenir';
          src: url('${process.env.NEXT_PUBLIC_URL}/fonts/AvenirNextLTPro-Regular.otf') format('woff2');
        }
        body {
          font-family: 'Avenir', sans-serif;
          font-size: 16px;
          line-height: 1.4;
        }
        ul {
          margin-bottom: 8px;
          list-style-type: disc;
        }
        ol {
        margin-bottom: 8px;
          list-style-type: decimal;
        }
        p {
          margin-bottom: 8px;
        }
        a {
          color: #000;
        }
      </style>
      ${content}
    `;

    let browser;
    if (process.env.NODE_ENV === "development") {
      browser = await puppeteer.launch({
        headless: true,
      });
    } else {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }

    const page = await browser.newPage();

    // Wait for Tailwind to be loaded and applied
    await page.setContent(contentWithStyles, {
      waitUntil: ["networkidle0", "load", "domcontentloaded"],
    });

    // Replace waitForTimeout with a proper delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: 100,
        bottom: 100,
        right: 90,
        left: 90,
      },
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${fileName}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
