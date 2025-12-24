"use server";

type RequestFontEasyProps = {
  prompt: string | { [key: string]: number };

};

export async function RequestFontEasy({
  prompt,
}: RequestFontEasyProps) {
  try {
    const token: string | undefined = process.env.FE_API_KEY;
    const request = await fetch("https://recommend-ia-api-ashy.vercel.app/textual", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
