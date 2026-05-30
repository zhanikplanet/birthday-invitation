import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "rsvps.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to read database
async function readRSVPs() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = await fs.promises.readFile(DB_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading RSVPs file, resetting to empty array", error);
    return [];
  }
}

// Helper to write database
async function writeRSVPs(data: any) {
  try {
    await fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing RSVPs file", error);
  }
}

// 1. API: Submit RSVP
app.post("/api/rsvp", async (req, res) => {
  try {
    const { name, attending, wishing } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    const rsvps = await readRSVPs();
    const newEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      attending: attending || "Әрине, келемін",
      wishing: wishing || "",
      createdAt: new Date().toISOString(),
    };

    rsvps.push(newEntry);
    await writeRSVPs(rsvps);

    res.status(201).json({ success: true, entry: newEntry });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 2. API: Get RSVPs (Protected with simple passcode kenzhe55)
app.get("/api/rsvps", async (req, res) => {
  try {
    const secret = req.query.secret;
    if (secret !== "kenzhe55") {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const rsvps = await readRSVPs();
    res.json(rsvps);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 3. API: Generate Wish via Gemini AI (Kazakh language specialist)
app.post("/api/generate-wish", async (req, res) => {
  try {
    const { name, relation } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required for the wish" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined");
      return res.json({
        wish: `Құрметті Кенжегүл анамызды 55 жас мерейтойымен шын жүректен құттықтаймын! Денсаулығыңыз мықты, өміріңіз ұзақ та мәнді болсын. Балаларыңыз бен немерелеріңіздің ортасында әрдайым күліп-ойнап, ақылшы ана болып жүре беріңіз. Бақытты болыңыз! (Тілек білдіруші: ${name.trim()})`
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // We build a sweet prompt tailored to Kazakh traditional wishes
    const relationshipPrompt = relation ? `Мерейтой иесіне қатынасы: ${relation}.` : "";
    
    const prompt = `
Сен Кенжегүл есімді анамыздың/әпкеміздің 55 жасқа толуына орай ұйымдастырылатын салтанатты Мерейтойына (Мерейтой - 55 жас) арнап өте әдемі және ерекше қазақша тілек немесе өлең шумағын дайындайтын кәсіби қазақ тілді шығармашыл жазушысың.

Мәліметтер:
- Мерейтой иесі: Кенжегүл
- Жасы: 55 жас
- Тілек білдірушінің есімі: ${name.trim()}
- ${relationshipPrompt}

Талаптар:
1. Тілек таза, әдемі, әдеби қазақ тілінде, жүрекке жылы тиетіндей өте жылы сөздермен жазылсын.
2. Тілектің басында немесе соңында Кенжегүлдің 55 жас мерейтойы екендігі атап өтілсін.
3. Егер тілек білідірушінің қатынасы (мысалы: баласы, қызы, сіңлісі, әріптесі, досы) берілсе, тілек мәтіні осы жақындық байланысына сәйкес бапталсын (мысалы, баласы болса "аяулы анашым", әріптесі болса "құрметті әріптес" деп жылы сөйлейтіндей).
4. Тілекте денсаулық, бақыт, отбасы амандығы, өмірдің қызығы мен немере-шөбере қызығын көру, жүзінен күлкі кетпеуі тіленсін.
5. Тілек шамамен 2-3 қысқа параграфтан немесе бірнеше шумақ өлең және ақ тілектен тұратын, оқуға жеңіл, шағын, көркем мәтін болсын. Артық техникалық тақырыптар, баяндаулар немесе "Құттықтау тілек:" деген сияқты шаблонды кіріспелер жазба. Бірден тілек сөзімен немесе өлеңмен баста.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    const wishText = response.text || "Тілек құрастыруда қате орын алды, бірақ біз сізге ақ ниетті бақыт пен амандық тілейміз!";
    res.json({ wish: wishText.trim() });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate wish" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
