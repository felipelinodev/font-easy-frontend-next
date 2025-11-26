export default function getApiKey() {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_FE_API_KEY;

    return API_KEY;
  } catch (error) {
    console.log(error);
  }
}

getApiKey();
