import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Ege Gaz";

    const hasUrl = searchParams.has("url");
    const url = hasUrl ? searchParams.get("url")?.slice(0, 100) : "https://www.egegaz.com.tr";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: "#00AFF4",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              fontSize: 45,
              fontStyle: "normal",
              color: "white",
              marginTop: 30,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            <b>{title}</b>
          </div>
          <div
            style={{
              color: "white",
              position: "absolute",
              bottom: 10,
              left: 10,
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
