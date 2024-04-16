import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";


export async function getUserImages() {

    const user = auth();

    if (!user.userId) {
        throw new Error("Unauthorized");
    }

    const images = await db.query.images.findMany({
        where:(model, { eq }) => eq(model.userId, user.userId),
        // Id is incremented each time a new image is added so we are displaying newest first by ordering by id in descending order

        orderBy: (model, { desc }) => desc(model.id),
      });

      return images;
    }