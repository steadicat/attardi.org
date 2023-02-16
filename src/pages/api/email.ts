import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
  email: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({email: 'test@example.com'});
}
