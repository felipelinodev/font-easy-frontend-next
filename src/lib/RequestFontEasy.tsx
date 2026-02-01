"use server";

type RequestFontEasyProps = {
  prompt: string | { [key: string]: number };
};

const API_URL = "https://recommend-ia-api-ashy.vercel.app";


export async function RequestFontEasyTextual(prompt: string) {
  try {
    const token: string | undefined = process.env.FE_API_KEY;
    const request = await fetch(`${API_URL}/textual`, {
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


export async function RequestFontEasyStructured(prompt: { [key: string]: number }) {
  try {
    const token: string | undefined = process.env.FE_API_KEY;
    const request = await fetch(`${API_URL}/structured`, {
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


export async function RequestFontEasyByName(fontName: string) {
  try {
    const token: string | undefined = process.env.FE_API_KEY;
    const request = await fetch(`${API_URL}/named?font=${encodeURIComponent(fontName)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export async function RequestFontEasy({
  prompt,
}: RequestFontEasyProps) {
  try {
    const token: string | undefined = process.env.FE_API_KEY;
    const request = await fetch(`${API_URL}/textual`, {
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
