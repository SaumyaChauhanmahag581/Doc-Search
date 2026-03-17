import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "db.json");

let memoryDb: any = null;

const getDb = () => {
  if (memoryDb) return memoryDb;
  
  try {
    if (!fs.existsSync(DB_PATH)) {
      memoryDb = { users: [], doctors: [], appointments: [] };
    } else {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      memoryDb = JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading DB, using memory fallback:", err);
    memoryDb = { users: [], doctors: [], appointments: [] };
  }

  // Ensure arrays exist
  if (!memoryDb.users) memoryDb.users = [];
  if (!memoryDb.doctors) memoryDb.doctors = [];
  if (!memoryDb.appointments) memoryDb.appointments = [];

  return memoryDb;
};

const saveDb = (data: any) => {
  memoryDb = data;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    // Vercel/Serverless environments have read-only filesystems
    console.warn("Could not save to disk (normal for Vercel), keeping in memory:", err);
  }
};

async function startServer() {
  const app = express();
  
  // Important for Vercel: body parsing must come before routes
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Routes
  app.get("/api/doctors", (req, res) => {
    const { search, specialization, location } = req.query;
    const db = getDb();
    let filteredDoctors = [...db.doctors];

    if (search) {
      const searchStr = (search as string).toLowerCase().trim();
      const searchTerms = searchStr.split(/\s+/);
      
      filteredDoctors = filteredDoctors.filter((d: any) => {
        const name = d.name.toLowerCase();
        const spec = d.specialization.toLowerCase();
        const combined = `${name} ${spec}`;
        return searchTerms.every(term => combined.includes(term));
      });
    }

    if (specialization && specialization !== "All") {
      filteredDoctors = filteredDoctors.filter((d: any) => d.specialization === specialization);
    }

    if (location && location !== "All") {
      filteredDoctors = filteredDoctors.filter((d: any) => d.location.toLowerCase().includes((location as string).toLowerCase()));
    }

    res.json(filteredDoctors);
  });

  app.get("/api/search", (req, res) => {
    const { name, specialization, location } = req.query;
    const db = getDb();
    let filteredDoctors = [...db.doctors];

    if (name) {
      const searchStr = (name as string).toLowerCase().trim();
      const searchTerms = searchStr.split(/\s+/);
      
      filteredDoctors = filteredDoctors.filter((d: any) => {
        const docName = d.name.toLowerCase();
        const spec = d.specialization.toLowerCase();
        const combined = `${docName} ${spec}`;
        return searchTerms.every(term => combined.includes(term));
      });
    }

    if (specialization && specialization !== "" && specialization !== "All") {
      filteredDoctors = filteredDoctors.filter((d: any) => d.specialization === specialization);
    }

    if (location && location !== "" && location !== "All") {
      filteredDoctors = filteredDoctors.filter((d: any) => d.location.toLowerCase().includes((location as string).toLowerCase()));
    }

    res.json(filteredDoctors);
  });

  app.get("/api/doctors/:id", (req, res) => {
    const db = getDb();
    const doctor = db.doctors.find((d: any) => d.id === req.params.id);
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  });

  app.post("/api/appointments", (req, res) => {
    const appointment = req.body;
    const db = getDb();
    if (!db.appointments) db.appointments = [];
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    db.appointments.push(newAppointment);
    saveDb(db);
    res.status(201).json(newAppointment);
  });

  app.get("/api/appointments", (req, res) => {
    const db = getDb();
    res.json(db.appointments || []);
  });

  app.delete("/api/appointments/:id", (req, res) => {
    const { id } = req.params;
    const db = getDb();
    if (!db.appointments) return res.status(404).json({ message: "No appointments found" });
    const initialLength = db.appointments.length;
    db.appointments = db.appointments.filter((apt: any) => apt.id !== id);
    if (db.appointments.length === initialLength) return res.status(404).json({ message: "Appointment not found" });
    saveDb(db);
    res.json({ message: "Appointment deleted successfully" });
  });

  app.post("/api/register", (req, res) => {
    const { name, age, contact, gender } = req.body;
    const db = getDb();
    const newUser = { 
      name: name || "Anonymous User",
      age: age || "25",
      contact: contact || "Not Provided",
      gender: gender || "Not Specified",
      id: Date.now() 
    };
    db.users.push(newUser);
    saveDb(db);
    res.json({ message: "User Registered Successfully", user: newUser });
  });

  app.post("/api/login", (req, res) => {
    try {
      const { name, contact } = req.body;
      console.log(`Login attempt for: ${name}`);

      if (!name) {
        return res.status(400).json({ message: "Name is required for login" });
      }

      const db = getDb();
      let user = db.users.find((u: any) => 
        u.name?.toLowerCase() === name.toLowerCase() && 
        (!contact || u.contact === contact)
      );

      if (!user) {
        user = { 
          name, 
          contact: contact || "Not Provided", 
          age: "25", 
          gender: "Not Specified",
          id: Date.now() 
        };
        db.users.push(user);
        saveDb(db);
        console.log(`Auto-registered new user on login: ${name}`);
      }

      res.json({ message: "Login Success", user });
    } catch (err) {
      console.error("Critical error in /api/login:", err);
      res.status(500).json({ message: "Internal Server Error during login" });
    }
  });

  app.post("/api/update-doctor-images", (req, res) => {
    const { maleImage, femaleImage } = req.body;
    const db = getDb();
    db.doctors = db.doctors.map((doc: any) => {
      if (doc.gender === "Male") doc.image = maleImage;
      else if (doc.gender === "Female") doc.image = femaleImage;
      return doc;
    });
    saveDb(db);
    res.json({ message: "Doctor images updated successfully" });
  });

  // Production serving
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexFile = path.join(distPath, "index.html");
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send("Frontend build not found. Please run 'build' first.");
      }
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  return app;
}

// Handler for local and Vercel
const appPromise = startServer();

if (!process.env.VERCEL) {
  appPromise.then(app => {
    const PORT = Number(process.env.PORT) || 3001;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Local server running on http://localhost:${PORT}`);
    });
  });
}

export default async (req: any, res: any) => {
  const app = await appPromise;
  return app(req, res);
};
