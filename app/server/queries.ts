import "server-only";
import { db } from "./db";

export async function getImages() {
    const images = await db.query.images.findMany({
        // Id is incremented each time a new image is added so we are displaying newest first by ordering by id in descending order
        orderBy: (model, { desc }) => desc(model.id),
      });

      return images;
    }