import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  res.json({ status: true })
}

export default handler;