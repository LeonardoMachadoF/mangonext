import { NextApiHandler } from "next";
import { useApi } from "../../libs/useApi";

const handler: NextApiHandler = async (req, res) => {
  res.json({ status: true })
}

export default handler;