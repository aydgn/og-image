import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Ege Gaz";

    const hasUrl = searchParams.has("url");
    const url = hasUrl ? searchParams.get("url")?.slice(0, 100) : "https://www.egegaz.com.tr";

    const logo = await fetch(new URL("./egegaz-logo.png", import.meta.url)).then(res => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: "white",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #00AFF4 2%, transparent 0%), radial-gradient(circle at 75px 75px, #00AFF4 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: 50,
          }}
        >
          <img src="{logo}" style={{ width: 260, height: 71 }} />
          <div
            style={{
              display: "flex",
              fontSize: 45,
              fontStyle: "normal",
              color: "#0046B4",
              whiteSpace: "pre-wrap",
            }}
          >
            <b>{title}</b>
          </div>
          <div
            style={{
              color: "#0046B4",
            }}
          >
            {url}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
