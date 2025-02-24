import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle file uploads
  },
};

export default async function profileImageHandler(req, res) {
  if (req.method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const buffer = Buffer.concat(chunks);

      // Generate a unique filename
      const filename = `profile-${Date.now()}.jpg`;
      const filePath = path.join(process.cwd(), "public", "profile-images", filename);

      // Save the file to the profile-images directory
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error("Failed to save image:", err);
          return res.status(500).json({ error: "Failed to save image" });
        }

        // Return the URL of the saved image
        res.status(200).json({ url: `profile-images/${filename}` });
      });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}