import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("t");
    const title = hasTitle ? searchParams.get("t").trim().slice(0, 40) : "EGE GAZ";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: "white",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #0046B4 2%, transparent 0%), radial-gradient(circle at 75px 75px, #0046B4 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: 50,
            border: "30px solid #0046B4",
          }}
        >
          <b
            style={{
              fontSize: 120,
              color: "#0046B4",
              padding: 0,
              margin: 0,
              lineHeight: 0.9,
              wordBreak: "break-word",
              wordWrap: "break-word",
              textOverflow: "ellipsis",
              fontWeight: 900,
            }}
          >
            {title}
          </b>
          <img src="https://www.egegaz.gricreative.com/assets/svg/logo.svg" style={{ width: 260, height: 71 }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`!!! Failed to generate the image`, {
      status: 500,
    });
  }
}
