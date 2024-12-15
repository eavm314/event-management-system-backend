import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { v4 as uuid4 } from "uuid"
import * as path from "path";

import { files } from "./config";

export const profilePath = "/profile";
export const eventsPath = "/events";

export const saveProfileConfig: MulterOptions = {
  storage: diskStorage({
    destination: path.join(files.storagePath, profilePath),
    filename: (req, file, callback) => {
      const { userCode } = req['user'];
      const extension = path.parse(file.originalname).ext

      return callback(null, `${userCode}_${uuid4()}${extension}`)
    }
  })
}