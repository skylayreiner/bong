import type { Player } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPlayer(id: Player["id"]) {
  return await prisma.player.findUnique({
    where: {
      id
    },
    include: {
      Registration: {
        include: {
          Match: {
            include: {
              Seats: {
                include: {
                  occupant: {}
                }
              }
            }
          }
        }
      }
    }
  });
}
